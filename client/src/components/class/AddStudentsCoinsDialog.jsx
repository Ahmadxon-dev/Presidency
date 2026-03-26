
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { memo, useState } from 'react';
import { X } from 'lucide-react';
import useClass_StudentMutations from '@/hooks/useClass_StudentMutations';
const AddStudentsCoinsDialog = ({ setAddCoinsStudent, studentId, setSelectedClass }) => {
    const [addCoinsStudentDescription, setAddCoinsStudentDescription] = useState("")
    const [studentAmount, setStudentAmount] = useState(0)
    
    const { mutationAddCoinsStudents } = useClass_StudentMutations()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg space-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-foreground">{"Ball qo'shish va olib tashlash"}</h2>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    setStudentAmount(0)
                                    setAddCoinsStudent(false)
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
                                value={studentAmount}
                                onChange={(e) => setStudentAmount(e.target.value)}
                                placeholder="123"
                                type="number"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="descr">Tavsif</Label>
                            <Input
                                id="descr"
                                name="descr"
                                value={addCoinsStudentDescription}
                                onChange={(e) => setAddCoinsStudentDescription(e.target.value)}
                                placeholder="..."
                                type="text"
                                required
                            />
                        </div>
                        <div className="gap-2 pt-4  ">
                            <Button
                                className="flex-1 float-right"
                                onClick={() => {
                                    if (addCoinsStudentDescription === "") return toast.error("Tavsif yozilishi shart")
                                    mutationAddCoinsStudents({ userId: studentId, amount: studentAmount, description: addCoinsStudentDescription }, {
                                        onSuccess: data=>{
                                            setSelectedClass(data.newData)
                                        }
                                    })
                                    setStudentAmount(0)
                                    setAddCoinsStudentDescription("")
                                    setAddCoinsStudent(false)
                                }}
                            >
                                Yubormoq
                            </Button>
                        </div>
                    </div>
                </div>
  )
}

export default memo(AddStudentsCoinsDialog)