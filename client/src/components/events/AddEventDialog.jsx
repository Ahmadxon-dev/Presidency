import { Dialog } from "@/components/ui/dialog"
import { DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DialogHeader } from "@/components/ui/dialog"
import { DialogContent } from "@/components/ui/dialog"
import { DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectItem } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "react-hot-toast"
import useEventMutations from "./../../hooks/useEventMutations"
const AddEventDialog = () => {
    const [eventDate, setEventDate] = useState("")
    const [description, setDescription] = useState("")
    const [eventName, setEventName] = useState("")
    const [img, setImg] = useState(null)
    const [eventType, setEventType] = useState("")

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    const { mutationCreateEvents } = useEventMutations()

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
    return (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button
                // onClick={openAddDialog}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Tadbir qo&apos;shish
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
                                <SelectItem value="Student">O&apos;quvchilar uchun</SelectItem>
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
    )
}

export default AddEventDialog
