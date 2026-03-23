import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserCoins } from '../../api/shop'
import TransferButton from '../../components/shared/TransferButton'
import { getOneClass } from '../../api/class'
import MyClassSkeleton from './../../components/shared/skeletons/myclassSkeleton';


const MyClassPage = () => {
    const user = useSelector((state) => state.auth.user)
    const { data, isPending } = useQuery({ queryKey: ['coins'], queryFn: () => getUserCoins(user.id) })
    const { data: classData, isPending: isClassLoading } = useQuery({
        queryKey: ['classes', user.classId],
        queryFn: () => getOneClass(user.classId)
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (user.role !== 'student') navigate('/')
    }, [user])

    if (isPending || isClassLoading) {
        return <MyClassSkeleton />
    }
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Mening sinfim</h1>
                        <h1 className="text-xl font-bold text-foreground">Ballarim: {data.coins}</h1>
                    </div>
                    {user.role === 'student' && <TransferButton />}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Grade Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Class Grade</p>
                                <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mt-2">{classData.className}</p>
                            </div>
                            <div className="text-6xl font-light text-blue-100 dark:text-blue-900">📊</div>
                        </div>
                    </div>

                    {/* Points Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Class Points</p>
                                <p className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                                    {classData.coins}
                                </p>
                            </div>
                            <div className="text-6xl font-light text-emerald-100 dark:text-emerald-900">⭐</div>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white mt-6 dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 
                overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 p-6 mt flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Sinfdoshlar</h2>
                    </div>
                    {/* Classmates Grid */}
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {classData.students.map((classmate) => (
                            <div
                                key={classmate._id}
                                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-50 truncate text-lg">
                                            {classmate.fullName}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyClassPage
