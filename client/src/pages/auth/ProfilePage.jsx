import React, { useState } from "react"
import { Award, User, LogIn, Lock, Send, Mail, Phone, X, Trash2, Pencil } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserCoins } from "../../api/shop"
import { useSelector } from "react-redux"
import { Users, BookOpen } from "lucide-react"
import { getOneClass } from "../../api/class"
import UserProfileSkeleton from "../../components/shared/skeletons/userProfileSkeleton"
import ClassProfileSkeleton from "../../components/shared/skeletons/classProfileSkeleton"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { createStudents, deleteStudents, editStudents } from "../../api/student"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const ProfilePage = () => {
    const user = useSelector((state) => state.auth.user)
    const { data: coins, isPending } = useQuery({ queryKey: ["coins"], queryFn: () => getUserCoins(user.id) })
    const { data: classData, isPending: classPending } = useQuery({
        queryKey: ["classes", user.id],
        queryFn: () => getOneClass(user.id),
        enabled: user.role === "class" && !!user.id // Only runs when condition is true
    })
    const queryClient = useQueryClient()
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [editingStudent, setEditingStudent] = useState(null)
    const [studentFormData, setStudentFormData] = useState({
        fullName: "",
        login: "",
        password: "",
        classId: "",
        phoneNumber: null,
        tgUserName: null,
        email: null
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
                toast.success(data.msg, { id: "studentMutationPending" })
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
                toast.success(data.msg, { id: "editStudentMutationPending" })
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
                toast.success(data.msg, { id: "deleteStudentMutationPending" })
            }
        }
    })
    const handleAddStudent = (e) => {
        e.preventDefault()
        const newStudentData = {
            ...studentFormData,
            classId: user.id
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
            classId: user.id,
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
        deleteStudentMutation({ studentId, classId: user.id })
    }
    if (isPending && user.role !== "class") {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-6 flex items-center justify-center">
                    <div className="w-full max-w-2xl mx-auto">
                        <UserProfileSkeleton />
                    </div>
                </div>
            </div>
        )
    }
    if (user.role === "class" && classPending) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-6 flex items-center justify-center">
                    <div className="w-full max-w-7xl mx-auto">
                        <ClassProfileSkeleton />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 flex items-center justify-center">
                <div
                    className={`w-full mx-auto ${user.role === "class" && "max-w-7xl"}  ${user.role === "student" && "max-w-3xl"} ${user.role === "admin" && "max-w-2xl"}`}
                >
                    {/* Main Card */}

                    {user.role !== "class" ? (
                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            {/* Header Background */}
                            <div className="h-32 bg-gradient-to-r from-primary/50 via-accent to-primary/50 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-8 pb-8">
                                {/* Avatar and Name */}
                                <div className="flex flex-col items-center -mt-16 mb-8 relative z-10">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/90 to-accent-foreground flex items-center justify-center text-white shadow-lg border-4 border-card mb-6">
                                        <User size={64} />
                                    </div>
                                    <h1 className="text-4xl font-bold text-foreground text-center mb-2">{user.name}</h1>
                                    <p className="text-muted-foreground text-lg">login:{user.login}</p>
                                </div>

                                {/* Stats Grid */}
                                {user.role !== "admin" && (
                                    <div className="grid grid-cols-1 gap-4 mb-8">
                                        <div className="bg-gradient-to-br from-primary/10 to-accent-foreground/10 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                                    <Award className="text-primary" size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground font-medium">Jami Ballar</p>
                                                    <p className="text-3xl font-bold text-foreground">{coins.coins}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {user.phoneNumber && (
                                            <div className="bg-gradient-to-br from-primary/10 to-accent-foreground/10 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                                        <Phone className="text-primary" size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground font-medium">Telefon raqam</p>
                                                        <p className="text-3xl font-bold text-foreground">{user.phoneNumber}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {user.tgUserName && (
                                            <div className="bg-gradient-to-br from-primary/10 to-accent-foreground/10 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                                        <Send className="text-primary" size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground font-medium">Telegramda foydalanuvchining nomi</p>
                                                        <p className="text-3xl font-bold text-foreground">{user.tgUserName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {user.email && (
                                            <div className="bg-gradient-to-br from-primary/10 to-accent-foreground/10 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                                        <Mail className="text-primary" size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground font-medium">Email</p>
                                                        <p className="text-3xl font-bold text-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                            {/* Header Background */}
                            <div className="h-40 bg-gradient-to-r from-primary/50 via-accent to-primary/50 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-8 pb-8">
                                {/* Header Section */}
                                <div className="flex flex-col items-center -mt-20 mb-8 relative z-10">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/90 to-accent-foreground flex items-center justify-center text-white shadow-lg border-4 border-card mb-6">
                                        <BookOpen size={64} />
                                    </div>
                                    <h1 className="text-5xl font-bold text-foreground text-center mb-2">{classData.className}</h1>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Award className="text-primary" size={20} />
                                            <p className="text-sm  text-muted-foreground font-medium">Umumiy ball</p>
                                        </div>
                                        <p className="text-3xl text-nowrap font-bold text-foreground">{classData.coins}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Users className="text-primary" size={20} />
                                            <p className="text-sm text-muted-foreground font-medium">O'quvchilar soni</p>
                                        </div>
                                        <p className="text-3xl font-bold text-foreground">{classData.students.length}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <LogIn className="text-primary" size={20} />
                                            <p className="text-sm text-muted-foreground font-medium">Login</p>
                                        </div>
                                        <p className="text-lg font-semibold text-foreground truncate">{classData.login}</p>
                                    </div>
                                </div>

                                {/* Students Section */}
                                <div className="mb-8">
                                    <div className="flex justify-between">
                                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                            <Users size={28} className="text-primary" />
                                            Sinf a'zolari
                                        </h2>
                                        <Button
                                            onClick={() => {
                                                setEditingStudent(null)
                                                setShowStudentForm(true)
                                            }}
                                        >
                                            O'quvchi qo'shish
                                        </Button>
                                    </div>
                                    {classData.students.length === 0 && (
                                            <Card className="p-12 max-w-2xl flex justify-center items-center mx-auto">
                                                <div className="text-center">
                                                    <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                                    <h3 className="text-lg font-semibold mb-2">O'quvchilar topilmadi</h3>
                                                </div>
                                            </Card>
                                        )}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {classData.students.map((student) => (
                                            <div
                                                key={student._id}
                                                className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-4 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-md"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-accent-foreground/70 flex items-center justify-center text-white font-semibold text-sm">
                                                        {student.fullName.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-muted-foreground truncate">
                                                            F.I.O: <span className="font-semibold">{student.fullName}</span>
                                                        </p>
                                                        <p className="text-sm text-muted-foreground truncate">Login: {student.login}</p>
                                                        {student.details.phoneNumber && (
                                                            <p className="text-sm text-muted-foreground truncate">
                                                                Telefon raqam: {student.details.phoneNumber}
                                                            </p>
                                                        )}
                                                        {student.details.tgUserName && (
                                                            <p className="text-sm text-muted-foreground truncate">
                                                                Telegram: {student.details.tgUserName}
                                                            </p>
                                                        )}
                                                        {student.details.email && (
                                                            <p className="text-sm text-muted-foreground truncate">Email: {student.details.email}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-1 min-h-[3rem] items-center justify-between">
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
                                                                    phoneNumber:
                                                                        student.details.phoneNumber === null ? "" : student.details.phoneNumber,
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
                                                            onClick={() => handleDeleteStudent(student._id)}
                                                            disabled={deleteId === student._id && deleteStudentPending}
                                                            className="h-8 w-8 text-destructive hover:text-destructive cursor-pointer"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showStudentForm && (
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
                                        <Label htmlFor="login">Login</Label>
                                        <Input
                                            id="login"
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
            </div>
        </div>
    )
}

export default ProfilePage
