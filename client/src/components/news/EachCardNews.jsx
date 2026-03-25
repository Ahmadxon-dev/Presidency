import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { memo, useCallback } from "react"
const EachCardNews = ({ item, userRole, onDelete, deleteButtonId }) => {
    const navigate = useNavigate()
    const handleNavigate = useCallback(() => {
        navigate(item._id)
    }, [navigate, item._id])

    const handleOnDelete = useCallback(
        (e) => {
            e.stopPropagation()
            onDelete(e, item)
        },
        [item, onDelete]
    )

    return (
        <Card key={item._id} className="flex flex-col cursor-pointer" onClick={handleNavigate}>
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
            {userRole === "admin" && (
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
                        onClick={handleOnDelete}
                        disabled={deleteButtonId === String(item._id)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        O&apos;chirish
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}

export default memo(EachCardNews)
