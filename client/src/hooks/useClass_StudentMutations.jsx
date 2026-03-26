import { toast } from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPointsStudent, createStudents, deleteStudents, editStudents } from "@/api/student"
import { addPointsClass, createClasses, deleteClasses, editClasses } from "@/api/class"
const useClass_StudentMutations = () => {
    const queryClient = useQueryClient()
    const { mutate: deleteStudentMutation, isPending: deleteStudentPending } = useMutation({
        mutationFn: deleteStudents,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteStudentMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "deleteStudentMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteStudentMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                // setSelectedClass(data.newData)
                toast.success(data.msg, { id: "deleteStudentMutationPending" })
            }
        }
    })
    const { mutate: deleteClassMutation, isPending: deleteClassPending } = useMutation({
        mutationFn: deleteClasses,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteClassMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "deleteClassMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteClassMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                // setSelectedClass(null)
                toast.success(data.msg, { id: "deleteClassMutationPending" })
            }
        }
    })
    const { mutate: createClassMutation } = useMutation({
        mutationFn: createClasses,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "classMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "classMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "classMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                toast.success(data.msg, { id: "classMutationPending" })
            }
        }
    })

    const { mutate: editClassMutation } = useMutation({
        mutationFn: editClasses,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: "editClassMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "editClassMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "editClassMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                toast.success(data.msg, { id: "editClassMutationPending" })
            }
        }
    })
    const { mutate: createStudentMutation } = useMutation({
        mutationFn: createStudents,
        onMutate: () => toast.loading("Yaratilmoqda...", { id: "studentMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "studentMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "studentMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                // setSelectedClass(data.newData)
                toast.success(data.msg, { id: "studentMutationPending" })
            }
        }
    })

    const { mutate: editStudentMutation } = useMutation({
        mutationFn: editStudents,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: "editStudentMutationPending" }),
        onError: (data) => {
            toast.error(data.error, { id: "editStudentMutationPending" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "editStudentMutationPending" })
            } else {
                queryClient.invalidateQueries(["classes"])
                // setSelectedClass(data.newData)
                toast.success(data.msg, { id: "editStudentMutationPending" })
            }
        }
    })
    const { mutate: mutationAddCoinsStudents } = useMutation({
        mutationFn: addPointsStudent,
        onMutate: () => toast.loading("Qo'shilmoqda...", { id: "addCoinStudents" }),
        onError: (data) => {
            toast.error(data.error, { id: "addCoinStudents" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "addCoinStudents" })
            } else {
                queryClient.invalidateQueries(["classes"])
                // setSelectedClass(data.newData)
                toast.success(data.msg, { id: "addCoinStudents" })
            }
        }
    })
    const { mutate: mutationAddPointsClasses } = useMutation({
        mutationFn: addPointsClass,
        onMutate: () => toast.loading("Qo'shilmoqda...", { id: "addCoinClass" }),
        onError: (data) => {
            toast.error(data.error, { id: "addCoinClass" })
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "addCoinClass" })
            } else {
                queryClient.invalidateQueries(["classes"])
                toast.success(data.msg, { id: "addCoinClass" })
                queryClient.invalidateQueries(["transactions"])
            }
        }
    })
    return {
        queryClient,
        deleteStudentMutation,
        deleteStudentPending,
        deleteClassMutation,
        deleteClassPending,
        createClassMutation,
        mutationAddPointsClasses,
        mutationAddCoinsStudents,
        editStudentMutation,
        editClassMutation,
        createStudentMutation,

    }
}

export default useClass_StudentMutations
