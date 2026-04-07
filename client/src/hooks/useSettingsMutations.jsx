import { editPassword, editPasswordClass } from "@/api/profile"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
const useSettingsMutations = () => {
    const { mutate: mutateUserPassword } = useMutation({
        mutationFn: editPassword,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: "editPasswordID" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "editPasswordID" })
            } else {
                toast.success(data.msg, { id: "editPasswordID" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "editPasswordID" })
    })
    const { mutate: mutateClassPassword } = useMutation({
        mutationFn: editPasswordClass,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: "editClassPasswordID" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "editClassPasswordID" })
            } else {
                toast.success(data.msg, { id: "editClassPasswordID" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "editClassPasswordID" })
    })
    return { mutateUserPassword, mutateClassPassword}
}

export default useSettingsMutations
