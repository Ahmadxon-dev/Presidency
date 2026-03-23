import React, { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Plus,
    FileText,
    Calendar,
    BookOpen,
    User,
    Check,
    X,
    Zap,
    PartyPopper,
    Menu,
    CalendarCheck,
    Trophy,
    GraduationCap,
    ZoomIn
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { approvePost as approvePostFN, deleteAllRequests, fetchAllRequests, fetchRequestUserId, rejectPost as rejectPostFN } from "../../api/query"
import { useNavigate } from "react-router-dom"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import ImageModal from "./../../components/shared/ImageModal"
import { toast } from "react-hot-toast"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
const STATUS_CONFIG = {
    pending: { bg: "bg-yellow-50 dark:bg-yellow-950", text: "text-yellow-700 dark:text-yellow-200", label: "Kutilmoqda" },
    approved: { bg: "bg-green-50 dark:bg-green-950", text: "text-green-700 dark:text-green-200", label: "Tasdiqlangan" },
    rejected: { bg: "bg-red-50 dark:bg-red-950", text: "text-red-700 dark:text-red-200", label: "Rad etilgan" }
}
const typeLabelMap = {
    academics: "BSB/ChSB",
    volunteering: "Volontyorlik",
    "presidency-salaries": "Presidency maoshlari",
    competitions: "Musobaqalar va Fan olimpiadalari",
    "team-competitions": "Sinf musobaqalari"
}
const MainRequestPointsPage = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [filtered, setFiltered] = useState("*")
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user)
    const isAdmin = user.role === "admin"
    const { data: requests, isPending } = useQuery({
        queryKey: isAdmin ? ["requests"] : ["requests", user.id],
        queryFn: () => (isAdmin ? fetchAllRequests() : fetchRequestUserId({ id: user.id }))
        // enabled: isAdmin || isStudent
    })
    const requestDeleteMutation = useMutation({
        mutationFn: deleteAllRequests,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteTransactions" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteTransactions" })
            } else {
                queryClient.invalidateQueries(["transactions"])
                toast.success(data.msg, { id: "deleteTransactions" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "deleteTransactions" })
    })
    const approvePost = useMutation({
        mutationFn: approvePostFN,
        onMutate: () => toast.loading("Saqlanmoqda...", { id: "approvePostPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "approvePostPending" })
            } else {
                queryClient.invalidateQueries(["requests", "transactions"])
                toast.success(data.msg, { id: "approvePostPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "approvePostPending" })
    })
    const rejectPost = useMutation({
        mutationFn: rejectPostFN,
        onMutate: () => toast.loading("Saqlanmoqda...", { id: "rejectPostPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "rejectPostPending" })
            } else {
                queryClient.invalidateQueries(["requests", "transactions"])
                toast.success(data.msg, { id: "rejectPostPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "rejectPostPending" })
    })
    const filteredData = useMemo(() =>{
        if(filtered === "*") return requests
        return requests.filter(r => r.status === filtered)
    }, [filtered, requests])
    if (isPending) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8 ">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-foreground mb-2">{isAdmin ? "Barcha so'rovlar" : "Mening so'rovlarim"}</h1>
                        </div>
                        <Button onClick={() => navigate("/request-points")} className={`cursor-pointer`}>
                            <Plus className="mr-2 h-4 w-4" />
                            So'rov yaratish
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="border border-border rounded-lg bg-card">
                                <div className="flex items-center justify-between gap-4 px-5 py-4">
                                    {/* Left side: Type badge skeleton */}
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-8 w-24 rounded" />
                                    </div>

                                    {/* Right side: Status badge skeleton */}
                                    <Skeleton className="h-8 w-20 rounded mr-10" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8 ">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold  text-foreground mb-2">{isAdmin ? "Barcha so'rovlar" : "Mening so'rovlarim"}</h1>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">

                            <NativeSelect value={filtered} onChange={e => setFiltered(e.target.value)} >
                                <NativeSelectOption value="*" >Barchasi</NativeSelectOption>
                                <NativeSelectOption value="approved">Tasdiqlangan</NativeSelectOption>
                                <NativeSelectOption value="rejected">Rad etilgan</NativeSelectOption>
                                <NativeSelectOption value="pending">Kutilmoqda</NativeSelectOption>
                            </NativeSelect>
                            {!isAdmin && (
                                <Button onClick={() => navigate("/request-points")} className={`cursor-pointer`}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    So'rov yaratish
                                </Button>
                            )}
                            {isAdmin && (
                                <Button
                                    onClick={() => window.confirm("Buni aniq o'chirmoqchimisiz?") && requestDeleteMutation.mutate()}
                                    disabled={requestDeleteMutation.isPending || requests.length === 0}
                                    className={`cursor-pointer`}
                                >
                                    Barcha so'rovlarni o'chirish
                                </Button>
                            )}
                        </div>
                    </div>

                    {filteredData.length === 0 ? (
                        <Card className="p-12">
                            <div className="text-center">
                                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">So'rovlar topilmadi</h3>
                            </div>
                        </Card>
                    ) : (
                        <Accordion type="single" collapsible className="space-y-3">
                            {filteredData.map((request) => (
                                <AccordionItem
                                    key={request._id}
                                    value={request._id}
                                    className="border border-border rounded-lg bg-card cursor-pointer [&:last-child]:border-b"
                                >
                                    <AccordionTrigger className="px-5  hover:bg-muted/30 transition-colors cursor-pointer">
                                        <div className="flex items-start justify-between gap-4 w-full text-left">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-medium px-2 py-1 bg-primary/20 text-primary rounded">
                                                        {typeLabelMap[request.type]}
                                                    </span>
                                                </div>
                                            </div>

                                            <span
                                                className={`text-lg font-semibold px-2 py-1 rounded ${STATUS_CONFIG[request.status].bg} ${
                                                    STATUS_CONFIG[request.status].text
                                                }`}
                                            >
                                                {STATUS_CONFIG[request.status].label}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-muted/20 px-5 py-4 space-y-4">
                                        {request.type === "competitions" && (
                                            <div className="competitions">
                                                <div className="space-y-3 mx-auto text-base flex flex-col items-start lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-6">
                                                    <div className="flex items-start gap-3  event-date">
                                                        <PartyPopper className="text-green-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Tadbir nomi
                                                            </p>
                                                            <p className="text-slate-900 text-base dark:text-white">
                                                                {request.details.competitionName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3  event-date">
                                                        <Calendar className="text-blue-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Tadbir sanasi
                                                            </p>
                                                            <p className="text-slate-900 text-base dark:text-white">
                                                                {new Date(request.details.competitionDate).toLocaleDateString("en-US", {
                                                                    month: "long",
                                                                    day: "numeric",
                                                                    year: "numeric"
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3    student-name">
                                                        <User className="text-indigo-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                O'quvchining ismi
                                                            </p>
                                                            <p className="text-slate-900 dark:text-white">{request.details.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3 student-place ">
                                                        <Trophy className="text-purple-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                O'rin
                                                            </p>
                                                            <p className="text-slate-900 dark:text-white">{request.details.place}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3">
                                                        <Zap className="text-amber-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Ball</p>
                                                            <p className="text-slate-900 dark:text-white ">{request.points}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {request.type === "presidency-salaries" && (
                                            <div className="presidency">
                                                <div className="space-y-3 mx-auto text-base flex flex-col items-start lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-6">
                                                    <div className="flex items-start gap-3  name">
                                                        <User className="text-green-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                O'quvchining ismi
                                                            </p>
                                                            <p className="text-slate-900 text-base dark:text-white">{request.details.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3  level">
                                                        <Menu className="text-blue-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Daraja
                                                            </p>
                                                            <p className="text-slate-900 text-base dark:text-white">{request.details.level}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3 points">
                                                        <Zap className="text-purple-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Ball</p>
                                                            <p className="text-slate-900 dark:text-white ">{request.points}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {request.type === "volunteering" && (
                                            <div className="competitions">
                                                <div className="space-y-3 mx-auto text-base flex flex-col items-start lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-6">
                                                    <div className="flex items-start gap-3  event-date">
                                                        <PartyPopper className="text-green-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Tadbir nomi
                                                            </p>
                                                            <p className="text-slate-900 text-base dark:text-white">{request.details.eventName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3  event-date">
                                                        <Calendar className="text-blue-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Tadbir sanasi
                                                            </p>
                                                            <p className="text-slate-900 text-base dark:text-white">
                                                                {new Date(request.details.date).toLocaleDateString("en-US", {
                                                                    month: "long",
                                                                    day: "numeric",
                                                                    year: "numeric"
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3    student-name">
                                                        <User className="text-indigo-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                O'quvchining ismi
                                                            </p>
                                                            <p className="text-slate-900 dark:text-white">{request.details.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3 student-place ">
                                                        <CalendarCheck className="text-purple-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Kun soni
                                                            </p>
                                                            <p className="text-slate-900 dark:text-white">{request.details.numberOfDays}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3">
                                                        <Zap className="text-amber-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Ball</p>
                                                            <p className="text-slate-900 dark:text-white ">{request.points}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {request.type === "team-competitions" && (
                                            <div className="team-competitions">
                                                <div className="space-y-3 mx-auto text-base flex flex-col items-start lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-6">
                                                    <div className="flex items-start gap-3  event-date">
                                                        <PartyPopper className="text-amber-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Tadbir nomi
                                                            </p>
                                                            <p className="text-slate-900 text-base dark:text-white">
                                                                {request.details.competitionName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3  event-date">
                                                        <Calendar className="text-blue-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Tadbir sanasi
                                                            </p>
                                                            <p className="text-slate-900 text-base dark:text-white">
                                                                {new Date(request.details.competitionDate).toLocaleDateString("en-US", {
                                                                    month: "long",
                                                                    day: "numeric",
                                                                    year: "numeric"
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3    student-name">
                                                        <GraduationCap className="text-indigo-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Sinf</p>
                                                            <p className="text-slate-900 dark:text-white">{request.details.className}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3 student-place ">
                                                        <Trophy className="text-purple-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                O'rin
                                                            </p>
                                                            <p className="text-slate-900 dark:text-white">{request.details.place}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3">
                                                        <Zap className="text-green-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Ball</p>
                                                            <p className="text-slate-900 dark:text-white ">{request.points}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {request.type === "academics" && (
                                            <div className="academics">
                                                <div className="space-y-3 mx-auto text-base flex flex-col items-start lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-6">
                                                    <div className="flex items-start gap-3    student-name">
                                                        <GraduationCap className="text-red-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Sinf</p>
                                                            <p className="text-slate-900 dark:text-white">{request.details.className}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3    student-name">
                                                        <BookOpen className="text-amber-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Fan</p>
                                                            <p className="text-slate-900 dark:text-white">{request.details.subject}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3  event-date">
                                                        <Calendar className="text-green-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Sana</p>
                                                            <p className="text-slate-900 text-base dark:text-white">
                                                                {new Date(request.details.date).toLocaleDateString("en-US", {
                                                                    month: "long",
                                                                    day: "numeric",
                                                                    year: "numeric"
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3  event-date">
                                                        <PartyPopper className="text-indigo-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Bsb Soni
                                                            </p>
                                                            <p className="text-slate-900 text-base dark:text-white">Bsb-{request.details.bsbType}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3 student-place ">
                                                        <Trophy className="text-purple-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                                                Ustoz
                                                            </p>
                                                            <p className="text-slate-900 dark:text-white">{request.details.teacher}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3">
                                                        <Zap className="text-blue-500 mt-1 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Ball</p>
                                                            <p className="text-slate-900 dark:text-white ">{request.points}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {request.details.proofImage && (
                                                    <div className="mt-3 flex items-center justify-center ">
                                                        <button
                                                            onClick={() => setSelectedImage(request.details.proofImage)}
                                                            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-xs"
                                                        >
                                                            <img
                                                                fetchpriority="high"
                                                                src={request.details.proofImage}
                                                                alt={`${request.details.subject} midterm`}
                                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">
                                                                    {/* Kattalashtirish uchun bosing */}
                                                                    <ZoomIn className="text-white shrink-0" size={30} />
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
                                        {isAdmin && request.status === "pending" && (
                                            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-3">Holati</p>
                                                <div className="flex gap-3">
                                                    <Button
                                                        variant={`default`}
                                                        onClick={() => approvePost.mutate({ id: request._id })}
                                                        className={"flex-1 flex items-center font-medium cursor-pointer "}
                                                        disabled={approvePost.isPending || rejectPost.isPending}
                                                    >
                                                        <Check size={18} />
                                                        Maqullash
                                                    </Button>

                                                    <Button
                                                        variant={`destructive`}
                                                        onClick={() => rejectPost.mutate({ id: request._id })}
                                                        className={`flex-1 flex items-center font-medium cursor-pointer`}
                                                        disabled={approvePost.isPending || rejectPost.isPending}
                                                    >
                                                        <X size={18} />
                                                        Rad etish
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </div>
            </div>
        </>
    )
}

export default MainRequestPointsPage
