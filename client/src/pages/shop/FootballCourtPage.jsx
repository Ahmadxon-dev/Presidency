import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Calendar, Clock, Users, Trophy, Gamepad2, Volleyball } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-hot-toast"
import { createFootBallCourts, deleteFootBallCourts, fetchFootBallCourts, registerTofootball } from "../../api/shop"
import formatUzDate from "../../utils/formatDate"

const FootballCourtPage = ({ user }) => {
    const [showAddCourt, setShowAddCourt] = useState(false)
    const [deleteButtonId, setDeleteButtonId] = useState(null)
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [points, setPoints] = useState("")
    const queryClient = useQueryClient()

    const { data: footballCourts, isPending: isFootBallCourtsPending } = useQuery({
        queryKey: ["footballcourts"],
        queryFn: fetchFootBallCourts
    })
    const { mutate: mutationCreateFootBallCourts } = useMutation({
        mutationFn: createFootBallCourts,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "createFootBallCourtsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "createFootBallCourtsPending" })
            } else {
                queryClient.invalidateQueries(["footballcourts"])
                toast.success(data.msg, { id: "createFootBallCourtsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "createFootBallCourtsPending" })
    })
    const { mutate: mutationDeleteFootBallCourts } = useMutation({
        mutationFn: deleteFootBallCourts,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteFootBallCourts" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteFootBallCourts" })
            } else {
                queryClient.invalidateQueries(["footballcourts"])
                toast.success(data.msg, { id: "deleteFootBallCourts" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "deleteFootBallCourts" })
    })
    const { mutate: mutationRegisterForFootball, isPending: registerFootballPending } = useMutation({
        mutationFn: registerTofootball,
        onMutate: () => toast.loading("Ro'yxatga qo'shilmoqda...", { id: "registerFootballPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerFootballPending" })
            } else {
                queryClient.invalidateQueries(["coins"])
                queryClient.invalidateQueries(["footballcourts"])
                toast.success(data.msg, { id: "registerFootballPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerFootballPending" })
    })

    const handleAddFootBallCourts = (e) => {
        e.preventDefault()
        if (!date || !startTime || !endTime || !points) return toast.error("Barcha maydonlarni to'ldiring")
        mutationCreateFootBallCourts({ date, startTime, endTime, points })
        setDate("")
        setStartTime("")
        setEndTime("")
        setPoints("")
        setShowAddCourt(false)
    }
    const handleDeleteFootBallCourts = (id) => {
        setDeleteButtonId(id)
        mutationDeleteFootBallCourts({ id })
    }

    if (isFootBallCourtsPending) {
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
                        <Volleyball  className="h-6 w-6 text-primary" />
                        Futbol maydoni
                    </h2>
                    {/* <p className="text-muted-foreground mt-1">Reserve your playing time</p> */}
                </div>
                {user.role === "admin" && (
                    <Button onClick={() => setShowAddCourt(!showAddCourt)} variant="default">
                        <Plus className="h-4 w-4 mr-2" />
                        Sessiya yaratish
                    </Button>
                )}
            </div>

            {showAddCourt && user.role === "admin" && (
                <Card className="mb-6 bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">Yangi maydon sessiyasini qo'shish</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddFootBallCourts} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="court-date" className="text-card-foreground">
                                        Sana
                                    </Label>
                                    <Input
                                        id="court-date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        type="date"
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="court-start" className="text-card-foreground">
                                        Boshlash vaqti
                                    </Label>
                                    <Input
                                        id="court-start"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        type="time"
                                        required
                                        className="bg-background text-foreground border-border"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="court-end" className="text-card-foreground">
                                        Tugatish vaqti
                                    </Label>
                                    <Input
                                        id="court-end"
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
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit">Sessiya qo'shish</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setDate("")
                                        setStartTime("")
                                        setEndTime("")
                                        setPoints("")
                                        setShowAddCourt(false)
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
                {footballCourts.length !== 0 ? (
                    footballCourts.map((court) => (
                        <Card key={court._id} className="bg-card border-border hover:border-primary transition-colors">
                            <CardHeader>
                                <CardDescription className="text-muted-foreground">
                                    {court.isBooked ? (
                                        <CardTitle className="text-destructive text-lg">
                                            {court.bookedBy?  `${court.bookedBy.className} tomonidan band qilingan` :"Band qilgan sinf o'chirilgan"} {" "}
                                            
                                        </CardTitle>
                                    ) : (
                                        <CardTitle className="text-primary">Mavjud</CardTitle>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {formatUzDate(court.date)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {court.startTime} - {court.endTime}
                                    </span>
                                </div>
                                <div className="text-lg font-bold text-primary">{court.points} Ball</div>
                            </CardContent>

                            {user.role === "admin" && (
                                <CardFooter>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => window.confirm("Buni aniq o'chirmoqchimisiz?") && handleDeleteFootBallCourts(court._id)}
                                        className="w-full"
                                        disabled={court._id === deleteButtonId}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        O'chirish
                                    </Button>
                                </CardFooter>
                            )}

                            {user.role === "class" ? (
                                court.isBooked === true && court.bookedBy._id === user.id ? (
                                    <CardFooter>
                                        <div className=" px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 w-full">
                                            <p className="text-sm font-semibold text-primary">Siz band qilgansiz</p>
                                        </div>
                                    </CardFooter>
                                ) : (
                                    <CardFooter>
                                        <Button
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => {
                                                setDeleteButtonId(court._id)
                                                mutationRegisterForFootball({ classId: user.id, courtId: court._id })
                                            }}
                                            disabled={registerFootballPending && deleteButtonId === court._id}
                                        >
                                            Ro'yxatdan o'tish
                                        </Button>
                                    </CardFooter>
                                )
                            ) : null}
                        </Card>
                    ))
                ) : (
                   <Card className="p-12 flex justify-center items-center col-span-full">
                        <div className="text-center max-w-2xl ">
                            <Volleyball className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Slot topilmadi</h3>
                        </div>
                    </Card>
                )}
            </div>
        </section>
    )
}

export default FootballCourtPage
