import { memo, useState } from "react"
import { Card } from "@/components/ui/card"
import { ShieldUser } from "lucide-react"
import { HandCoins } from "lucide-react"
import { Mail } from "lucide-react"
import { Phone } from "lucide-react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Trash2 } from "lucide-react"
import useClass_StudentMutations from "@/hooks/useClass_StudentMutations"

const EachStudent = ({
    student,
    selectedClass,
    setSelectedClass,
    setAddCoinsStudent,
    setStudentFormData,
    setStudentId,
    setShowStudentForm,
    setEditingStudent
}) => {
    const [deleteId, setDeleteId] = useState(null)
    const { deleteStudentMutation, deleteStudentPending } = useClass_StudentMutations()
    const handleDeleteStudent = async(studentId) => {
        setDeleteId(studentId)
        await deleteStudentMutation(
            { studentId, classId: selectedClass._id },
            {
                onSuccess: (data) => {
                    setSelectedClass(data.newData)
                }
            }
        )
    }
    return (
        <Card key={student._id} className="p-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{student.fullName}</h3>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col gap-1 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <ShieldUser className="h-3.5 w-3.5" />
                                Login: <span className="font-semibold">{student.login}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <HandCoins className="h-3.5 w-3.5" />
                                Ball: <span className="font-semibold">{student.coins}</span>
                            </span>
                            {student.details.email && (
                                <span className="flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5" />
                                    Email: <span className="font-semibold">{student.details.email}</span>
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 mt-2 text-sm text-muted-foreground">
                            {student.details.phoneNumber && (
                                <span className="flex items-center gap-0.5">
                                    <Phone className="h-3.5 w-3.5" />
                                    Telefon raqam: <span className="font-semibold">{student.details.phoneNumber}</span>
                                </span>
                            )}
                            {student.details.tgUserName && (
                                <span className="flex items-center gap-1.5">
                                    <Send className="h-3.5 w-3.5" />
                                    Telegram: <span className="font-semibold">{student.details.tgUserName}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            setAddCoinsStudent(true)
                            setStudentId(student._id)
                        }}
                        className="h-8 w-8 cursor-pointer"
                    >
                        <HandCoins className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            setEditingStudent(student)
                            setShowStudentForm(true)
                            setStudentFormData({
                                fullName: student.fullName,
                                login: student.login,
                                password: "",
                                phoneNumber: student.details.phoneNumber === null ? "" : student.details.phoneNumber,
                                tgUserName: student.details.tgUserName === null ? "" : student.details.tgUserName,
                                email: student.details.email === null ? "" : student.details.email
                            })
                        }}
                        className="h-8 w-8 cursor-pointer"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => window.confirm("Buni aniq o'chirmoqchimisiz?") && handleDeleteStudent(student._id)}
                        disabled={deleteId === student._id && deleteStudentPending}
                        className="h-8 w-8 text-destructive hover:text-destructive cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default memo(EachStudent)
