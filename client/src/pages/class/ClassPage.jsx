import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, ShieldUser, GraduationCap, Pencil, Trash2, Users, Mail, Calendar, X, HandCoins, Send, Phone } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addPointsClass, createClasses, deleteClasses, editClasses, fetchClasses } from "../../api/class"
import toast from "react-hot-toast"
import { addPointsStudent, createStudents, deleteStudents, editStudents } from "../../api/student"
import { Skeleton } from "@/components/ui/skeleton"

const ClassPage = () => {
    const queryClient = useQueryClient()
    const [deleteId, setDeleteId] = useState(null)
    const [selectedClass, setSelectedClass] = useState(null)
    const [showClassForm, setShowClassForm] = useState(false)
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [addCoinsStudent, setAddCoinsStudent] = useState(false)
    const [addCoinsStudentDescription, setAddCoinsStudentDescription] = useState("")
    const [addCoinsClass, setAddCoinsClass] = useState(false)
    const [addCoinClassDescription, setAddcoinClassDescription] = useState("")
    const [editingClass, setEditingClass] = useState(null)
    const [editingStudent, setEditingStudent] = useState(null)
    const [studentAmount, setStudentAmount] = useState(0)
    const [classAmount, setClassAmount] = useState(0)
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
    const { mutate: createClassMutation } = useMutation({
        mutationFn: createClasses,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "classMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "classMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "classMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                toast.success(data.msg, { id: "classMutationPending" })
            }
        }
    })
    const { mutate: deleteClassMutation, isPending: deleteClassPending } = useMutation({
        mutationFn: deleteClasses,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteClassMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "deleteClassMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteClassMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                setSelectedClass(null)
                toast.success(data.msg, { id: "deleteClassMutationPending" })
            }
        }
    })
    const { mutate: editClassMutation } = useMutation({
        mutationFn: editClasses,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: "editClassMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "editClassMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "editClassMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                toast.success(data.msg, { id: "editClassMutationPending" })
            }
        }
    })
    const { mutate: createStudentMutation } = useMutation({
        mutationFn: createStudents,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "studentMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "studentMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "studentMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                setSelectedClass(data.newData)
                toast.success(data.msg, { id: "studentMutationPending" })
            }
        }
    })
    const { mutate: deleteStudentMutation, isPending: deleteStudentPending } = useMutation({
        mutationFn: deleteStudents,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteStudentMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "deleteStudentMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteStudentMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                setSelectedClass(data.newData)
                toast.success(data.msg, { id: "deleteStudentMutationPending" })
            }
        }
    })
    const { mutate: editStudentMutation } = useMutation({
        mutationFn: editStudents,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: "editStudentMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "editStudentMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "editStudentMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                setSelectedClass(data.newData)
                toast.success(data.msg, { id: "editStudentMutationPending" })
            }
        }
    })
    const { mutate: mutationAddCoinsStudents } = useMutation({
        mutationFn: addPointsStudent,
        onMutate: () => toast.loading("Qo'shilmoqda...", { id: "addCoinStudents" }),
        onError: (data) => {
            toast.error(data.error, { id: "addCoinStudents" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "addCoinStudents" })
            } else {
                queryClient.invalidateQueries(["classes"])

                setSelectedClass(data.newData)
                toast.success(data.msg, { id: "addCoinStudents" })
            }
        }
    })
    const { mutate: mutationAddPointsClasses } = useMutation({
        mutationFn: addPointsClass,
        onMutate: () => toast.loading("Qo'shilmoqda...", { id: "addCoinClass" }),
        onError: (data) => {
            toast.error(data.error, { id: "addCoinClass" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "addCoinClass" })
            } else {
                queryClient.invalidateQueries(["classes"])
                // setSelectedClass(data.newData)
                toast.success(data.msg, { id: "addCoinClass" })
            }
        }
    })
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

    const handleDeleteClass = (classId) => {
        setDeleteId(classId)
        deleteClassMutation({ id: classId })
    }

    const handleAddStudent = (e) => {
        e.preventDefault()
        const newStudentData = {
            ...studentFormData,
            classId: selectedClass._id
        }
        const isFilled = Object.values(newStudentData).every((value) => value.trim() !== "")
        if (!isFilled) return toast.error("Barcha maydonlarni to'ldiring")
        createStudentMutation(newStudentData)
        setStudentFormData({ fullName: "", login: "", password: "", classId: "", phoneNumber: null, tgUserName: null, email: null })
        setShowStudentForm(false)
    }
    const handleEditStudent = (e) => {
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
        editStudentMutation(newData)
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
    const handleDeleteStudent = (studentId) => {
        setDeleteId(studentId)
        deleteStudentMutation({ studentId, classId: selectedClass._id })
    }

    if (isPending) {
        return (
            <>
                <div className="min-h-screen bg-background">
                    <div className="container mx-auto px-4 py-6">
                        <header className="border-b border-border bg-card">
                            <div className="flex items-center justify-between">
                                <div className="container mx-auto px-4 py-6">
                                    <Skeleton className="h-9 w-48" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-10 w-32" />
                                </div>
                            </div>
                        </header>
                    </div>
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card className="p-4 animate-pulse">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="h-5 bg-muted rounded w-3/4"></div>
                                        <div className="h-4 bg-muted rounded w-1/2"></div>
                                        <div className="flex items-center gap-4">
                                            <div className="h-3 bg-muted rounded w-20"></div>
                                            <div className="h-3 bg-muted rounded w-16"></div>
                                            <div className="h-3 bg-muted rounded w-24"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="h-8 w-8 bg-muted rounded"></div>
                                        <div className="h-8 w-8 bg-muted rounded"></div>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4 animate-pulse">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-5 bg-muted rounded w-1/2"></div>
                                            <div className="h-5 bg-muted rounded-full w-12"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-muted rounded w-2/3"></div>
                                            <div className="h-4 bg-muted rounded w-1/2"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="h-8 w-8 bg-muted rounded"></div>
                                        <div className="h-8 w-8 bg-muted rounded"></div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        )
    }
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
                                Sinf qo'shish
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
                                                        <span className="font-semibold">{cls.students.length} o'quvchilar (maks {cls?.numberOfStudents})</span>
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
                                    O'quvchi qo'shish
                                </Button>
                            )}
                        </div>
                        {selectedClass ? (
                            selectedClass.students.length === 0 ? (
                                <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
                                    <p className="text-muted-foreground">Bu sinfda hali o‘quvchi yo‘q</p>
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
                                                    {/* <div className="flex flex-col gap-1 mt-2 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1.5">
                                                            <ShieldUser className="h-3.5 w-3.5" />
                                                            Login: <span className='font-semibold'>{student.login}</span>
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <HandCoins className="h-3.5 w-3.5" />
                                                            Coins: <span className='font-semibold'>{student.coins}</span>
                                                        </span>
                                                    </div> */}
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
                                <p className="text-muted-foreground">O'quvchilarni ko'rish uchun sinfni tanlang</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {addCoinsStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg space-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-foreground">Ball qo'shish va olib tashlash</h2>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    setStudentAmount(0)
                                    setAddCoinsStudent(false)
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="points">Ball</Label>
                            <Input
                                id="points"
                                name="points"
                                value={studentAmount}
                                onChange={(e) => setStudentAmount(e.target.value)}
                                placeholder="123"
                                type="number"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="descr">Tavsif</Label>
                            <Input
                                id="descr"
                                name="descr"
                                value={addCoinsStudentDescription}
                                onChange={(e) => setAddCoinsStudentDescription(e.target.value)}
                                placeholder="..."
                                type="text"
                                required
                            />
                        </div>
                        <div className="gap-2 pt-4  ">
                            <Button
                                className="flex-1 float-right"
                                onClick={() => {
                                    if (addCoinsStudentDescription === "") return toast.error("Tavsif yozilishi shart")
                                    mutationAddCoinsStudents({ userId: studentId, amount: studentAmount, description: addCoinsStudentDescription })
                                    setStudentAmount(0)
                                    setAddCoinsStudentDescription("")
                                    setAddCoinsStudent(false)
                                }}
                            >
                                Yubormoq
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {addCoinsClass && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg space-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-foreground">Ball qo'shish va olib tashlash</h2>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    setClassAmount(0)
                                    setAddCoinsClass(false)
                                    setAddcoinClassDescription("")
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="points">Ball</Label>
                            <Input
                                id="points"
                                name="points"
                                value={classAmount}
                                onChange={(e) => setClassAmount(e.target.value)}
                                placeholder="123"
                                type="number"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="descr">Tavsif</Label>
                            <Input
                                id="descr"
                                name="points"
                                value={addCoinClassDescription}
                                onChange={(e) => setAddcoinClassDescription(e.target.value)}
                                placeholder="..."
                                type="text"
                                required
                            />
                        </div>
                        <div className="gap-2 pt-4  ">
                            <Button
                                className="flex-1 float-right"
                                onClick={() => {
                                    if (addCoinClassDescription === "") return toast.error("Tavsif yozilishi shart")
                                    mutationAddPointsClasses({ classId, amount: classAmount, description: addCoinClassDescription })
                                    setClassAmount(0)
                                    setAddCoinsClass(false)
                                    setAddcoinClassDescription("")
                                    queryClient.invalidateQueries(["transactions"])
                                }}
                            >
                                Yubormoq
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Class Form Modal */}
            {showClassForm && (
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
                                <Label htmlFor="numberOfStudents">O'quvchilar soni</Label>
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
            )}

            {/* Student Form Modal */}
            {showStudentForm && selectedClass && (
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
                                <Label htmlFor="studentName">O'quvchining ismi va familiyasi</Label>
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
            )}
        </div>
    )
}

export default ClassPage
