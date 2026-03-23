import React from "react"

const ClassProfileSkeleton = () => {
    return (
        <div className="w-full max-w-7xl flex justify-center mx-auto items-center ">
            {/* Main Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl w-full">
                {/* Header Background */}
                <div className="h-40 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10 animate-pulse" />

                {/* Content */}
                <div className="px-8 pb-8">
                    {/* Header Section */}
                    <div className="flex flex-col items-center -mt-20 mb-8 relative z-10">
                        <div className="w-32 h-32 rounded-full bg-muted animate-pulse border-4 border-card mb-6" />
                        <div className="h-10 w-48 bg-muted rounded-lg animate-pulse mb-4" />
                        <div className="h-6 w-32 bg-muted rounded-lg animate-pulse" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
                                <div className="h-4 w-20 bg-muted rounded animate-pulse mb-3" />
                                <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                            </div>
                        ))}
                    </div>

                    {/* Students Section */}
                    <div className="mb-8">
                        <div className="h-8 w-40 bg-muted rounded-lg animate-pulse mb-4" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                <div key={i} className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-4 border border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-11 rounded-full bg-muted animate-pulse" />
                                        <div className="flex-1">
                                            <div className="h-4 w-32 bg-muted rounded animate-pulse mb-2" />
                                            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className="h-12 bg-primary/20 rounded-xl animate-pulse" /> */}
                </div>
            </div>
        </div>
    )
}

export default ClassProfileSkeleton
