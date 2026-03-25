import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { fetchData } from "../../api/event"
import { useNavigate } from "react-router-dom"
import { EachEventComponent, EventsEmptyState, EventsLoadingState } from "@/components/events"
import useEventMutations from "@/hooks/useEventMutations"
import AddEventDialog from "@/components/events/AddEventDialog"

const EventsPage = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user)

    const { data: events, isPending: getEventsPending, isError } = useQuery({ queryKey: ["events"], queryFn: fetchData })
    const { deleteEvents, mutationRegisterClass, registerClassPending, mutationRegisterStudent, registerStudentPending } = useEventMutations()

    // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    // const [currentEvent, setCurrentEvent] = useState(null)

    if (getEventsPending) <EventsLoadingState />

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Tadbirlar</h1>
                    </div>
                    {user.role === "admin" && <AddEventDialog />}
                </div>

                {/* Events Grid */}
                {events?.length === 0 ? (
                    <EventsEmptyState />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {!getEventsPending &&
                            events?.map((event) => (
                                <EachEventComponent key={event._id} event={event} userRole={user.role} userId={user.id} navigate={navigate} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default EventsPage
