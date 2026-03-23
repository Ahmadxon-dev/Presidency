import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Trash2, Plus, Calendar } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import formatUzDate from "../../utils/formatDate"

const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/news/get/all`)
    return res.json()
}
const createNews = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/news/add/`, {
        method: "POST",
        body: data
    })
    return res.json()
}
const deletingNews = async ({ id }) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/news/delete/${id}`, { method: "DELETE" })
    return res.json()
}

const NewsPage = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user)
    const { data: allNews, isPending } = useQuery({ queryKey: ["news"], queryFn: fetchData })
    const [deleteButtonId, setDeleteButtonId] = useState("")
    const { mutate: mutationCreateNews } = useMutation({
        mutationFn: createNews,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "createNewsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "createNewsPending" })
            } else {
                queryClient.invalidateQueries(["news"])
                toast.success(data.msg, { id: "createNewsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "createNewsPending" })
    })
    const { mutate: deleteNews, isPending: deleteNewsPending } = useMutation({
        mutationFn: deletingNews,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteNewsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteNewsPending" })
            } else {
                queryClient.invalidateQueries(["news"])
                toast.success(data.msg, { id: "deleteNewsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "deleteNewsPending" })
    })
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [img, setImg] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingNews, setEditingNews] = useState(null)
    function onSubmit(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("title", title)
        formdata.append("description", description)
        if (img) formdata.append("news_image", img)
        setTitle("")
        setDescription("")
        setImg(null)
        setIsDialogOpen(false)
        setEditingNews(null)
        mutationCreateNews(formdata)
    }

    if (isPending) {
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
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Yangiliklar</h1>
                    </div>
                    {user.role === "admin" && (
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Yangiliklarni qo'shish
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                                <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
                                    <DialogHeader>
                                        <DialogTitle>{editingNews ? "Editing news" : "Creating news"}</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="title">Sarlavha</Label>
                                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="description">Tavsif</Label>
                                            <Textarea
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                rows={4}
                                                required
                                                className="resize-none"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="imgurl">Rasm tanlash(majburiy emas)</Label>
                                            <Input
                                                id="news_img"
                                                accept="image/*"
                                                onChange={(e) => setImg(e.target.files[0])}
                                                // placeholder="Enter image URL"
                                                type="file"
                                            />
                                        </div>
                                    </div>
                                    {/* Move DialogFooter INSIDE the form */}
                                    <DialogFooter>
                                        <Button type="submit">{editingNews ? "O'zgartirish" : "Yaratish"}</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {/* News Grid */}
                {allNews.length === 0 ? (
                    <Card className="p-12">
                        <div className="text-center">
                            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Yangiliklar topilmadi</h3>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allNews.map((item) => (
                            <Card key={item._id} className="flex flex-col cursor-pointer" onClick={() => navigate(item._id)}>
                                <CardHeader className="p-0">
                                    {item.img && (
                                        // eslint-disable-next-line react/no-unknown-property
                                        <img src={item.img} fetchpriority="high" alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                                    )}
                                </CardHeader>
                                <CardContent className="flex-1 pt-6">
                                    <CardTitle className="mb-2 text-balance truncate">{item.title}</CardTitle>
                                    <CardDescription className="truncate  text-pretty ">{item.description}</CardDescription>
                                </CardContent>
                                {user.role === "admin" && (
                                    <CardFooter className="flex gap-2">
                                        {/* <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 bg-transparent"
                                        // onClick={() => handleEdit(item)}
                                    >
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button> */}
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                if (window.confirm("Buni aniq o'chirmoqchimisiz?")) {
                                                    deleteNews({ id: item._id })
                                                    setDeleteButtonId(item._id)
                                                }
                                            }}
                                            disabled={deleteButtonId === String(item._id)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            O'chirish
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewsPage
