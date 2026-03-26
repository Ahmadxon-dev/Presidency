import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <main className="h-[63vh] bg-background text-foreground flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-3">
                    <h1 className="text-8xl font-bold tracking-tight">404</h1>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">Sahifa topilmadi</p>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">{"The page you're looking for doesn't exist."}</p>

                <div className="flex flex-col gap-2 pt-2">
                    <Link to="/" className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity">
                        Bosh sahifaga qaytish
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default NotFoundPage
