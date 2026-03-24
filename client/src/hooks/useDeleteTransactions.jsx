import { deleteAllTransactions } from '@/api/transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useDeleteTransactions = () => {
    const queryClient = useQueryClient()
    const transactionDeleteMutation = useMutation({
        mutationFn: deleteAllTransactions,
        onMutate: () => toast.loading("O'chirilmoqda...", { id: "deleteTransactions" }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: "deleteTransactions" })
            } else {
                queryClient.invalidateQueries(["transactions"])
                toast.success(data.msg, { id: "deleteTransactions" })
            }
        },
        onError: (data) => toast.error(data.error, { id: "deleteTransactions" })
    })
    return transactionDeleteMutation
}

export default useDeleteTransactions
