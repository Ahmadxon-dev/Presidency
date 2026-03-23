import React from "react"

const SkeletonLoaderSchedule = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar Skeleton Section */}
                    <div className="lg:col-span-1 flex justify-censter lg:justify-start items-start">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 w-full max-w-md animate-pulse">
                            {/* Calendar Header */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="h-8 w-8 bg-slate-200 rounded"></div>
                                <div className="h-6 w-24 bg-slate-200 rounded"></div>
                                <div className="h-8 w-8 bg-slate-200 rounded"></div>
                            </div>

                            {/* Calendar Days Header */}
                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className="h-6 w-8 bg-slate-200 rounded"></div>
                                ))}
                            </div>

                            {/* Calendar Days Grid */}
                            <div className="grid grid-cols-7 gap-2">
                                {[...Array(35)].map((_, i) => (
                                    <div key={i} className="h-8 w-8 bg-slate-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Skeleton Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 animate-pulse">
                            {/* Icon Skeleton */}
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-slate-200 rounded-xl"></div>
                            </div>
                            {/* Title Skeleton */}
                            <div className="h-7 w-36 bg-slate-200 rounded mx-auto mb-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SkeletonLoaderSchedule
