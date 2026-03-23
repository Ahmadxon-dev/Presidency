import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Trash2, Users, GraduationCap } from "lucide-react"
import toast from "react-hot-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux"
import { createEvents, deletingEvents, fetchData, registerStudent, registerClass } from "../../api/event"
import { useNavigate } from "react-router-dom"
import formatUzDate from "../../utils/formatDate"

const EventsPage = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user)
    const { data: events, isPending: getEventsPending, isError } = useQuery({ queryKey: ["events"], queryFn: fetchData })
    const [deleteButtonId, setDeleteButtonId] = useState("")
    const { mutate: mutationCreateEvents } = useMutation({
        mutationFn: createEvents,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "createEventsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "createEventsPending" })
            } else {
                queryClient.invalidateQueries(["events"])
                toast.success(data.msg, { id: "createEventsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "createEventsPending" })
    })
    const { mutate: deleteEvents, isPending: deleteEventsPending } = useMutation({
        mutationFn: deletingEvents,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteEventsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteEventsPending" })
            } else {
                queryClient.invalidateQueries(["news"])
                toast.success(data.msg, { id: "deleteEventsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "deleteEventsPending" })
    })
    const { mutate: mutationRegisterClass, isPending: registerClassPending } = useMutation({
        mutationFn: registerClass,
        onMutate: () => toast.loading("Ro'yxatda saqlanmoqda...", { id: "registerclasses" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerclasses" })
            } else {
                queryClient.invalidateQueries(["events"])
                toast.success(data.msg, { id: "registerclasses" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerclasses" })
    })
    const { mutate: mutationRegisterStudent, isPending: registerStudentPending } = useMutation({
        mutationFn: registerStudent,
        onMutate: () => toast.loading("Ro'yxatdan o'tilmoqda...", { id: "registerstudents" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerstudents" })
            } else {
                queryClient.invalidateQueries(["events"])
                toast.success(data.msg, { id: "registerstudents" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerstudents" })
    })
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [currentEvent, setCurrentEvent] = useState(null)
    const [eventDate, setEventDate] = useState("")
    const [description, setDescription] = useState("")
    const [eventName, setEventName] = useState("")
    const [img, setImg] = useState(null)
    const [eventType, setEventType] = useState("")

    const handleCreateEvent = async () => {
        if (!eventDate || !eventName || !eventType || !description) return toast.error("Barcha maydonlarni to'ldiring")
        const formData = new FormData()
        formData.append("eventDate", eventDate)
        formData.append("description", description)
        formData.append("eventName", eventName)
        formData.append("type", eventType)

        if (img) formData.append("event_image", img)
        mutationCreateEvents(formData)
        setEventDate("")
        setDescription("")
        setEventName("")
        setEventType("")
        setImg(null)
        setIsAddDialogOpen(false)
    }

    if (getEventsPending) {
        return (
            <div className="min-h-screen  p-12">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((el) => {
                            return (
                                <Card key={el} className="overflow-hidden">
                                    {/* Image skeleton with badge */}
                                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                                        <Skeleton className="w-full h-full" />
                                        <div className="absolute top-3 right-3">
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                        </div>
                                    </div>

                                    <CardHeader>
                                        {/* Title skeleton */}
                                        <Skeleton className="h-6 w-3/4 mb-2" />
                                        {/* Date skeleton */}
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-4 rounded" />
                                            <Skeleton className="h-4 w-40" />
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        {/* Description skeleton - 2 lines */}
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-5/6 mb-2" />
                                        {/* Event name skeleton */}
                                        <Skeleton className="h-4 w-32 mb-3" />
                                        {/* Type indicator skeleton */}
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-4 rounded" />
                                            <Skeleton className="h-4 w-36" />
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex gap-2">
                                        {/* Edit button skeleton */}
                                        <Skeleton className="h-9 flex-1" />
                                        {/* Delete button skeleton */}
                                        <Skeleton className="h-9 flex-1" />
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Tadbirlar</h1>
                    </div>
                    {user.role === "admin" && (
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                // onClick={openAddDialog}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tadbir qo'shish
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Yangi tadbir yaratish</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="add-eventName">Tadbir nomi*</Label>
                                        <Input id="add-eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="add-description">Tadbir uchun tavsif</Label>
                                        <Textarea
                                            id="add-description"
                                            value={description}
                                            required
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="resize-none"
                                            rows={4}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="add-image">Rasm tanlash(majburiy emas)</Label>
                                        <Input
                                            id="add-image"
                                            accept="image/*"
                                            onChange={(e) => setImg(e.target.files[0])}
                                            type="file"
                                            placeholder="Enter image URL (optional)"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="add-date">Tadbir sanasi</Label>
                                        <Input id="add-date" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="add-type">Tadbir turi</Label>
                                        <Select value={eventType} onValueChange={(value) => setEventType(value)}>
                                            <SelectTrigger id="add-type">
                                                <SelectValue placeholder="Select event type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Student">O'quvchilar uchun</SelectItem>
                                                <SelectItem value="Class">Sinflar uchun</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleCreateEvent}>Tadbir yaratish</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {/* Events Grid */}
                {events?.length === 0 ? (
                    <Card className="p-12">
                        <div className="text-center">
                            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Tadbir topilmadi</h3>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {!getEventsPending &&
                            events?.map((event) => (
                                <Card
                                    key={event._id}
                                    className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer `}
                                    onClick={() => navigate(`${event._id}`)}
                                >
                                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                                        {event.img && (
                                            <img
                                                src={event.img}
                                                // eslint-disable-next-line react/no-unknown-property
                                                fetchpriority="high"
                                                alt={event.eventName}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <div className="absolute top-3 right-3">
                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                                                    event.type === "Student"
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-secondary text-secondary-foreground"
                                                }`}
                                            >
                                                {event.type === "Student" ? (
                                                    <>
                                                        <GraduationCap className="h-3 w-3" />
                                                        O'quvchilar
                                                    </>
                                                ) : (
                                                    <>
                                                        <Users className="h-3 w-3" />
                                                        Sinf
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="truncate">{event.eventName}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-2 mb-[-1rem]">
                                            <Calendar className="h-4 w-4" />
                                            {formatUzDate(event.eventDate)}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground truncate mb-2">{event.description}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Users className="h-4 w-4" />
                                            <span>
                                                {event.registeredUsers.length} {"ro'yxatdan o'tgan"}
                                            </span>
                                        </div>
                                    </CardContent>

                                    {user.role === "admin" ? (
                                        <CardFooter className="flex gap-2">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="flex-1"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    if (window.confirm("Buni aniq o'chirmoqchimisiz?")) {
                                                        setDeleteButtonId(event._id)
                                                        deleteEvents({ id: event._id })
                                                    }
                                                }}
                                                disabled={deleteButtonId === event._id}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                O'chirish
                                            </Button>
                                        </CardFooter>
                                    ) : (
                                        user.role === event.type.toLowerCase() && (
                                            <CardFooter className="flex gap-2">
                                                {event.registeredUsers.includes(user.id) ? (
                                                    <div className=" px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 w-full">
                                                        <p className="text-sm font-semibold text-primary">Siz ro'yxatdan o'tgansiz</p>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        className="flex-1 z-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            if (user.role === "class") {
                                                                mutationRegisterClass({ eventId: event._id, classId: user.id })
                                                            }
                                                            if (user.role === "student") {
                                                                mutationRegisterStudent({
                                                                    eventId: event._id,
                                                                    studentId: user.id
                                                                })
                                                            }
                                                        }}
                                                        disabled={user.role === "class" ? registerClassPending : registerStudentPending}
                                                    >
                                                        Ro'yxatdan o'tish
                                                    </Button>
                                                )}
                                            </CardFooter>
                                        )
                                    )}
                                </Card>
                            ))}
                    </div>
                )}

                {/* Edit Dialog */}
                {/* <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Event</DialogTitle>
                            <DialogDescription>Update the event details</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-eventName">Event Name *</Label>
                                <Input
                                    id="edit-eventName"
                                    // value={formData.eventName}
                                    // onChange={(e) => handleInputChange('eventName', e.target.value)}
                                    placeholder="Enter event name"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    // value={formData.description}
                                    // onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Enter event description"
                                    rows={4}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-image">Event Image URL</Label>
                                <Input
                                    id="edit-image"
                                    // value={formData.event_image}
                                    // onChange={(e) => handleInputChange('event_image', e.target.value)}
                                    placeholder="Enter image URL"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-date">Event Date *</Label>
                                <Input
                                    id="edit-date"
                                    type="date"
                                    // value={formData.eventDate}
                                    // onChange={(e) => handleInputChange('eventDate', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-type">Event Type *</Label>
                                <Select
                                // value={formData.type} onValueChange={(value) => handleInputChange('type', value)}
                                >
                                    <SelectTrigger id="edit-type">
                                        <SelectValue placeholder="Select event type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Student">{"O'quvchi"}</SelectItem>
                                        <SelectItem value="Class">Sinf</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                            // onClick={handleCreateEvent}
                            >
                                Saqlash
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog> */}
            </div>
        </div>
    )
}

export default EventsPage
