import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Calendar, Users, Trophy, X, Landmark } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createMockTests, deleteMockTests, fetchMockTests, registerToTest } from "../../api/shop"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-hot-toast"
import formatUzDate from "../../utils/formatDate"

const MockTestPage = ({ user }) => {
    const [type, setType] = useState("")
    const [date, setDate] = useState("")
    const [points, setPoints] = useState("")
    const [room, setRoom] = useState("")
    const [deleteButtonId, setDeleteButtonId] = useState(null)
    const [showAddTest, setShowAddTest] = useState(false)
    const [registeredUsers, setRegisteredUsers] = useState([])
    const [showRegisterUsersDialog, setRegisteredUsersDialog] = useState(false)
    const queryClient = useQueryClient()
    const { data: mockTests, isPending: isMockTestsPending } = useQuery({ queryKey: ["mocktests"], queryFn: fetchMockTests })
    const { mutate: mutationCreateTest } = useMutation({
        mutationFn: createMockTests,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "createMockTestsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "createMockTestsPending" })
            } else {
                queryClient.invalidateQueries(["mocktests"])
                toast.success(data.msg, { id: "createMockTestsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "createMockTestsPending" })
    })
    const { mutate: mutationDeleteMockTests } = useMutation({
        mutationFn: deleteMockTests,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteMockTests" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteMockTests" })
            } else {
                queryClient.invalidateQueries(["mocktests"])
                toast.success(data.msg, { id: "deleteMockTests" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "deleteMockTests" })
    })

    const { mutate: mutationRegisterForTest, isPending: registerPending } = useMutation({
        mutationFn: registerToTest,
        onMutate: () => toast.loading("Ro'yxatga qo'shilmoqda...", { id: "registerMockTestsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerMockTestsPending" })
            } else {
                queryClient.invalidateQueries(["mocktests"])
                queryClient.invalidateQueries(["coins"])
                toast.success(data.msg, { id: "registerMockTestsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerMockTestsPending" })
    })

    const handleAddMockTests = (e) => {
        e.preventDefault()
        if (!type || !date || !points || !room) return toast.error("Barcha maydonlarni to'ldiring")
        mutationCreateTest({ date, type, points, room })
        setShowAddTest(false)
        setType("")
        setDate("")
        setPoints("")
        setRoom("")
    }
    const handleDeleteMockTests = (id) => {
        setDeleteButtonId(id)
        mutationDeleteMockTests({ id })
    }
    const handleShowUsers = (testId) => {
        const { registeredUsers } = mockTests.find((test) => test._id === testId)
        setRegisteredUsers(registeredUsers)
        setRegisteredUsersDialog(true)
    }

    if (isMockTestsPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((el) => {
                    return (
                        <Card key={el} className="bg-card border-border animate-pulse">
                            <CardHeader>
                                <Skeleton className="h-4 w-32" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="h-6 w-24" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-9 w-full" />
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        )
    }
    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-primary" />
                        Mock testlar
                    </h2>
                </div>
                {user.role === "admin" && (
                    <Button onClick={() => setShowAddTest(!showAddTest)} variant="default">
                        <Plus className="h-4 w-4 mr-2" />
                        Mock qo'shish
                    </Button>
                )}
            </div>

            {showAddTest && user.role === "admin" && (
                <Card className="mb-6 bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">Yangi test yaratish</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddMockTests} className="space-y-4" encType="multipart/form-data">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="test-date" className="text-card-foreground">
                                        Sana
                                    </Label>
                                    <Input
                                        id="test-date"
                                        // name="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="test-type" className="text-card-foreground">
                                        Mock turi
                                    </Label>

                                    <Select
                                        value={type}
                                        onValueChange={(value) => setType(value)}
                                        // name="type"
                                    >
                                        <SelectTrigger id="test-type" className="bg-background text-foreground border-border w-full ">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ielts">IELTS</SelectItem>
                                            <SelectItem value="sat">SAT</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="">
                                    <Label htmlFor="test-points" className="text-card-foreground">
                                        Ball
                                    </Label>
                                    <Input
                                        id="test-points"
                                        type="number"
                                        min="0"
                                        value={points}
                                        onChange={(e) => setPoints(e.target.value)}
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                                <div className="">
                                    <Label htmlFor="test-room" className="text-card-foreground">
                                        Xona
                                    </Label>
                                    <Input
                                        id="test-room"
                                        type="text"
                                        value={room}
                                        onChange={(e) => setRoom(e.target.value)}
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit">Test yaratish</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setShowAddTest(false)
                                        setType("")
                                        setDate("")
                                        setPoints("")
                                        setRoom("")
                                    }}
                                >
                                    Bekor qilish
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTests.length !== 0 ? (
                    mockTests?.map((test) => (
                        <Card key={test._id} className="bg-card border-border hover:border-primary transition-colors">
                            <CardHeader>
                                <CardTitle className="text-card-foreground">{test.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatUzDate(test.date)}</span>
                                </div>
                                <div
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                    onClick={() => user.role === "admin" && handleShowUsers(test._id)}
                                >
                                    <Users className="h-4 w-4" />
                                    <span className={`${user.role === "admin" && "underline cursor-pointer"}`}>
                                        {test.registeredUsers.length} {"ro'yxatdan o'tgan"}
                                    </span>
                                </div>

                                {test.room && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Landmark className="h-4 w-4" />
                                        <span>{test.room}</span>
                                    </div>
                                )}
                                <div className="text-lg font-bold text-primary">{test.points} Ball</div>
                            </CardContent>
                            {user.role === "admin" && (
                                <CardFooter>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => window.confirm("Buni aniq o'chirmoqchimisiz?") && handleDeleteMockTests(test._id)}
                                        disabled={test._id === deleteButtonId}
                                        className="w-full"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        O'chirish
                                    </Button>
                                </CardFooter>
                            )}
                            {user.role === "student" ? (
                                !test.registeredUsers.some((u) => u._id === user.id) ? (
                                    <CardFooter>
                                        <Button
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => {
                                                setDeleteButtonId(test._id)
                                                mutationRegisterForTest({ userId: user.id, mockId: test._id })
                                            }}
                                            disabled={registerPending && deleteButtonId === test._id}
                                        >
                                            Ro'yxatdan o'tish
                                        </Button>
                                    </CardFooter>
                                ) : (
                                    <CardFooter>
                                        <div className=" px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 w-full">
                                            <p className="text-sm font-semibold text-primary">Siz ro'yxatdan o'tgansiz</p>
                                        </div>
                                    </CardFooter>
                                )
                            ) : null}
                        </Card>
                    ))
                ) : (
                    <Card className="p-12 flex justify-center items-center col-span-full">
                        <div className="text-center max-w-2xl ">
                            <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Mock topilmadi</h3>
                        </div>
                    </Card>
                )}
                {user.role === "admin" && showRegisterUsersDialog === true && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="bg-card border-border w-full max-w-md max-h-96 flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                                <CardTitle className="text-card-foreground"></CardTitle>
                                <button
                                    onClick={() => setRegisteredUsersDialog(false)}
                                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-y-auto">
                                <div className="space-y-2">
                                    {registeredUsers.map((user) => (
                                        <div
                                            key={user._id}
                                            className="flex items-center justify-between p-2 bg-background rounded border border-border"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{user.fullName}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </section>
    )
}

export default MockTestPage
