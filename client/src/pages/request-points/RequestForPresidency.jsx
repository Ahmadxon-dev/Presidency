import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequestForPresidency } from "../../api/query"

const RequestForPresidency = ({ type, userId }) => {
    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const [level, setLevel] = useState(0)
    const [points, setPoints] = useState(0)
    const navigate = useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: postRequestForPresidency,
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
        if (!name || !level) return toast.error("Barcha maydonlarni to'ldiring")
        mutate({ type, userId, name, level, points })
        setName("")
        setLevel(0)
        setPoints(0)
        navigate("/requests")
    }
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="name">Ismingizni kiriting</Label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="number">Darajangizni kiriting</Label>
                <Input
                    id="number"
                    type="number"
                    min="1"
                    max="4"
                    value={level}
                    onChange={(e) => {
                        setLevel(e.target.value)
                        if (e.target.value === "1") {
                            setPoints(10)
                        }
                        if (e.target.value === "2") {
                            setPoints(25)
                        }
                        if (e.target.value === "3") {
                            setPoints(50)
                        }
                        if (e.target.value === "4") {
                            setPoints(100)
                        }
                    }}
                    placeholder=""
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

export default RequestForPresidency
