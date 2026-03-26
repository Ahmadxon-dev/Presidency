import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { memo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import useClass_StudentMutations from '@/hooks/useClass_StudentMutations';

const AddClassCoinsDialog = ({classId, setAddCoinsClass}) => {
    const [addCoinClassDescription, setAddcoinClassDescription] = useState("")
    const [classAmount, setClassAmount] = useState(0)

    const { mutationAddPointsClasses } = useClass_StudentMutations()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg space-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-foreground">{"Ball qo'shish va olib tashlash"}</h2>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    setClassAmount(0)
                                    setAddCoinsClass(false)
                                    setAddcoinClassDescription("")
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="points">Ball</Label>
                            <Input
                                id="points"
                                name="points"
                                value={classAmount}
                                onChange={(e) => setClassAmount(e.target.value)}
                                placeholder="123"
                                type="number"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="descr">Tavsif</Label>
                            <Input
                                id="descr"
                                name="points"
                                value={addCoinClassDescription}
                                onChange={(e) => setAddcoinClassDescription(e.target.value)}
                                placeholder="..."
                                type="text"
                                required
                            />
                        </div>
                        <div className="gap-2 pt-4  ">
                            <Button
                                className="flex-1 float-right"
                                onClick={() => {
                                    if (addCoinClassDescription === "") return toast.error("Tavsif yozilishi shart")
                                    mutationAddPointsClasses({ classId, amount: classAmount, description: addCoinClassDescription })
                                    setClassAmount(0)
                                    setAddCoinsClass(false)
                                    setAddcoinClassDescription("")
                                    // queryClient.invalidateQueries(["transactions"])
                                }}
                            >
                                Yubormoq
                            </Button>
                        </div>
                    </div>
                </div>
  )
}

export default memo(AddClassCoinsDialog)