import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequestForVolunteering } from "../../api/query"
import { Button } from "@/components/ui/button"

const RequestForVolunteering = ({ type, userId }) => {
    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const [eventName, setEventName] = useState("")
    const [date, setDate] = useState("")
    const [numberOfDays, setNumberOfDays] = useState(0)
    const [points, setPoints] = useState(0)
    const navigate = useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: postRequestForVolunteering,
        onMutate: () => toast.loading("Yuborilmoqda...", { id: "submitrequestPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "submitrequestPending" })
            } else {
                queryClient.invalidateQueries(["requests"])
                toast.success(data.msg, { id: "submitrequestPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "submitrequestPending" })
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !eventName || !date || !numberOfDays) return toast.error("Barcha maydonlarni to'ldiring")
        mutate({ type, userId, name, eventName, date, numberOfDays, points })
        setName("")
        setEventName("")
        setDate("")
        setNumberOfDays(0)
        setPoints(0)
        navigate("/requests")
    }
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="name">Ismingizni kiriting</Label>
                <Input id="name" type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Tadbir kunini kiriting</Label>
                <Input id="name" type="date" placeholder="" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Tadbir nomini kiriting</Label>
                <Input id="name" type="text" placeholder="" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="numberOfDays">Kunlar sonini kiriting</Label>
                <Input
                    id="numberOfDays"
                    type="number"
                    min="0"
                    placeholder=""
                    value={numberOfDays}
                    onChange={(e) => {
                        setPoints(e.target.value * 20)
                        setNumberOfDays(e.target.value)
                    }}
                />
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Taxminiy ball</span>
                    <span className="text-2xl font-bold text-primary">{points}</span>
                </div>
            </div>
            <Button onClick={handleSubmit} disabled={isPending} className={`py-2.5 w-full`}>
                So'rovni yuborish
            </Button>
        </>
    )
}

export default RequestForVolunteering
