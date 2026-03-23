import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createAdmins, deleteAdmins, editAdmins, fetchAdmins } from "../../api/admin"
import toast from "react-hot-toast"
import { Edit2, Trash2, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
const AdminManagement = () => {
    const [fullName, setFullName] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [open, setOpen] = useState(false)
    const [disableId, setDisableId] = useState(null)
    const [adminData, setAdminData] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const queryClient = useQueryClient()
    const { data: admins, isPending } = useQuery({ queryKey: ["admins"], queryFn: fetchAdmins })
    const createAdminsMutation = useMutation({
        mutationFn: createAdmins,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "createAdminsMutation" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "createAdminsMutation" })
                return
            } else {
                queryClient.invalidateQueries(["admins"])
                toast.success(data.msg, { id: "createAdminsMutation" })
                setOpen(false) // ✅ close only on success
                setFullName("")
                setPassword("")
                setLogin("")
            }
        },
        onError: (data) => toast.error(data.error, { id: "createAdminsMutation" })
    })
    const editAdminsMutation = useMutation({
        mutationFn: editAdmins,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: "editAdminsMutation" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "editAdminsMutation" })
                return
            } else {
                queryClient.invalidateQueries(["admins"])
                toast.success(data.msg, { id: "editAdminsMutation" })
                setOpen(false) // ✅ close only on success
                setFullName("")
                setPassword("")
                setLogin("")
                setAdminData(null)
            }
        },
        onError: (data) => toast.error(data.error, { id: "editAdminsMutation" })
    })
    const deleteAdminMutation = useMutation({
        mutationFn: deleteAdmins,
        onMutate: ({ id }) => {
            setDisableId(id)
            toast.loading("O'chirilmoqda...", { id: "deleteAdminMutation" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteAdminMutation" })
            } else {
                queryClient.invalidateQueries(["admins"])
                toast.success(data.msg, { id: "deleteAdminMutation" })
            }
        },
        onError: (data) => {
            toast.error(data.error, { id: "deleteAdminMutation" })
        }
    })
    const handleDialog = () => {
        if (isEditing === false) {
            if (!fullName || !login || !password) return toast.error("Barcha maydonlarni to'ldiring")
            createAdminsMutation.mutate({ fullName, login, password })
        }
        if (isEditing === true) {
            if (!fullName || !login || !password) return toast.error("Barcha maydonlarni to'ldiring")
            editAdminsMutation.mutate({ fullName, login, password, userId: adminData })
        }
    }
    if (isPending)
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="w-full flex items-center justify-between mx-auto mb-8">
                        <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse" />
                        <div className="h-10 w-24 bg-slate-200 rounded-lg animate-pulse" />
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">F.I.SH</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Login</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, idx) => (
                                        <tr key={idx} className="border-b border-slate-200">
                                            {/* Name Column */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {/* <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" /> */}
                                                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                                                </div>
                                            </td>

                                            {/* Login Column */}
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                                            </td>

                                            {/* Actions Column */}
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-3">
                                                    <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
                                                    <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="w-full flex items-center justify-between mx-auto mb-8 ">
                    <h1 className="text-4xl font-bold  text-foreground mb-2">Adminlarni boshqaruvi</h1>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                            <Button
                                onClick={() => {
                                    setIsEditing(false)
                                    setFullName("")
                                    setLogin("")
                                    setPassword("")
                                }}
                            >
                                Qo'shish
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle> {isEditing ? "Admin o'zgartirish" : "Yangi admin qo'shish"} </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="add-eventName">F.I.SH</Label>
                                    <Input id="add-eventName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="add-eventName">Login</Label>
                                    <Input id="add-eventName" value={login} onChange={(e) => setLogin(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="add-eventName">Parol</Label>
                                    <Input
                                        id="add-eventName"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleDialog} disabled={createAdminsMutation.isPending || editAdminsMutation.isPending}>
                                    {isEditing ? "Admin o'zgartirish" : "Admin qo'shish"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {admins.length === 0 ? (
                    <Card className="p-12">
                        <div className="text-center">
                            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Admin topilmadi</h3>
                        </div>
                    </Card>
                ) : (
                    <>
                        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">F.I.SH</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Login</th>
                                            {/* <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th> */}
                                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Amallar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admins.map((admin, idx) => (
                                            <tr
                                                key={admin._id}
                                                className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                                                    idx === admins.length - 1 ? "border-0" : ""
                                                }`}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold"> */}
                                                        {/* {admin.fullName.charAt(0).toUpperCase()} */}
                                                        {/* </div> */}
                                                        <span className="font-medium text-slate-900">{admin.fullName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-600">{admin.login}</span>
                                                </td>
                                                {/* <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                                                                admin.role === "Super Admin"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-green-100 text-green-700"
                                                            }`}
                                                        >
                                                            {admin.role}
                                                        </span>
                                                    </td> */}
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-3">
                                                        <Button
                                                            onClick={() => {
                                                                setIsEditing(true)
                                                                setOpen(true)
                                                                setFullName(admin.fullName)
                                                                setLogin(admin.login)
                                                                setAdminData(admin._id)
                                                                setPassword("")
                                                            }}
                                                            size="default"
                                                            variant="ghost"
                                                            className=" cursor-pointer"
                                                            title="Admin o'zgartirish"
                                                            disabled={deleteAdminMutation.isPending && disableId === admin._id}
                                                        >
                                                            <Edit2 className="h-6 w-6" />
                                                        </Button>
                                                        <Button
                                                            size="default"
                                                            variant="ghost"
                                                            onClick={() => deleteAdminMutation.mutate({ id: admin._id })}
                                                            className="text-destructive hover:text-destructive cursor-pointer"
                                                            title="Admin o'chirish"
                                                            disabled={deleteAdminMutation.isPending && disableId === admin._id}
                                                        >
                                                            <Trash2 className="h-6 w-6" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminManagement
