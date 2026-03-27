import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchClasses } from "../../api/class"
import {
    Add_edit_ClassForm,
    Add_edit_StudentForm,
    AddClassCoinsDialog,
    AddStudentsCoinsDialog,
    ClassLoadingState,
    EachClass,
    EachStudent
} from "@/components/class"

const ClassPage = () => {
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

    const { data: classes, isPending } = useQuery({ queryKey: ["classes"], queryFn: fetchClasses })

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
                                    <EachClass
                                        key={cls._id}
                                        cls={cls}
                                        setSelectedClass={setSelectedClass}
                                        setAddCoinsClass={setAddCoinsClass}
                                        setClassId={setClassId}
                                        setEditingClass={setEditingClass}
                                        setClassFormData={setClassFormData}
                                        setShowClassForm={setShowClassForm}
                                        isSelected={isSelected}
                                    />
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
                                        <EachStudent
                                            key={student._id}
                                            student={student}
                                            selectedClass={selectedClass}
                                            setAddCoinsStudent={setAddCoinsStudent}
                                            setStudentFormData={setStudentFormData}
                                            setStudentId={setStudentId}
                                            setShowStudentForm={setShowStudentForm}
                                            setEditingStudent={setEditingStudent}
                                            setSelectedClass={setSelectedClass}
                                        />
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
