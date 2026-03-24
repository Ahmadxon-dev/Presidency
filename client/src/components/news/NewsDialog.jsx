import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DialogHeader, DialogFooter, DialogContent, DialogTitle, DialogTrigger, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { memo, useState } from "react"
import useNewsMutations from "@/hooks/useNewsMutations"
const NewsDialog = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [img, setImg] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingNews, setEditingNews] = useState(null)

    const { mutationCreateNews } = useNewsMutations()

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

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Yangiliklarni qo&apos;shish
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
    )
}

export default memo(NewsDialog)
