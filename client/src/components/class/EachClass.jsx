import { memo, useState } from "react"
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { ShieldUser } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import useClass_StudentMutations from "@/hooks/useClass_StudentMutations";

const EachClass = ({ cls, setSelectedClass, setAddCoinsClass , setClassId, setEditingClass, setClassFormData, setShowClassForm, isSelected,  }) => {
    const {deleteClassMutation, deleteClassPending } = useClass_StudentMutations()
    const [deleteId, setDeleteId] = useState(null)

    const handleDeleteClass = (classId) => {
        setDeleteId(classId)
        deleteClassMutation(
            { id: classId },
            {
                onSuccess: () => {
                    setSelectedClass(null)
                }
            }
        )
    }

    return (
        <Card
            key={cls._id}
            className={`p-4 ml-2 mt-2 transition-all cursor-pointer hover:shadow-md ${isSelected ? "ring-2 ring-primary bg-accent" : ""}`}
            onClick={() => {
                setSelectedClass(cls)
            }}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{cls.className}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cls.teacher}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span className="font-semibold">
                                {cls.students.length} o&apos;quvchilar (maks {cls?.numberOfStudents})
                            </span>
                        </span>
                        <span className="flex items-center gap-1">
                            <ShieldUser className="h-3 w-3" /> Login: <span className="font-semibold">{cls.login}</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <HandCoins className="h-3 w-3" />
                            Ball:<span className="font-semibold">{cls.coins}</span>
                        </span>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation()
                            setAddCoinsClass(true)
                            setClassId(cls._id)
                        }}
                        className="h-8 w-8 cursor-pointer"
                    >
                        <HandCoins className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation()
                            setEditingClass(cls)
                            setClassFormData({
                                className: cls.className,
                                login: cls.login,
                                password: "",
                                numberOfStudents: cls.numberOfStudents
                            })
                            setShowClassForm(true)
                        }}
                        className="h-8 w-8 cursor-pointer"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => window.confirm("Buni aniq o'chirmoqchimisiz?") && handleDeleteClass(cls._id)}
                        disabled={deleteId === cls._id && deleteClassPending}
                        className="h-8 w-8 text-destructive cursor-pointer hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default memo(EachClass)
