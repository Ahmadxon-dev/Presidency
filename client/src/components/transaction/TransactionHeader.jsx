import { NativeSelect } from "@/components/ui/native-select"
import { NativeSelectOption } from "@/components/ui/native-select"
import { Button } from "@/components/ui/button"
import { memo } from "react"

const TransactionHeader = ({ setFiltered, filtered, userRole, onDeleteAll, deletePending, hasTransactions }) => {
    return (
        <div className="w-full flex items-center justify-between mx-auto mb-8 ">
            <h1 className="text-4xl font-bold  text-foreground mb-2">Tranzaksiyalar</h1>
            {userRole === "admin" && (
                <div className="flex flex-col lg:flex-row gap-2  ">
                    <NativeSelect value={filtered} onChange={(e) => setFiltered(e.target.value)}>
                        <NativeSelectOption value="*">Barchasi</NativeSelectOption>
                        <NativeSelectOption value="User">O&apos;quvchi</NativeSelectOption>
                        <NativeSelectOption value="Class">Sinf</NativeSelectOption>
                    </NativeSelect>
                    <Button onClick={onDeleteAll} disabled={deletePending || !hasTransactions}>
                        Barcha tranzaksiyalarni o&apos;chirish
                    </Button>
                </div>
            )}
        </div>
    )
}

export default memo(TransactionHeader) 