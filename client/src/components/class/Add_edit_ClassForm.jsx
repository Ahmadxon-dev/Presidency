import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import useClass_StudentMutations from "@/hooks/useClass_StudentMutations"

const Add_edit_ClassForm = ({ setShowClassForm, classFormData, setClassFormData, setEditingClass, editingClass }) => {
    const { createClassMutation, editClassMutation } = useClass_StudentMutations()
    const handleAddClass = (e) => {
        e.preventDefault()
        const isFilled = Object.values(classFormData).every((value) => {
            if (value === null || value === undefined) return false
            if (typeof value === "number") return value !== 0
            return value.trim() !== ""
        })
        if (!isFilled) return toast.error("Barcha maydonlarni to'ldiring")
        createClassMutation(classFormData)
        setClassFormData({ className: "", login: "", password: "", numberOfStudents: 0 })
        setShowClassForm(false)
    }

    const handleEditClass = (e) => {
        e.preventDefault()
        const newData = {
            className: classFormData.className,
            newLogin: classFormData.login,
            classId: editingClass._id,
            newPassword: classFormData.password,
            numberOfStudents: classFormData.numberOfStudents
        }
        editClassMutation(newData)
        setShowClassForm(false)
        setClassFormData({
            className: "",
            login: "",
            password: "",
            numberOfStudents: 0
        })
        setEditingClass(null)
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">{editingClass ? "Sinfni o'zgartirish" : "Yangi sinf yaratish"}</h2>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            setShowClassForm(false)
                            setEditingClass(null)
                            setClassFormData({
                                className: "",
                                login: "",
                                password: "",
                                numberOfStudents: 0
                            })
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={editingClass ? handleEditClass : handleAddClass} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="className">Sinf</Label>
                        <Input
                            id="className"
                            name="name"
                            value={classFormData.className}
                            onChange={(e) => setClassFormData({ ...classFormData, className: e.target.value })}
                            placeholder="5-02"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="teacher">Login</Label>
                        <Input
                            id="teacher"
                            name="teacher"
                            value={classFormData.login}
                            onChange={(e) => setClassFormData({ ...classFormData, login: e.target.value })}
                            placeholder="john.doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="room">Parol</Label>
                        <Input
                            id="room"
                            name="room"
                            type="password"
                            value={classFormData.password}
                            onChange={(e) => setClassFormData({ ...classFormData, password: e.target.value })}
                            placeholder="*****"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="numberOfStudents">{"O'quvchilar soni"}</Label>
                        <Input
                            id="numberOfStudents"
                            name="numberOfStudents"
                            type="number"
                            min="0"
                            max="40"
                            value={classFormData.numberOfStudents}
                            onChange={(e) => setClassFormData({ ...classFormData, numberOfStudents: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex gap-2 pt-4">
                        <Button type="submit" className="flex-1">
                            {editingClass ? "Sinfni o'zgartirish" : "Sinf qo'shish"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setShowClassForm(false)
                                setEditingClass(null)
                                setClassFormData({
                                    className: "",
                                    login: "",
                                    password: "",
                                    numberOfStudents: 0
                                })
                            }}
                            className="flex-1 bg-transparent"
                        >
                            Bekor qilish
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add_edit_ClassForm
