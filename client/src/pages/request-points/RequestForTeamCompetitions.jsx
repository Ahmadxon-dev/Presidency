import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { postRequestForTeamCompetitions } from "../../api/query"

const RequestForTeamCompetitions = ({ type, userId }) => {
    const queryClient = useQueryClient()
    const [competitionName, setCompetitionName] = useState("")
    const [competitionDate, setCompetitionDate] = useState("")
    const [place, setPlace] = useState("1")
    const [className, setClassName] = useState("")
    const [points, setPoints] = useState(200)
    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({
        mutationFn: postRequestForTeamCompetitions,
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
        if (!competitionName || !competitionDate || !place || !className) return toast.error("Barcha maydonlarni to'ldiring")
        mutate({ type, userId, competitionName, competitionDate, place, className, points })
        setCompetitionName("")
        setCompetitionDate("")
        setPlace("")
        setClassName("")
        setPoints("")
        navigate("/requests")
    }
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="name">Musobaqa nomini kiriting</Label>
                <Input id="name" value={competitionName} onChange={(e) => setCompetitionName(e.target.value)} type="text" placeholder="" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date">Musobaqa sanasini kiriting</Label>
                <Input id="date" value={competitionDate} onChange={(e) => setCompetitionDate(e.target.value)} type="date" placeholder="" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="place">Sinf olgan o'rnini kiriting</Label>
                <Input
                    id="place"
                    value={place}
                    onChange={(e) => {
                        setPlace(e.target.value)

                        if (e.target.value === "1") setPoints(200)
                        if (e.target.value === "2") setPoints(150)
                        if (e.target.value === "3") setPoints(100)
                    }}
                    type="number"
                    min="1"
                    max="3"
                    placeholder="..."
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="fish">Sinfni kiriting</Label>
                <Input id="fish" value={className} onChange={(e) => setClassName(e.target.value)} type="text" placeholder="" />
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

export default RequestForTeamCompetitions
