import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { GraduationCap, Users, Calendar, Trash2 } from "lucide-react"
import formatUzDate from "@/utils/formatDate"
import { Button } from "@/components/ui/button"
import { memo, useCallback, useState } from "react"
import useEventMutations from "@/hooks/useEventMutations"
const EachEventComponent = ({ event, userRole, userId, navigate }) => {
    const [deleteButtonId, setDeleteButtonId] = useState("")

    const { deleteEvents, mutationRegisterClass, registerClassPending, mutationRegisterStudent, registerStudentPending } = useEventMutations()

    const handleNavigate = useCallback(
        (id) => {
            navigate(id)
        },
        [navigate]
    )
    return (
        <Card
            key={event._id}
            className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer `}
            onClick={() => handleNavigate(`${event._id}`)}
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
                            event.type === "Student" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                        }`}
                    >
                        {event.type === "Student" ? (
                            <>
                                <GraduationCap className="h-3 w-3" />
                                O&apos;quvchilar
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

            {userRole === "admin" ? (
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
                        O&apos;chirish
                    </Button>
                </CardFooter>
            ) : (
                userRole === event.type.toLowerCase() && (
                    <CardFooter className="flex gap-2">
                        {event.registeredUsers.includes(userId) ? (
                            <div className=" px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 w-full">
                                <p className="text-sm font-semibold text-primary">Siz ro&apos;yxatdan o&apos;tgansiz</p>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                className="flex-1 z-50"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (userRole === "class") {
                                        mutationRegisterClass({ eventId: event._id, classId: userId })
                                    }
                                    if (userRole === "student") {
                                        mutationRegisterStudent({
                                            eventId: event._id,
                                            studentId: userId
                                        })
                                    }
                                }}
                                disabled={userRole === "class" ? registerClassPending : registerStudentPending}
                            >
                                Ro&apos;yxatdan o&apos;tish
                            </Button>
                        )}
                    </CardFooter>
                )
            )}
        </Card>
    )
}

export default memo(EachEventComponent)
