import React, { memo } from "react"
import { Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

const NewsEmptyState = () => {
    return (
        <Card className="p-12">
            <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Yangiliklar topilmadi</h3>
            </div>
        </Card>
    )
}

export default memo(NewsEmptyState)
