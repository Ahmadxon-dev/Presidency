import { Clock, FileText, Gamepad2, Volleyball } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerTocybersport, registerTofootball, registerToTest } from "./../../api/shop"
const TimeSlots = ({ availableActivities, selectedDate, user }) => {
    const queryClient = useQueryClient()
    const [buttonId, setButtonId] = useState(null)
    const isPastTime = (startTime) => {
        if (!selectedDate) return false
        const today = new Date()
        const slotDate = new Date(selectedDate)

        if (slotDate.toDateString() !== today.toDateString()) {
            return slotDate < today
        }

        const [hours, mins] = startTime.split(":").map(Number)
        const slotTime = hours * 60 + mins
        const currentTime = today.getHours() * 60 + today.getMinutes()

        return slotTime < currentTime
    }
    const cybersportData = availableActivities.filter((el) => el.type === "cybersport")
    const footballCourtData = availableActivities.filter((el) => el.type === "footballCourt")
    const mockTestData = availableActivities.filter((el) => el.type === "mockTest")

    const { mutate: mutationRegisterForTest, isPending: registerMockPending } = useMutation({
        mutationFn: registerToTest,
        onMutate: () => toast.loading("Ro'yxatga qo'shilmoqda...", { id: "registerMockTestsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerMockTestsPending" })
            } else {
                queryClient.invalidateQueries(["mocktests"])
                queryClient.invalidateQueries(["coins"])
                toast.success(data.msg, { id: "registerMockTestsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerMockTestsPending" })
    })
    const { mutate: mutationRegisterForCybersport, isPending: registerCybersportPending } = useMutation({
        mutationFn: registerTocybersport,
        onMutate: () => toast.loading("Ro'yxatga qo'shilmoqda...", { id: "registerCybersportPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerCybersportPending" })
            } else {
                queryClient.invalidateQueries(["coins"])
                queryClient.invalidateQueries(["cybersportrooms"])
                toast.success(data.msg, { id: "registerCybersportPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerCybersportPending" })
    })
    const { mutate: mutationRegisterForFootball, isPending: registerFootballPending } = useMutation({
        mutationFn: registerTofootball,
        onMutate: () => toast.loading("Ro'yxatga qo'shilmoqda...", { id: "registerFootballPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerFootballPending" })
            } else {
                queryClient.invalidateQueries(["coins"])
                queryClient.invalidateQueries(["footballcourts"])
                toast.success(data.msg, { id: "registerFootballPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerFootballPending" })
    })

    if (availableActivities.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center gap-2  text-center mx-auto justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-slate-900">Ushbu sana uchun hech qanday faoliyat yo'q</h3>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            {mockTestData.length !== 0 && (
                <>
                    <div className="flex items-center gap-2 mb-2 mt-[-0.5rem]">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-slate-900">Mocktest</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {mockTestData.map((slot) => {
                            return (
                                <button
                                    key={slot._id}
                                    // onClick={() => onBook(slot.startTime)}
                                    className="w-full py-1 px-3 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg hover:shadow-md transition-all  group hover:scale-105"
                                >
                                    <div className="text-sm font-semibold text-blue-900">{slot.name}</div>
                                    <div className="text-xs text-blue-700 mt-1">Mavjud - {slot.points} ball</div>
                                    <div className="text-xs text-blue-700 mt-1">{slot.room}</div>
                                    <div className="text-xs text-blue-700 mt-1">
                                        {"Ro'yxatdan o'tgan"} - {slot.registeredUsers.length}
                                    </div>
                                    {user.role === "student" ? (
                                        !slot.registeredUsers.some((u) => u._id === user.id) ? (
                                            <Button
                                                size="sm"
                                                className="px-1 py-0.5 mt-2 cursor-pointer"
                                                onClick={() => {
                                                    setButtonId(slot._id)
                                                    mutationRegisterForTest({ userId: user.id, mockId: slot._id })
                                                }}
                                                disabled={registerMockPending && buttonId === slot._id}
                                            >
                                                Ro'yxatdan o'tish
                                            </Button>
                                        ) : (
                                            <div className="mt-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 w-full text-center justify-center ">
                                                <p className="text-sm font-semibold text-primary text-center">Siz ro'yxatdan o'tgansiz</p>
                                            </div>
                                        )
                                    ) : null}
                                </button>
                            )
                        })}
                    </div>
                </>
            )}
            {cybersportData.length !== 0 && (
                <>
                    <div className="flex items-center gap-2 mb-2 mt-6">
                        <Gamepad2 className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-slate-900">Kibersport</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {cybersportData.map((slot) => (
                            <>
                                {/* {slot.registeredUsers.length == 10 ? ( */}
                                {/* <button
                                        key={slot._id}
                                        // onClick={() => onBook(slot.startTime)}
                                        className="w-full p-4 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg hover:shadow-md transition-all "
                                    >
                                        <div className="text-sm font-semibold text-red-900">
                                            {slot.startTime} - {slot.endTime}
                                        </div>
                                        <div className="text-xs text-red-700 mt-1">Barcha joylar band</div>
                                    </button> */}
                                {/*  ) : ( */}
                                <button
                                    key={slot._id}
                                    // onClick={() => onBook(slot.startTime)}
                                    className="w-full py-1 px-3 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg hover:shadow-md transition-all hover:scale-105"
                                >
                                    <div className="text-sm font-semibold text-blue-900">
                                        {slot.startTime} - {slot.endTime}
                                    </div>
                                    <div className="text-xs text-blue-700 mt-1">Mavjud - {slot.points} ball</div>
                                    <div className="text-xs text-blue-700 mt-1">
                                        {"Ro'yxatdan o'tgan"} - {slot.registeredUsers.length}
                                    </div>

                                    {user.role === "student" ? (
                                        !slot.registeredUsers.some((u) => u._id === user.id) ? (
                                            <Button
                                                size="sm"
                                                className="px-1 py-0.5 mt-2 cursor-pointer"
                                                onClick={() => {
                                                    setButtonId(slot._id)
                                                    mutationRegisterForCybersport({ userId: user.id, cybersportId: slot._id })
                                                }}
                                                disabled={registerCybersportPending && buttonId === slot._id}
                                            >
                                                Ro'yxatdan o'tish
                                            </Button>
                                        ) : (
                                            <div className="mt-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 w-full text-center justify-center ">
                                                <p className="text-sm font-semibold text-primary text-center">Siz band qilgansiz</p>
                                            </div>
                                        )
                                    ) : null}
                                </button>
                            </>
                        ))}
                    </div>
                </>
            )}
            {footballCourtData.length !== 0 && (
                <>
                    <div className="flex items-center gap-2 mb-2 mt-6">
                        <Volleyball className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-slate-900">Futbol</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {footballCourtData.map((slot) => {
                            const userId = user.id
                            const bookedById = slot.bookedBy?._id

                            const isBooked = slot.isBooked
                            const isMine = isBooked && bookedById === userId
                            const isOtherBooked = isBooked && bookedById !== userId

                            return (
                                <button
                                    key={slot._id}
                                    className={
                                        `w-full p-4 bg-gradient-to-br ${
                                            isOtherBooked ? "from-red-50 to-red-100 border-red-200" : "from-blue-50 to-blue-100 border-blue-200"
                                        } border-2 rounded-lg hover:shadow-md transition-all` + `${isBooked ? "" : " hover:scale-105"}`
                                    }
                                >
                                    <div className={`text-sm font-semibold ${isOtherBooked ? "text-red-900" : "text-blue-900"}`}>
                                        {slot.startTime} - {slot.endTime}
                                    </div>

                                    {isOtherBooked ? (
                                        <div className="text-xs text-red-700 mt-1">Band qilingan</div>
                                    ) : (
                                        <div className="text-xs text-blue-700 mt-1">Mavjud - {slot.points} ball</div>
                                    )}

                                    {user?.role === "class" ? (
                                        isMine ? (
                                            <div className="mt-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 w-full text-center justify-center">
                                                <p className="text-sm font-semibold text-primary text-center">Siz band qilgansiz</p>
                                            </div>
                                        ) : isOtherBooked ? null : ( // booked by someone else -> no button
                                            // available -> show register button
                                            <Button
                                                type="button"
                                                size="sm"
                                                className="px-1 py-0.5 mt-2 cursor-pointer"
                                                onClick={() => {
                                                    setButtonId(slot._id)
                                                    mutationRegisterForFootball({ classId: userId, courtId: slot._id })
                                                }}
                                                disabled={registerFootballPending && buttonId === slot._id}
                                            >
                                                Ro'yxatdan o'tish
                                            </Button>
                                        )
                                    ) : null}
                                </button>
                            )
                        })}
                    </div>
                </>
            )}
            <div className="mt-6 pt-6 border-t border-slate-200 flex gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border-2 border-blue-200 rounded" />
                    <span className="text-sm text-slate-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-50 border-2 border-slate-200 rounded opacity-40" />
                    <span className="text-sm text-slate-600">Past Time</span>
                </div>
            </div>
        </div>
    )
}

export default TimeSlots
