import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const MyClassSkeleton = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex-1">
                        <Skeleton className="h-10 w-48 mb-2" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Grade Card Skeleton */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <Skeleton className="h-4 w-24 mb-3" />
                                <Skeleton className="h-12 w-32" />
                            </div>
                            <Skeleton className="size-16 rounded-lg" />
                        </div>
                    </div>

                    {/* Points Card Skeleton */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <Skeleton className="h-4 w-24 mb-3" />
                                <Skeleton className="h-12 w-32" />
                            </div>
                            <Skeleton className="size-16 rounded-lg" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 p-6 border-b border-slate-200 dark:border-slate-700">
                        <Skeleton className="h-7 w-40" />
                    </div>

                    {/* Classmates Grid */}
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <Skeleton className="h-5 w-full" />
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

export default MyClassSkeleton
