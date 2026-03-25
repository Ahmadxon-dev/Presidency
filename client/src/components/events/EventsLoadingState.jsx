import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
const EventsLoadingState = () => {
    return (
        <div className="min-h-screen  p-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((el) => {
                        return (
                            <Card key={el} className="overflow-hidden">
                                {/* Image skeleton with badge */}
                                <div className="relative h-48 w-full overflow-hidden bg-muted">
                                    <Skeleton className="w-full h-full" />
                                    <div className="absolute top-3 right-3">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </div>
                                </div>

                                <CardHeader>
                                    {/* Title skeleton */}
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    {/* Date skeleton */}
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    {/* Description skeleton - 2 lines */}
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6 mb-2" />
                                    {/* Event name skeleton */}
                                    <Skeleton className="h-4 w-32 mb-3" />
                                    {/* Type indicator skeleton */}
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded" />
                                        <Skeleton className="h-4 w-36" />
                                    </div>
                                </CardContent>

                                <CardFooter className="flex gap-2">
                                    {/* Edit button skeleton */}
                                    <Skeleton className="h-9 flex-1" />
                                    {/* Delete button skeleton */}
                                    <Skeleton className="h-9 flex-1" />
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default EventsLoadingState
