import { Card } from "@/components/ui/card"
import formatUzDate from "@/utils/formatDate"
import { memo } from "react"

const EachCard = ({ transaction }) => {
    return (
        <Card
            key={transaction._id}
            className="group hover:shadow-xl hover:scale-[1.01] transition-all duration-200 border-border overflow-hidden bg-card"
        >
            <div className="p-4 md:py-2 md:px-6 ">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Product and Buyer Info */}
                    <div className="flex-1 space-y-2">
                        <h3 className="text-2xl md:text-2xl max-w-2xl font-semibold text-foreground">{transaction.description}</h3>

                        <div className="flex flex-col  gap- text-sm text-muted-foreground">
                            {!transaction.productModel && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{transaction.buyerModel === "User" ? "O'quvchi: " : "Sinf: "}</span>
                                    <span>
                                        {transaction.buyerModel === "User" &&
                                            (transaction.buyer ? transaction.buyer.fullName : "Foydalanuvchi o'chirilgan")}
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
    )
}

export default memo(EachCard)
