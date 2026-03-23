import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRightLeft } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transferToClass } from '../../api/shop'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
const TransferButton = () => {
    const queryClient = useQueryClient()
    const user = useSelector((state) => state.auth.user)
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(0)
    const { mutate, isPending } = useMutation({
        mutationFn: transferToClass,
        onMutate: () => toast.loading('Transferring...', { id: 'transferToClass' }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: 'transferToClass' })
            } else {
                queryClient.invalidateQueries(['transactions'])
                toast.success(data.msg, { id: 'transferToClass' })
            }
        },
        onError: (data) => toast.error(data.error, { id: 'transferToClass' })
    })

    const handleTransfer = () => {
        mutate({ userId: user.id, amount })
        setAmount(0)
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <ArrowRightLeft className="h-4 w-4" />
                    Ballarni o‘tkazish
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ballarni o‘tkazish</DialogTitle>
                    <DialogDescription>Sinfingizga o'tkazmoqchi bo'lgan ballar miqdorini kiriting</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Miqdor
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="col-span-3"
                            min="0"
                            step="1"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setAmount(0)
                            setOpen(false)
                        }}
                    >
                        Bekor qilish
                    </Button>
                    <Button onClick={handleTransfer}>O'tkazish</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TransferButton
