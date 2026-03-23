import React, { useState } from "react"
import TimeSlots from "./TimeSlots"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchAllActivities } from "../../api/shop"
import { Calendar } from "@/components/ui/calendar"
import formatUzDate from "../../utils/formatDate"
import SkeletonLoaderSchedule from "./skeletons/SkeletonLoaderSchedule"

const BookingActivity = ({user}) => {
    const queryClient = useQueryClient()
    const { data, isPending } = useQuery({
        queryKey: ["allActivities"],
        queryFn: fetchAllActivities,
        select: (data) => {
            const result = data.reduce((accumulator, item) => {
                const { date } = item
                let changeDateFormat = new Date(date).toDateString()
                if (!accumulator[changeDateFormat]) accumulator[changeDateFormat] = []
                accumulator[changeDateFormat].push(item)
                return accumulator
            }, {})
            return result
        }
    })
    const [selectedDate, setSelectedDate] = useState(null)

    // Get booked periods for selected date in "01:17 - 02:30" format
    const getAvailablePeriodsForDate = (date) => {
        if (!date) return []
        return data[date] ? data[date] : []
    }

    if (isPending) {
        return <SkeletonLoaderSchedule />
    }
    return (
        <main className="min-h-screen bg-gradient-to-br">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar Section */}
                    <div className="lg:col-span-1 flex justify-center lg:justify-start items-start">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={{
                                before: new Date()
                            }}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 w-full max-w-md"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-2">
                        {selectedDate ? (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                    <h2 className="text-xl font-semibold text-slate-900 mb-2">{formatUzDate(selectedDate)}</h2>
                                    <p className="text-sm text-slate-600">Mavjud vaqtlar</p>
                                </div>

                                <TimeSlots
                                    user={user}
                                    availableActivities={getAvailablePeriodsForDate(new Date(selectedDate).toDateString())}
                                    selectedDate={selectedDate}
                                />
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                                <div className="text-slate-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">Sanani tanlang</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BookingActivity
