import { memo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Calendar, Clock, Users, Gamepad2, X, Grid3x3 } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCybersportRooms, deleteCybersportRooms, fetchCybersportRooms, registerTocybersport } from "../../api/shop"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-hot-toast"
import formatUzDate from "../../utils/formatDate"

const CybersportRoomPage = ({ user }) => {
    const [deleteButtonId, setDeleteButtonId] = useState(null)
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [spots, setSpots] = useState(0)
    const [endTime, setEndTime] = useState("")
    const [points, setPoints] = useState(0)
    const [registeredUsers, setRegisteredUsers] = useState([])
    const [showRegisterUsersDialog, setRegisteredUsersDialog] = useState(false)
    const queryClient = useQueryClient()
    const { data: cybersportRooms, isPending: isCyberSportRoomsPending } = useQuery({
        queryKey: ["cybersportrooms"],
        queryFn: fetchCybersportRooms
    })
    const { mutate: mutationCreateCybersportRooms } = useMutation({
        mutationFn: createCybersportRooms,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "createCybersportRooms" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "createCybersportRooms" })
            } else {
                queryClient.invalidateQueries(["cybersportrooms"])
                toast.success(data.msg, { id: "createCybersportRooms" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "createCybersportRooms" })
    })
    const { mutate: mutationDeleteCybersportRooms } = useMutation({
        mutationFn: deleteCybersportRooms,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteCybersportRooms" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteCybersportRooms" })
            } else {
                queryClient.invalidateQueries(["cybersportrooms"])
                toast.success(data.msg, { id: "deleteCybersportRooms" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "deleteCybersportRooms" })
    })
    const { mutate: mutationRegisterForCybersport, isPending: registerPending } = useMutation({
        mutationFn: registerTocybersport,
        onMutate: () => toast.loading("Ro'yxatga qo'shilmoqda...", { id: "registerCybersportPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerCybersportPending" })
            } else {
                queryClient.invalidateQueries(["coins"])
                queryClient.invalidateQueries(["cybersportrooms"])
                toast.success(data.msg, { id: "registerCybersportPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerCybersportPending" })
    })

    const [showAddRoom, setShowAddRoom] = useState(false)

    const handleCreateCybersportRooms = (e) => {
        e.preventDefault()
        if (!date || !startTime || !endTime || !points || !spots) return toast.error("Barcha maydonlarni to'ldiring")
        mutationCreateCybersportRooms({ date, startTime, endTime, points, spots })
        setDate("")
        setStartTime("")
        setEndTime("")
        setPoints(0)
        setSpots(0)
        setShowAddRoom(false)
    }
    const handleDeleteCybersportRooms = (id) => {
        setDeleteButtonId(id)
        mutationDeleteCybersportRooms({ id })
    }
    const handleShowUsers = (roomid) => {
        const { registeredUsers } = cybersportRooms.find((r) => r._id === roomid)
        setRegisteredUsers(registeredUsers)
        console.log(registeredUsers)

        setRegisteredUsersDialog(true)
    }

    if (isCyberSportRoomsPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((el) => {
                    return (
                        <Card key={el} className="bg-card border-border">
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
                        <Gamepad2 className="h-6 w-6 text-primary" />
                        Kibersport xonalari
                    </h2>
                </div>
                {user.role === "admin" && (
                    <Button onClick={() => setShowAddRoom(!showAddRoom)} variant="default">
                        <Plus className="h-4 w-4 mr-2" />
                        Sessiya yaratish
                    </Button>
                )}
            </div>

            {showAddRoom && user.role === "admin" && (
                <Card className="mb-6 bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">Yangi sessiya yaratish</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreateCybersportRooms} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="room-date" className="text-card-foreground">
                                        Sana
                                    </Label>
                                    <Input
                                        id="room-date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        type="date"
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="room-start" className="text-card-foreground">
                                        Boshlash vaqti
                                    </Label>
                                    <Input
                                        id="room-start"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        type="time"
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="room-end" className="text-card-foreground">
                                        Tugash vaqti
                                    </Label>
                                    <Input
                                        id="room-end"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        type="time"
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                                <div className="">
                                    <Label htmlFor="court-points" className="text-card-foreground">
                                        Ball
                                    </Label>
                                    <Input
                                        id="court-points"
                                        value={points}
                                        onChange={(e) => setPoints(e.target.value)}
                                        type="number"
                                        min="0"
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                                <div className="">
                                    <Label htmlFor="court-spots" className="text-card-foreground">
                                        Joylar soni
                                    </Label>
                                    <Input
                                        id="court-spots"
                                        value={spots}
                                        onChange={(e) => setSpots(e.target.value)}
                                        type="number"
                                        min="0"
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit">Yaratish</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setDate("")
                                        setStartTime("")
                                        setEndTime("")
                                        setPoints("")
                                        setShowAddRoom(false)
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
                {cybersportRooms.length !== 0 ?  cybersportRooms.map((room) => (
                    <Card key={room._id} className="bg-card border-border hover:border-primary transition-colors">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">{"O'yin sessiyasi"}</CardTitle>
                            <CardDescription className="text-muted-foreground">Kibersport xonasi</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {
                                        formatUzDate(room.date)
                                    }
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                    {room.startTime} - {room.endTime}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Grid3x3 className="h-4 w-4" />
                                <span>
                                    Joylar: {room.spots}
                                </span>
                            </div>
                            <div
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                onClick={() => user.role === "admin" && handleShowUsers(room._id)}
                            >
                                <Users className="h-4 w-4" />
                                <span className={`${user.role === "admin" && "underline cursor-pointer"}`}>
                                    {room.registeredUsers.length} {"ro'yxatdan o'tgan"}
                                </span>
                            </div>
                            <div className="text-lg font-bold text-primary">{room.points} ball</div>
                        </CardContent>
                        {user.role === "admin" && (
                            <CardFooter>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>window.confirm("Buni aniq o'chirmoqchimisiz?") && handleDeleteCybersportRooms(room._id)}
                                    disabled={room._id === deleteButtonId}
                                    className="w-full"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    O&apos;chirish
                                </Button>
                            </CardFooter>
                        )}

                        {user.role === "student" ? (
                            !room.registeredUsers.some((u) => u._id === user.id) ? (
                                <CardFooter>
                                    <Button
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => {
                                            setDeleteButtonId(room._id)
                                            mutationRegisterForCybersport({ userId: user.id, cybersportId: room._id })
                                        }}
                                        disabled={registerPending && deleteButtonId === room._id}
                                    >
                                       {"Ro'yxatdan o'tish"}
                                    </Button>
                                </CardFooter>
                            ) : (
                                <CardFooter>
                                    <div className=" px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 w-full">
                                        <p className="text-sm font-semibold text-primary">Siz band qilgansiz</p>
                                    </div>
                                </CardFooter>
                            )
                        ) : null}
                    </Card>
                )) : (
                    <Card className="p-12 flex justify-center items-center col-span-full">
                        <div className="text-center max-w-2xl ">
                            <Gamepad2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Slot topilmadi</h3>
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

export default memo(CybersportRoomPage)
