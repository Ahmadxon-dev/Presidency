import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import AdminSkeleton from "@/components/admin/AdminSkeleton"
import AdminEmptyState from "@/components/admin/AdminEmptyState"
import AdminDialog from "@/components/admin/AdminDialog"
import AdminTable from "@/components/admin/AdminTable"
import useAdminMutations from "@/hooks/useAdminMutations"
import { fetchAdmins } from '@/api/admin';

const AdminManagement = () => {
    const [open, setOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedAdmin, setSelectedAdmin] = useState(null)

    const { data: admins, isPending } = useQuery({ queryKey: ["admins"], queryFn: fetchAdmins })

    const { disableId, createAdminsMutation, editAdminsMutation, deleteAdminMutation } = useAdminMutations({
        onCreateSuccess: () => {
            setOpen(false)
            setSelectedAdmin(null)
        },
        onEditSuccess: () => {
            setOpen(false)
            setSelectedAdmin(null)
            setIsEditing(false)
        }
    })

    const handleAddOpen = () => {
        setIsEditing(false)
        setSelectedAdmin(null)
        setOpen(true)
    }

    const handleEditOpen = (admin) => {
        setIsEditing(true)
        setSelectedAdmin(admin)
        setOpen(true)
    }
    const handleDelete = (id) => {
        deleteAdminMutation.mutate({ id })
    }
    if (isPending) return <AdminSkeleton />
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="w-full flex items-center justify-between mx-auto mb-8 ">
                    <h1 className="text-4xl font-bold  text-foreground mb-2">Adminlarni boshqaruvi</h1>
                    <Button onClick={handleAddOpen}>Qo'shish</Button>
                </div>
                <AdminDialog
                    open={open}
                    setOpen={setOpen}
                    isEditing={isEditing}
                    selectedAdmin={selectedAdmin}
                    createAdminsMutation={createAdminsMutation}
                    editAdminsMutation={editAdminsMutation}
                />
                {admins.length === 0 ? (
                    <AdminEmptyState />
                ) : (
                    <>
                        <AdminTable
                            admins={admins}
                            onEdit={handleEditOpen}
                            onDelete={handleDelete}
                            disableId={disableId}
                            isDeletePending={deleteAdminMutation.isPending}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminManagement
