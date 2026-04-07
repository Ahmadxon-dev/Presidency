import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const loginSchema = z.object({
    login: z.string(),
    // .min(3, { message: "Login must contain at least 3 characters" }),
    password: z.string()
})

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: '',
            password: ''
        }
    })
   
    const onSubmit = async (data) => {
        const toastId = toast.loading('Tekshirilmoqda...')
        await fetch(`${import.meta.env.VITE_SERVER}/auth/signin/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    toast.error(data.error, { id: toastId })
                } else {
                    toast.success(data.msg, { id: toastId })
                    localStorage.setItem('token', data.token)
                    dispatch(setCredentials({ user: data.user }))
                    navigate('/')
                }
            })
    }
    return (
        <div className="flex min-h-svh w-full  justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn('flex flex-col gap-6')}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Tizimga Kirish</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="login"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Login</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="username123" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Parol</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                        {form.formState.isSubmitting ? 'Tekshirilmoqda' : 'Kirish'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
