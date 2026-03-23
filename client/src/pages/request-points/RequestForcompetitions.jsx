import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { postRequestForCompetitions } from "../../api/query"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"

const RequestForcompetitions = ({ type, userId }) => {
    const queryClient = useQueryClient()
    const [competitionName, setCompetitionName] = useState("")
    const [competitionDate, setCompetitionDate] = useState("")
    const [place, setPlace] = useState("1")
    const [name, setName] = useState("")
    const [points, setPoints] = useState(50)
    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({
        mutationFn: postRequestForCompetitions,
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
        if (!competitionName || !competitionDate || !place || !name) return toast.error("Barcha maydonlarni to'ldiring")
        mutate({ type, userId, competitionName, competitionDate, place, name, points })
        setCompetitionName("")
        setCompetitionDate("")
        setPlace("")
        setName("")
        setPoints("")
        navigate("/requests")
    }
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="name">Musobaqa/Olimpiada nomini kiriting</Label>
                <Input id="name" value={competitionName} onChange={(e) => setCompetitionName(e.target.value)} type="text" placeholder="" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date">Musobaqa/Olimpiada sanasini kiriting</Label>
                <Input id="date" value={competitionDate} onChange={(e) => setCompetitionDate(e.target.value)} type="date" placeholder="" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="place">O'quvchi olgan o'rnini kiriting</Label>
                <Input
                    id="place"
                    value={place}
                    onChange={(e) => {
                        setPlace(e.target.value)

                        if (e.target.value === "1") setPoints(50)
                        if (e.target.value === "2") setPoints(35)
                        if (e.target.value === "3") setPoints(25)
                    }}
                    type="number"
                    min="1"
                    max="3"
                    placeholder=""
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="fish">O'quvchini ismini kiriting</Label>
                <Input id="fish" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="" />
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

export default RequestForcompetitions
