import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import RequestForAcademics from "./RequestForAcademics"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import RequestForVolunteering from "./RequestForVolunteering"
import RequestForPresidency from "./RequestForPresidency"
import RequestForcompetitions from "./RequestForcompetitions"
import { useSelector } from "react-redux"
import RequestForTeamCompetitions from "./RequestForTeamCompetitions"

const RequestPoints = () => {
    const user = useSelector((state) => state.auth.user)
    const [selectedActivity, setSelectedActivity] = useState("")
    const [activities, setActivities] = useState([
        { name: "BSB/ChSB", value: "academics" },
        { name: "Volontyorlik", value: "volunteering" },
        { name: "Presidency maoshlari", value: "presidency-salaries" },
        { name: "Musobaqalar va Fan olimpiadalari", value: "competitions" },
        { name: "Sinf musobaqalari", value: "team-competitions", classOnly: true }
    ])
    const filteredActivities = activities.filter((act) => {
        if (act.classOnly && user.role !== "class") return false
        if (!act.classOnly && user.role !== "student") return false
        return true
    })

    const handleActivityChange = (value) => {
        setSelectedActivity(value)
    }

    return (
        <div className="min-h-screen bg-background flex mx-auto justify-center">
            <div className="container px-4 py-8">
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                        <h1 className="text-4xl font-bold text-slate-900 mb-2 text-center text-pretty">Ball olish</h1>
                        <form onSubmit={() => {}} className="space-y-6">
                            {/* Activity Select */}
                            <div>
                                <Select id="activity" value={selectedActivity} onValueChange={(value) => handleActivityChange(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="So'rov turini tanlang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {filteredActivities.map((activity) => (
                                                <SelectItem key={activity.value} value={activity.value}>
                                                    {activity.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {user.role === "student" && selectedActivity === "academics" && (
                                <RequestForAcademics type={selectedActivity} userId={user.id} />
                            )}
                            {user.role === "student" && selectedActivity === "volunteering" && (
                                <RequestForVolunteering type={selectedActivity} userId={user.id} />
                            )}
                            {user.role === "student" && selectedActivity === "presidency-salaries" && (
                                <RequestForPresidency type={selectedActivity} userId={user.id} />
                            )}
                            {user.role === "student" && selectedActivity === "competitions" && (
                                <RequestForcompetitions type={selectedActivity} userId={user.id} />
                            )}
                            {user.role === "class" && selectedActivity === "team-competitions" && (
                                <RequestForTeamCompetitions type={selectedActivity} userId={user.id} />
                            )}

                            <Button type="submit" disabled={!selectedActivity} className={`py-2.5 w-full  ${selectedActivity && "hidden"} `}>
                                So'rovni yuborish
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestPoints
