import React, { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteAllTransactions, fetchAllTransactions } from "../../api/transaction"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { Calendar } from "lucide-react"
import formatUzDate from "./../../utils/formatDate"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

const TransactionPage = () => {
    const queryClient = useQueryClient()
    const { data: transactions, isPending } = useQuery({ queryKey: ["transactions"], queryFn: fetchAllTransactions })
    const [filtered, setFiltered] = useState("*")
    const user = useSelector((state) => state.auth.user)
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
    const filteredData = useMemo(() => {
        if (filtered === "*") return transactions
        return transactions.filter((t) => t.buyerModel === filtered)
    }, [transactions, filtered])

    if (isPending) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Skeleton */}
                    <div className="w-full flex items-center justify-between mx-auto mb-8">
                        <Skeleton className="h-10 w-48" />
                        <div className="flex flex-col lg:flex-row gap-2">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-40" />
                        </div>
                    </div>

                    {/* Transaction Cards Skeleton */}
                    <div className="container mx-auto px-4 my-8 md:py-12 max-w-5xl">
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <Card key={index} className="group border-border overflow-hidden bg-card p-4 md:py-2 md:px-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Product and Info Skeleton */}
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-8 w-3/4" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-1/2" />
                                                <Skeleton className="h-4 w-2/3" />
                                                <Skeleton className="h-4 w-1/2" />
                                            </div>
                                        </div>

                                        {/* Amount Skeleton */}
                                        <div className="text-left md:text-right">
                                            <Skeleton className="h-12 w-32 ml-auto" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="w-full flex items-center justify-between mx-auto mb-8 ">
                    <h1 className="text-4xl font-bold  text-foreground mb-2">Tranzaksiyalar</h1>
                    {user.role === "admin" && (
                        <div className="flex flex-col lg:flex-row gap-2  ">
                            <NativeSelect value={filtered} onChange={(e) => setFiltered(e.target.value)}>
                                <NativeSelectOption value="*">Barchasi</NativeSelectOption>
                                <NativeSelectOption value="User">O'quvchi</NativeSelectOption>
                                <NativeSelectOption value="Class">Sinf</NativeSelectOption>
                            </NativeSelect>
                            <Button
                                onClick={() => window.confirm("Buni aniq o'chirmoqchimisiz?") && transactionDeleteMutation.mutate()}
                                disabled={transactionDeleteMutation.isPending || transactions.length === 0}
                            >
                                Barcha tranzaksiyalarni o'chirish
                            </Button>
                        </div>
                    )}
                </div>

                <div className="container mx-auto px-4 my-8 md:py-12 max-w-5xl">
                    <div className="space-y-3">
                        {filteredData.length !== 0 ? (
                            filteredData.map((transaction) => (
                                <Card
                                    key={transaction._id}
                                    className="group hover:shadow-xl hover:scale-[1.01] transition-all duration-200 border-border overflow-hidden bg-card"
                                >
                                    <div className="p-4 md:py-2 md:px-6 ">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            {/* Product and Buyer Info */}
                                            <div className="flex-1 space-y-2">
                                                <h3 className="text-2xl md:text-2xl max-w-2xl font-semibold text-foreground">
                                                    {transaction.description}
                                                </h3>

                                                <div className="flex flex-col  gap- text-sm text-muted-foreground">
                                                    {!transaction.productModel && (
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">
                                                                {transaction.buyerModel === "User" ? "O'quvchi: " : "Sinf: "}
                                                            </span>
                                                            <span>
                                                                {transaction.buyerModel === "User" && ( transaction.buyer ? transaction.buyer.fullName : "Foydalanuvchi o'chirilgan")}
                                                                {transaction.buyerModel === "Class" && (transaction.buyer ? transaction.buyer.className : "Sinf o'chirilgan")}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">Sana:</span>
                                                        <span>{formatUzDate(transaction.createdAt)}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {transaction.productModel && transaction.buyerModel === "User" ? (
                                                            <>
                                                                <span className="font-medium">Sotib oluvchi:</span>
                                                                <span>{transaction.buyer ? transaction.buyer.fullName : "Foydalanuvchi o'chirilgan "}</span>
                                                            </>
                                                        ) : (
                                                            transaction.productModel &&
                                                            transaction.buyerModel === "Class" && (
                                                                <>
                                                                    <span className="font-medium">Sotib oluvchi:</span>
                                                                    <span>{transaction.buyer ? transaction.buyer.className : "Sinf o'chirilgan"} Class</span>
                                                                </>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Amount */}
                                            <div className="text-left md:text-right">
                                                <div className="text-4xl md:text-5xl font-bold text-primary/90">{transaction.amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <Card className="p-12">
                                <div className="text-center">
                                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Tranzaksiya topilmadi</h3>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionPage
