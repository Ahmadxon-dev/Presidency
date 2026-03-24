import React from "react"
import { Users } from "lucide-react"
import { Card } from "@/components/ui/card"

const AdminEmptyState = () => {
    return (
        <Card className="p-12">
            <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Admin topilmadi</h3>
            </div>
        </Card>
    )
}

export default AdminEmptyState
