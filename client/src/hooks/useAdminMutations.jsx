import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { createAdmins, editAdmins, deleteAdmins } from "@/api/admin"

const useAdminMutations = ({ onCreateSuccess, onEditSuccess } = {}) => {
    const queryClient = useQueryClient()
    const [disableId, setDisableId] = useState(null)

    const createAdminsMutation = useMutation({
        mutationFn: createAdmins,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "createAdminsMutation" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "createAdminsMutation" })
                return
            } else {
                queryClient.invalidateQueries(["admins"])
                toast.success(data.msg, { id: "createAdminsMutation" })
                // setOpen(false)
                // setFullName("")
                // setPassword("")
                // setLogin("")
                if(onCreateSuccess) onCreateSuccess(data) // data is just given, not used
            }
        },
        onError: (data) => toast.error(data.error, { id: "createAdminsMutation" })
    })
    const editAdminsMutation = useMutation({
        mutationFn: editAdmins,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: "editAdminsMutation" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "editAdminsMutation" })
                return
            } else {
                queryClient.invalidateQueries(["admins"])
                toast.success(data.msg, { id: "editAdminsMutation" })
                // setOpen(false)
                // setFullName("")
                // setPassword("")
                // setLogin("")
                // setAdminData(null)
                if (onEditSuccess) onEditSuccess(data)
            }
        },
        onError: (data) => toast.error(data.error, { id: "editAdminsMutation" })
    })
    const deleteAdminMutation = useMutation({
        mutationFn: deleteAdmins,
        onMutate: ({ id }) => {
            setDisableId(id)
            toast.loading("O'chirilmoqda...", { id: "deleteAdminMutation" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteAdminMutation" })

            } else {
                queryClient.invalidateQueries(["admins"])
                toast.success(data.msg, { id: "deleteAdminMutation" })
            }
        },
        onError: (data) => {
            toast.error(data.error, { id: "deleteAdminMutation" })
        },
        onSettled: () => {
            setDisableId(null)
        }
    })
    return {
        disableId,
        createAdminsMutation,
        editAdminsMutation,
        deleteAdminMutation
    }
}

export default useAdminMutations
