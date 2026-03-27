import { useCallback, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { fetchNewsData } from "@/api/news"
import NewsEmptyState from "@/components/news/NewsEmptyState"
import EachCardNews from "@/components/news/EachCardNews"
import useNewsMutations from "@/hooks/useNewsMutations"
import NewsDialog from "@/components/news/NewsDialog"
import NewsLoader from "@/components/news/NewsLoader"

const NewsPage = () => {
    const user = useSelector((state) => state.auth.user)
    const { data: allNews, isPending } = useQuery({ queryKey: ["news"], queryFn: fetchNewsData })
    const [deleteButtonId, setDeleteButtonId] = useState("")

    const { deleteNews } = useNewsMutations()

    const handleOnDelete = useCallback((e, item) => {
        e.stopPropagation()
        if (window.confirm("Buni aniq o'chirmoqchimisiz?")) {
            deleteNews({ id: item._id })
            setDeleteButtonId(item._id)
        }
    }, [])
    if (isPending) return <NewsLoader />

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Yangiliklar</h1>
                    </div>
                    {user.role === "admin" && <NewsDialog />}
                </div>

                {/* News Grid */}
                {allNews.length === 0 ? (
                    <NewsEmptyState />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allNews.map((item) => (
                            <EachCardNews
                                item={item}
                                key={item._id}
                                userRole={user?.role}
                                onDelete={handleOnDelete}
                                deleteButtonId={deleteButtonId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewsPage
