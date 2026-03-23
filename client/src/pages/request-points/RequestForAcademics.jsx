import React, { useEffect, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequestForAcademics } from "../../api/query"

const RequestForAcademics = ({ type, userId }) => {
    const queryClient = useQueryClient()
    const [points, setPoints] = useState(0)
    const [maxPoints, setMaxPoints] = useState(0)
    const [temporary, setTemporary] = useState(0)
    const [className, setClass] = useState("")
    const [subject, setSubject] = useState("")
    const [date, setDate] = useState("")
    const [bsbType, setBsbType] = useState("") //BSB-1 BSB-2
    const [teacher, setTeacher] = useState("")
    const [proofImage, setProofImage] = useState(null)
    const navigate = useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: postRequestForAcademics,
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
        if (!points || !maxPoints || !className || !subject || !date || !bsbType || !teacher || !proofImage) return toast.error("Barcha maydonlarni to'ldiring")
        const formData = new FormData()
        formData.append("userId", userId)
        formData.append("type", type)
        formData.append("points", temporary)
        formData.append("className", className)
        formData.append("subject", subject)
        formData.append("date", date)
        formData.append("bsbType", bsbType)
        formData.append("teacher", teacher)
        formData.append("maxPoints", maxPoints)
        if (proofImage) formData.append("proofImage", proofImage)
        mutate(formData)
        setPoints(0)
        setClass("")
        setSubject("")
        setDate("")
        setBsbType("")
        setTeacher("")
        setMaxPoints(0)
        setTemporary(0)
        setProofImage(null)
        navigate("/requests")
    }
    useEffect(() => {
        setTemporary(Math.floor(20*points/maxPoints))
    }, [points, maxPoints])
    
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="name">Sinfingizni kiriting</Label>
                <Input type="text" value={className} onChange={(e) => setClass(e.target.value)} placeholder="" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Fanni kiriting</Label>
                <Input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">BSB/ChSB sanasini kiriting</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Qaysi BSB/ChSB ligini kiriting</Label>
                <Input type="number" value={bsbType} onChange={(e) => setBsbType(e.target.value)} placeholder="" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Ustozning F.I.O sini kiriting</Label>
                <Input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="" />
            </div>
            <div className="space-y-2">
                {/* <Label htmlFor="name">Olingan ballni berilganlardan tanlang</Label>
                <Select value={points} onValueChange={(value) => setPoints(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Bsb dan olingan ball" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="20">24-25/25</SelectItem>
                            <SelectItem value="10">22-23/25</SelectItem>
                            <SelectItem value="5">20-21/25</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select> */}
            </div>
            <div className="space-y-2">
                <Label htmlFor="yourpoints">Siz olgan ball ni kiriting</Label>
                <Input type="number" min="0"  value={points} onChange={(e) => setPoints(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="max-points">Maksimum ball ni kiriting</Label>
                <Input type="number" min="0" value={maxPoints} onChange={(e) => setMaxPoints(e.target.value)} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="name">BSB/ChSB dan olingan ballni isbotlash uchun rasmni joylang</Label>
                <Input type="file" accept="image/*" onChange={(e) => setProofImage(e.target.files[0])} placeholder="Rasm joylang" />
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Taxminiy ball</span>
                    <span className="text-2xl font-bold text-primary">{maxPoints && points ? temporary : 0}</span>
                </div>
            </div>
            <Button onClick={handleSubmit} disabled={isPending} className={`py-2.5 w-full`}>
                So'rovni yuborish
            </Button>
        </>
    )
}

export default RequestForAcademics
