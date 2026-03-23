import React from 'react'
import { Award, User, LogIn, Lock } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserCoins } from '../../api/shop'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Users, BookOpen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { editPassword, editPasswordClass } from '../../api/profile'
import toast from 'react-hot-toast'

const SettingsPage = () => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const user = useSelector((state) => state.auth.user)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const { mutate: mutateUserPassword } = useMutation({
        mutationFn: editPassword,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: 'editPasswordID' }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: 'editPasswordID' })
            } else {
                toast.success(data.msg, { id: 'editPasswordID' })
            }
        },
        onError: (data) => toast.error(data.error, { id: 'editPasswordID' })
    })
    const { mutate: mutateClassPassword } = useMutation({
        mutationFn: editPasswordClass,
        onMutate: () => toast.loading("O'zgartirilmoqda...", { id: 'editClassPasswordID' }),
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error, { id: 'editClassPasswordID' })
            } else {
                toast.success(data.msg, { id: 'editClassPasswordID' })
            }
        },
        onError: (data) => toast.error(data.error, { id: 'editClassPasswordID' })
    })
    const handleChangePasswordUser = () => {
        mutateUserPassword({ studentId: user.id, newPassword, oldPassword })
        setIsPasswordModalOpen(false)
        setOldPassword('')
        setNewPassword('')
    }
    const handleChangePasswordClass = () => {
        mutateClassPassword({ classId: user.id, newPassword, oldPassword })
        setIsPasswordModalOpen(false)
        setOldPassword('')
        setNewPassword('')
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 flex items-center justify-center">
                <div className="w-full max-w-2xl mx-auto">
                    {/* Main Card */}

                    {user.role !== 'class' ? (
                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            {/* Header Background */}
                            <div className="h-32 bg-gradient-to-r from-primary/50 via-accent to-primary/50 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-8 pb-8">
                                {/* Avatar and Name */}
                                <div className="flex flex-col items-center -mt-16 mb-8 relative z-10">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/90 to-accent-foreground flex items-center justify-center text-white shadow-lg border-4 border-card mb-6">
                                        <User size={64} />
                                    </div>
                                    <h1 className="text-4xl font-bold text-foreground text-center mb-2">{user.name}</h1>
                                </div>

                                <div className="flex  w-full">
                                    <button
                                        onClick={() => setIsPasswordModalOpen(true)}
                                        className="bg-primary  text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mx-auto w-full cursor-pointer"
                                    >
                                        <Lock size={20} />
                                        Parolni o'zgartirish
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                            {/* Header Background */}
                            <div className="h-40 bg-gradient-to-r from-primary/50 via-accent to-primary/50 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-8 pb-8">
                                {/* Header Section */}
                                <div className="flex flex-col items-center -mt-20 mb-8 relative z-10">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/90 to-accent-foreground flex items-center justify-center text-white shadow-lg border-4 border-card mb-6">
                                        <BookOpen size={64} />
                                    </div>
                                    <h1 className="text-5xl font-bold text-foreground text-center mb-2">{user.name}</h1>
                                </div>

                                

                                <div className="flex w-full">
                                    <button
                                        onClick={() => setIsPasswordModalOpen(true)}
                                        className="bg-primary  text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mx-auto w-full cursor-pointer"
                                    >
                                        <Lock size={20} />
                                        Parolni o'zgartirish
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <Dialog
                        open={isPasswordModalOpen}
                        onOpenChange={() => {
                            setIsPasswordModalOpen(!isPasswordModalOpen)
                            setNewPassword('')
                            setOldPassword('')
                        }}
                    >
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Parolni o'zgartirish</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="add-eventName">Joriy parol</Label>
                                    <Input
                                        id="add-eventName"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="add-eventName">Yangi parol</Label>
                                    <Input
                                        id="add-eventName"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={user.role === 'class' ? handleChangePasswordClass : handleChangePasswordUser}>
                                    Parolni o'zgartirish
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
