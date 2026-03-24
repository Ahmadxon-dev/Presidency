import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

const AdminDialog = ({ createAdminsMutation, editAdminsMutation, selectedAdmin, isEditing, open, setOpen }) => {
    const [fullName, setFullName] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (open && isEditing && selectedAdmin) {
            setFullName(selectedAdmin.fullName || "")
            setLogin(selectedAdmin.login || "")
            setPassword("")
        } else if (open && !isEditing) {
            setFullName("")
            setLogin("")
            setPassword("")
        }
    }, [open, isEditing, selectedAdmin])

    const handleDialog = () => {
        if (!fullName || !login || !password) {
            return toast.error("Barcha maydonlarni to'ldiring")
        }
        if (isEditing) {
            editAdminsMutation.mutate({
                fullName,
                login,
                password,
                userId: selectedAdmin?._id
            })
        } else {
            createAdminsMutation.mutate({
                fullName,
                login,
                password
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                        <Input id="add-eventName" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleDialog} disabled={createAdminsMutation.isPending || editAdminsMutation.isPending}>
                        {isEditing ? "Admin o'zgartirish" : "Admin qo'shish"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AdminDialog
