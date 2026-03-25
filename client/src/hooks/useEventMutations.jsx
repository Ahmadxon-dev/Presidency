import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { registerStudent, deletingEvents, createEvents, registerClass } from "./../api/event"
const useEventMutations = () => {
    const queryClient = useQueryClient()

    const { mutate: mutationCreateEvents } = useMutation({
        mutationFn: createEvents,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "createEventsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "createEventsPending" })
            } else {
                queryClient.invalidateQueries(["events"])
                toast.success(data.msg, { id: "createEventsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "createEventsPending" })
    })
    const { mutate: deleteEvents } = useMutation({
        mutationFn: deletingEvents,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteEventsPending" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteEventsPending" })
            } else {
                queryClient.invalidateQueries(["news"])
                toast.success(data.msg, { id: "deleteEventsPending" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "deleteEventsPending" })
    })
    const { mutate: mutationRegisterClass, isPending: registerClassPending } = useMutation({
        mutationFn: registerClass,
        onMutate: () => toast.loading("Ro'yxatda saqlanmoqda...", { id: "registerclasses" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerclasses" })
            } else {
                queryClient.invalidateQueries(["events"])
                toast.success(data.msg, { id: "registerclasses" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerclasses" })
    })
    const { mutate: mutationRegisterStudent, isPending: registerStudentPending } = useMutation({
        mutationFn: registerStudent,
        onMutate: () => toast.loading("Ro'yxatdan o'tilmoqda...", { id: "registerstudents" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "registerstudents" })
            } else {
                queryClient.invalidateQueries(["events"])
                toast.success(data.msg, { id: "registerstudents" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "registerstudents" })
    })
    return {
        mutationCreateEvents,
        deleteEvents,
        mutationRegisterClass,
        registerClassPending,
        mutationRegisterStudent,
        registerStudentPending
    }
}

export default useEventMutations
