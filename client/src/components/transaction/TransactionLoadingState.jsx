import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { memo } from 'react';

const TransactionLoadingState = () => {
  return (
    <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Skeleton */}
                    <div className="w-full flex items-center justify-between mx-auto mb-8">
                        <Skeleton className="h-10 w-48" />
                        <div className="flex flex-col lg:flex-row gap-2">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-40" />
                        </div>
                    </div>

                    {/* Transaction Cards Skeleton */}
                    <div className="container mx-auto px-4 my-8 md:py-12 max-w-5xl">
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <Card key={index} className="group border-border overflow-hidden bg-card p-4 md:py-2 md:px-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Product and Info Skeleton */}
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-8 w-3/4" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-1/2" />
                                                <Skeleton className="h-4 w-2/3" />
                                                <Skeleton className="h-4 w-1/2" />
                                            </div>
                                        </div>

                                        {/* Amount Skeleton */}
                                        <div className="text-left md:text-right">
                                            <Skeleton className="h-12 w-32 ml-auto" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default memo(TransactionLoadingState)