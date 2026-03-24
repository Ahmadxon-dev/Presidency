import TransactionEmptyState from "./TransactionEmptyState"
import EachCard from "./EachCard"
import { memo } from "react"

const AllTransactionCards = ({ filteredData }) => {
    return (
        <div className="container mx-auto px-4 my-8 md:py-12 max-w-5xl">
            <div className="space-y-3">
                {filteredData.length !== 0 ? (
                    filteredData.map((transaction) => <EachCard key={transaction._id} transaction={transaction} />)
                ) : (
                    <TransactionEmptyState />
                )}
            </div>
        </div>
    )
}

export default memo(AllTransactionCards)
