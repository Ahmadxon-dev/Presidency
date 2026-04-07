import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import { X } from "lucide-react"
import useClass_StudentMutations from "@/hooks/useClass_StudentMutations"
import { memo } from "react"
const Add_edit_StudentForm = ({
    editingStudent,
    setShowStudentForm,
    setSelectedClass,
    setEditingStudent,
    setStudentFormData,
    studentFormData,
    selectedClass
}) => {
    const { createStudentMutation, editStudentMutation } = useClass_StudentMutations()
    const handleAddStudent = async (e) => {
        e.preventDefault()
        const newStudentData = {
            ...studentFormData,
            classId: selectedClass._id
        }

        const isFilled = Object.values(newStudentData).every((value) => value.trim() !== "")
        if (!isFilled) return toast.error("Barcha maydonlarni to'ldiring")
        await createStudentMutation(newStudentData, {
            onSuccess: (data) => {               
                setSelectedClass(data.newData)
            }
        })
        setStudentFormData({ fullName: "", login: "", password: "", classId: "", phoneNumber: null, tgUserName: null, email: null })
        setShowStudentForm(false)
    }
    const handleEditStudent = async (e) => {
        e.preventDefault()
        const newData = {
            fullName: studentFormData.fullName,
            login: studentFormData.login,
            password: studentFormData.password,
            classId: selectedClass._id,
            studentId: editingStudent._id,
            phoneNumber: studentFormData.phoneNumber,
            tgUserName: studentFormData.tgUserName,
            email: studentFormData.email
        }
        await editStudentMutation(newData, {
            onSuccess: (data) => {
                setSelectedClass(data.newData)
            }
        })
        setStudentFormData({
            fullName: "",
            login: "",
            password: "",
            classId: "",
            phoneNumber: null,
            tgUserName: null,
            email: null
        })
        setShowStudentForm(false)
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        {editingStudent ? "O'quvchi malumotlarini o'zgartirish" : "Yangi o'quvchi qo'shish"}
                    </h2>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            setShowStudentForm(false)
                            setEditingStudent(null)
                            setStudentFormData({
                                fullName: "",
                                login: "",
                                password: "",
                                classId: "",
                                phoneNumber: null,
                                tgUserName: null,
                                email: null
                            })
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={editingStudent ? handleEditStudent : handleAddStudent} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="studentName">{"O'quvchining ismi va familiyasi"}</Label>
                        <Input
                            id="studentName"
                            value={studentFormData.fullName}
                            onChange={(e) => setStudentFormData({ ...studentFormData, fullName: e.target.value })}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Login</Label>
                        <Input
                            id="email"
                            type="text"
                            value={studentFormData.login}
                            onChange={(e) => setStudentFormData({ ...studentFormData, login: e.target.value })}
                            placeholder="john.doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="grade">Parol</Label>
                        <Input
                            id="grade"
                            type="password"
                            value={studentFormData.password}
                            onChange={(e) => setStudentFormData({ ...studentFormData, password: e.target.value })}
                            placeholder="*****"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Telefon raqam</Label>
                        <Input
                            id="phoneNumber"
                            value={studentFormData.phoneNumber}
                            onChange={(e) => setStudentFormData({ ...studentFormData, phoneNumber: e.target.value })}
                            placeholder="123"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tgUserName">Telegram da foydalanuvchining nomi</Label>
                        <Input
                            id="tgUserName"
                            value={studentFormData.tgUserName}
                            onChange={(e) => setStudentFormData({ ...studentFormData, tgUserName: e.target.value })}
                            placeholder="@johndoe"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={studentFormData.email}
                            onChange={(e) => setStudentFormData({ ...studentFormData, email: e.target.value })}
                            placeholder="johndoe@gmail.com"
                            required
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button type="submit" className="flex-1">
                            {editingStudent ? "O'quvchi malumotlarini o'zgartirish" : "O'quvchi qo'shish"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setShowStudentForm(false)
                                setEditingStudent(null)
                                setStudentFormData({
                                    fullName: "",
                                    login: "",
                                    password: "",
                                    classId: "",
                                    phoneNumber: null,
                                    tgUserName: null,
                                    email: null
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

export default memo(Add_edit_StudentForm)
