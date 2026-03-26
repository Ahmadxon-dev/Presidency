import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { memo } from "react"

const ClassLoadingState = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                <header className="border-b border-border bg-card">
                    <div className="flex items-center justify-between">
                        <div className="container mx-auto px-4 py-6">
                            <Skeleton className="h-9 w-48" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </header>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="p-4 animate-pulse">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <div className="h-5 bg-muted rounded w-3/4"></div>
                                <div className="h-4 bg-muted rounded w-1/2"></div>
                                <div className="flex items-center gap-4">
                                    <div className="h-3 bg-muted rounded w-20"></div>
                                    <div className="h-3 bg-muted rounded w-16"></div>
                                    <div className="h-3 bg-muted rounded w-24"></div>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <div className="h-8 w-8 bg-muted rounded"></div>
                                <div className="h-8 w-8 bg-muted rounded"></div>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 animate-pulse">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-5 bg-muted rounded w-1/2"></div>
                                    <div className="h-5 bg-muted rounded-full w-12"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-muted rounded w-2/3"></div>
                                    <div className="h-4 bg-muted rounded w-1/2"></div>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <div className="h-8 w-8 bg-muted rounded"></div>
                                <div className="h-8 w-8 bg-muted rounded"></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default memo(ClassLoadingState)
