import AuthBootstrap from "@/app/providers/AuthBootstrap"
import AppRoutes from "@/app/routes/AppRoutes"

function App() {
    return <AuthBootstrap>
        <AppRoutes />
    </AuthBootstrap>
}

export default App
