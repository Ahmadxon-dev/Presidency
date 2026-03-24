import React, { memo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchEachNews } from '@/api/news'
const EachNewsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isPending } = useQuery({ queryKey: ['news', id], queryFn: () => fetchEachNews(id) })

    if (isPending) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Back Button */}
                    <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Ortga
                    </Button>
                    <Card className="flex flex-col max-w-2xl mx-auto">
                        <CardHeader className="p-0">
                            <div className="w-full h-48 bg-muted animate-pulse rounded-t-lg" />
                        </CardHeader>

                        <CardContent className="flex-1 pt-6">
                            {/* Title skeleton */}
                            <div className="space-y-2 mb-4">
                                <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
                                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                            </div>

                            {/* Description skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 bg-muted rounded animate-pulse w-full" />
                                <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                                <div className="h-4 bg-muted rounded animate-pulse w-4/5" />
                            </div>
                        </CardContent>

                        {/* Footer skeleton */}
                        <CardFooter className="flex gap-2">
                            <div className="flex-1 h-10 bg-muted rounded animate-pulse" />
                            <div className="flex-1 h-10 bg-muted rounded animate-pulse" />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Ortga
                </Button>

                {/* News Detail Card */}
                <Card className="max-w-2xl mx-auto">
                    <CardHeader className="p-0">
                        {data.img && (
                            <img
                                src={data.img || '/placeholder.svg'}
                                alt={data.title}
                                // eslint-disable-next-line react/no-unknown-property
                                fetchpriority="high"
                                className="w-full h-96 object-cover rounded-t-lg"
                            />
                        )}
                    </CardHeader>
                    <CardContent className="pt-8">
                        <CardTitle className="text-4xl mb-4 text-balance w-full break-words">{data.title}</CardTitle>
                        <CardDescription className="text-lg text-foreground whitespace-pre-wrap break-words w-full">
                            {data.description}
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default memo(EachNewsPage)
