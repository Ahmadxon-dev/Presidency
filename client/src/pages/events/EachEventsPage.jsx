import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Calendar, Users, GraduationCap, ArrowLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchEachEvent } from '../../api/event'
import { useSelector } from 'react-redux'
import formatUzDate from '../../utils/formatDate'

const EachEventsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const user =  useSelector(state=>state.auth.user)
    const { data: event, isPending } = useQuery({ queryKey: ['events', id], queryFn: () => fetchEachEvent({ id }) })

    if (isPending) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Back Button */}
                    <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Ortga
                    </Button>
                    <div>
                        <div className="lg:col-span-2">
                            <Card className="overflow-hidden">
                                {/* Event Image Skeleton */}
                                <div className="h-96 w-full bg-muted animate-pulse" />

                                <CardHeader>
                                    {/* Title Skeleton */}
                                    <div className="h-8 bg-muted rounded-md mb-4 animate-pulse" />
                                    {/* Date Skeleton */}
                                    <div className="h-5 bg-muted rounded-md w-48 animate-pulse" />
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Event Name Section */}
                                    <div>
                                        <div className="h-5 bg-muted rounded-md w-24 mb-2 animate-pulse" />
                                        <div className="h-4 bg-muted rounded-md w-40 animate-pulse" />
                                    </div>

                                    {/* Description Section */}
                                    <div>
                                        <div className="h-5 bg-muted rounded-md w-24 mb-2 animate-pulse" />
                                        <div className="space-y-2">
                                            <div className="h-4 bg-muted rounded-md animate-pulse" />
                                            <div className="h-4 bg-muted rounded-md animate-pulse" />
                                            <div className="h-4 bg-muted rounded-md w-3/4 animate-pulse" />
                                        </div>
                                    </div>

                                    {/* Event Type Section */}
                                    <div>
                                        <div className="h-5 bg-muted rounded-md w-24 mb-2 animate-pulse" />
                                        <div className="h-4 bg-muted rounded-md w-32 animate-pulse" />
                                    </div>

                                    {/* Registration Notification Skeleton */}
                                    <div className="h-12 bg-muted rounded-lg animate-pulse" />

                                    {/* Registered Users Section */}
                                    <div className="border-t pt-6">
                                        <div className="h-5 bg-muted rounded-md w-40 mb-4 animate-pulse" />

                                        {/* Add User Form Skeleton */}
                                        <div className="flex gap-2 mb-4">
                                            <div className="flex-1 h-10 bg-muted rounded-md animate-pulse" />
                                            <div className="h-10 w-20 bg-muted rounded-md animate-pulse" />
                                        </div>

                                        {/* Users List Skeleton */}
                                        <div className="space-y-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2 cursor-pointer" />
                    Ortga
                </Button>

                {/* Event Detail Card */}
                <div className="">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden ">
                            {/* Event Image */}
                            <div className={`relative  ${event.img !== null && 'h-96 w-full'}  overflow-hidden bg-muted`}>
                                {event.img !== null && (
                                    // eslint-disable-next-line react/no-unknown-property
                                    <img
                                        src={event.img}
                                        // eslint-disable-next-line react/no-unknown-property
                                        fetchpriority="high"
                                        alt={event.eventName}
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                <div className="absolute top-4 right-4">
                                    <div
                                        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                                            event.type === 'Student'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary text-secondary-foreground'
                                        }`}
                                    >
                                        {event.type === 'Student' ? (
                                            <>
                                                <GraduationCap className="h-4 w-4" /> O'quvchilar uchun tadbir
                                            </>
                                        ) : (
                                            <>
                                                <Users className="h-4 w-4" /> Sinf uchun tadbir
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <CardHeader className="">
                                <CardTitle className="text-3xl break-all w-full">{event.eventName}</CardTitle>
                                <CardDescription className="text-base flex items-center gap-2 mt-2 break-words w-full">
                                    <Calendar className="h-5 w-5" />
                                    { formatUzDate(event.eventDate) }
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6 break-words w-full">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Tavsif</h3>
                                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        {event.type === 'Student' ? (
                                            <>
                                                <GraduationCap className="h-5 w-5 text-primary" />
                                                <span className="text-muted-foreground">O'quvchilar uchun tadbir</span>
                                            </>
                                        ) : (
                                            <>
                                                <Users className="h-5 w-5 text-blue-500" />
                                                <span className="text-muted-foreground">Sinflar uchun tadbir</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Ro'yxatdan o'tgan foydalanuvchilar ({event.registeredUsers.length})
                                    </h3>

                                    {/* Users List */}
                                    
                                    {user.role==="admin" &&  event.registeredUsers && event.registeredUsers.length > 0 ? (
                                        <div className="space-y-2">
                                            {event.registeredUsers.map((u) => (
                                                <div
                                                    key={u._id}
                                                    className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border"
                                                >
                                                    {event.type === 'Student' ? (
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                                <span className="text-xs font-semibold text-primary">
                                                                    {u.fullName.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <span className="font-medium">{u.fullName}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                                <span className="text-xs font-semibold text-primary">
                                                                    {u.className.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <span className="font-medium">{u.className} sinf</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : user.role==="admin" ?(
                                        <p className="text-sm text-muted-foreground">Hech qaysi foydalanuvchi ro'yxatdan o'tmagan</p>
                                    ) : null}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EachEventsPage
