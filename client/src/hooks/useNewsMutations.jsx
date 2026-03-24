import { createNews, deletingNews } from "@/api/news"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
const useNewsMutations = () => {
    const queryClient = useQueryClient()
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
    const { mutate: deleteNews,} = useMutation({
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
    return {
        mutationCreateNews,
        deleteNews,
    }
}

export default useNewsMutations
