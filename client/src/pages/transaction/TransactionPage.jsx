import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchAllTransactions } from "../../api/transaction"
import { useSelector } from "react-redux"
import TransactionLoadingState from "@/components/transaction/TransactionLoadingState"
import AllTransactionCards from "@/components/transaction/AllTransactionCards"
import TransactionHeader from "@/components/transaction/TransactionHeader"
import useDeleteTransactions from "@/hooks/useDeleteTransactions"

const TransactionPage = () => {
    const [filtered, setFiltered] = useState("*")
    const user = useSelector((state) => state.auth.user)
    
    const { data: transactions = [], isPending } = useQuery({ queryKey: ["transactions"], queryFn: fetchAllTransactions })

    const transactionDeleteMutation = useDeleteTransactions()

    const filteredData = useMemo(() => {
        if (filtered === "*") return transactions
        return transactions.filter((t) => t.buyerModel === filtered)
    }, [transactions, filtered])

    if (isPending) {
        return (
            <TransactionLoadingState />
        )
    }
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <TransactionHeader
                    filtered={filtered}
                    setFiltered={setFiltered}
                    onDeleteAll={() =>{
                        if(window.confirm("Buni aniq o'chirmoqchimisiz?") ){
                            transactionDeleteMutation.mutate()
                        }
                    }}
                    hasTransactions={transactions.length > 0}
                    userRole={user?.role}
                    deletePending={transactionDeleteMutation.isPending}

                    />

                <AllTransactionCards filteredData={filteredData} />
            </div>
        </div>
    )
}
export default TransactionPage
