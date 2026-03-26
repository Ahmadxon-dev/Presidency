import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, ShieldUser, Pencil, Trash2, Users, Mail, X, HandCoins, Send, Phone } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchClasses } from "../../api/class"
import { Add_edit_ClassForm, Add_edit_StudentForm, AddClassCoinsDialog, AddStudentsCoinsDialog, ClassLoadingState } from "@/components/class"
import useClass_StudentMutations from "@/hooks/useClass_StudentMutations"

const ClassPage = () => {
    const [deleteId, setDeleteId] = useState(null)
    const [selectedClass, setSelectedClass] = useState(null)
    const [showClassForm, setShowClassForm] = useState(false)
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [addCoinsStudent, setAddCoinsStudent] = useState(false)
    const [addCoinsClass, setAddCoinsClass] = useState(false)
    const [editingClass, setEditingClass] = useState(null)
    const [editingStudent, setEditingStudent] = useState(null)
    const [classId, setClassId] = useState(null)
    const [studentId, setStudentId] = useState(null)
    const [classFormData, setClassFormData] = useState({
        className: "",
        login: "",
        password: "",
        numberOfStudents: 0
    })
    const [studentFormData, setStudentFormData] = useState({
        fullName: "",
        login: "",
        password: "",
        classId: "",
        phoneNumber: null,
        tgUserName: null,
        email: null
    })
    const { deleteStudentMutation, deleteStudentPending, deleteClassMutation, deleteClassPending } = useClass_StudentMutations()
    const { data: classes, isPending } = useQuery({ queryKey: ["classes"], queryFn: fetchClasses })

    const handleDeleteClass = (classId) => {
        setDeleteId(classId)
        deleteClassMutation(
            { id: classId },
            {
                onSuccess: () => {
                    setSelectedClass(null)
                }
            }
        )
    }

    const handleDeleteStudent = (studentId) => {
        setDeleteId(studentId)
        deleteStudentMutation(
            { studentId, classId: selectedClass._id },
            {
                onSuccess: (data) => {
                    setSelectedClass(data.newData)
                }
            }
        )
    }

    if (isPending) return <ClassLoadingState />

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                <header className="border-b border-border bg-card">
                    <div className="flex items-center justify-between">
                        <div className="container mx-auto pr-4 py-6">
                            <h1 className="text-3xl font-bold text-foreground">Sinflarni boshqarish</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => {
                                    setEditingClass(null)
                                    setShowClassForm(true)
                                }}
                                className="gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Sinf qo&apos;shish
                            </Button>
                        </div>
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Classes Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-foreground">Barcha sinflar ({classes.length})</h2>
                        </div>
                        <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 pb-5">
                            {classes.map((cls) => {
                                const isSelected = selectedClass?._id === cls._id
                                return (
                                    <Card
                                        key={cls._id}
                                        className={`p-4 ml-2 mt-2 transition-all cursor-pointer hover:shadow-md ${
                                            isSelected ? "ring-2 ring-primary bg-accent" : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedClass(cls)
                                        }}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-foreground truncate">{cls.className}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">{cls.teacher}</p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-3 w-3" />
                                                        <span className="font-semibold">
                                                            {cls.students.length} o&apos;quvchilar (maks {cls?.numberOfStudents})
                                                        </span>
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <ShieldUser className="h-3 w-3" /> Login: <span className="font-semibold">{cls.login}</span>
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <HandCoins className="h-3 w-3" />
                                                        Ball:<span className="font-semibold">{cls.coins}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setAddCoinsClass(true)
                                                        setClassId(cls._id)
                                                    }}
                                                    className="h-8 w-8 cursor-pointer"
                                                >
                                                    <HandCoins className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setEditingClass(cls)
                                                        setClassFormData({
                                                            className: cls.className,
                                                            login: cls.login,
                                                            password: "",
                                                            numberOfStudents: cls.numberOfStudents
                                                        })
                                                        setShowClassForm(true)
                                                    }}
                                                    className="h-8 w-8 cursor-pointer"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => window.confirm("Buni aniq o'chirmoqchimisiz?") && handleDeleteClass(cls._id)}
                                                    disabled={deleteId === cls._id && deleteClassPending}
                                                    className="h-8 w-8 text-destructive cursor-pointer hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>

                    {/* Students Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-foreground">
                                {selectedClass ? `${selectedClass.className} dagi o'quvchilar` : "Sinfni tanlang"}
                            </h2>
                            {selectedClass && (
                                <Button
                                    onClick={() => {
                                        setEditingStudent(null)
                                        setShowStudentForm(true)
                                    }}
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    O&apos;quvchi qo&apos;shish
                                </Button>
                            )}
                        </div>
                        {selectedClass ? (
                            selectedClass.students.length === 0 ? (
                                <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
                                    <p className="text-muted-foreground">Bu sinfda hali o&apos;quvchi yo&apos;q</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                                    {selectedClass.students.map((student) => (
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
                                                                    Telefon raqam:{" "}
                                                                    <span className="font-semibold">{student.details.phoneNumber}</span>
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
                                                        onClick={() =>
                                                            window.confirm("Buni aniq o'chirmoqchimisiz?") && handleDeleteStudent(student._id)
                                                        }
                                                        disabled={deleteId === student._id && deleteStudentPending}
                                                        className="h-8 w-8 text-destructive hover:text-destructive cursor-pointer"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )
                        ) : (
                            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
                                <p className="text-muted-foreground">O&apos;quvchilarni ko&apos;rish uchun sinfni tanlang</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {addCoinsStudent && (
                <AddStudentsCoinsDialog setAddCoinsStudent={setAddCoinsStudent} studentId={studentId} setSelectedClass={setSelectedClass} />
            )}

            {addCoinsClass && <AddClassCoinsDialog setAddCoinsClass={setAddCoinsClass} classId={classId} />}
            {/* Class Form Modal */}
            {showClassForm && (
                <Add_edit_ClassForm
                    setShowClassForm={setShowClassForm}
                    classFormData={classFormData}
                    setClassFormData={setClassFormData}
                    setEditingClass={setEditingClass}
                    editingClass={editingClass}
                />
            )}

            {/* Student Form Modal */}
            {showStudentForm && selectedClass && (
                <Add_edit_StudentForm
                    setSelectedClass={setSelectedClass}
                    editingStudent={editingStudent}
                    setShowStudentForm={setShowStudentForm}
                    setEditingStudent={setEditingStudent}
                    setStudentFormData={setStudentFormData}
                    studentFormData={studentFormData}
                    selectedClass={selectedClass}
                />
            )}
        </div>
    )
}

export default ClassPage
