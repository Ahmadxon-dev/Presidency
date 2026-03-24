import { memo } from "react"
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const TransactionEmptyState = () => {
    return (
        <Card className="p-12">
            <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tranzaksiya topilmadi</h3>
            </div>
        </Card>
    )
}

export default memo(TransactionEmptyState)