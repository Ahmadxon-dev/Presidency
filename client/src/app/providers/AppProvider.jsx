import { Toaster } from "react-hot-toast"
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { queryClient } from "./queryClient"
import { store } from "../store"

const AppProvider = ({ children }) => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    { children }
                    <Toaster position="top-center" />
                </Provider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default AppProvider
