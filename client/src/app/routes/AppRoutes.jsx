import React from "react"
import { lazy, Suspense } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Loader from "@/components/shared/Loader"
import ProtectedRouter from "@/components/shared/ProtectedRouter.jsx"
import Navbar from "@/components/layout/Navbar.jsx"

const HeroComponent = lazy(() => import("../../components/layout/Hero.jsx"))
const LoginPage = lazy(() => import("../../pages/auth/LoginPage.jsx"))
const NewsPage = lazy(() => import("../../pages/news/NewsPage.jsx"))
const EventsPage = lazy(() => import("../../pages/events/EventsPage.jsx"))
const ShopPage = lazy(() => import("../../pages/shop/ShopPage.jsx"))
const ClassPage = lazy(() => import("../../pages/class/ClassPage.jsx"))
const TransactionPage = lazy(() => import("../../pages/transaction/TransactionPage.jsx"))
const EachEventsPage = lazy(() => import("../../pages/events/EachEventsPage.jsx"))
const EachNewsPage = lazy(() => import("../../pages/news/EachNewsPage.jsx"))
const SettingsPage = lazy(() => import("../../pages/auth/SettingsPage.jsx"))
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage.jsx"))
const ProfilePage = lazy(() => import("../../pages/auth/ProfilePage.jsx"))
const MyClassPage = lazy(() => import("../../pages/class/MyClassPage.jsx"))
const RequestPoints = lazy(() => import("../../pages/request-points/RequestPoints.jsx"))
const MainRequestPointsPage = lazy(() => import("../../pages/request-points/MainRequestPointsPage.jsx"))
const AdminManagement = lazy(() => import("../../pages/admin/AdminManagement.jsx"))

const AppRoutes = () => {
    const location = useLocation()
    const hideNavbar = location.pathname === "/signin"

    return (
        <div className="flex flex-col ">
            { !hideNavbar && <Navbar />}
            <div className=" transition-all duration-300">
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<HeroComponent />} />
                        <Route path="/signin" element={<LoginPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/myclass" element={<MyClassPage />} />
                        <Route path="/news/:id" element={<EachNewsPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/events/:id" element={<EachEventsPage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/requests" element={<MainRequestPointsPage />} />
                        <Route path="/request-points" element={<RequestPoints />} />
                        <Route
                            path="/admin-management"
                            element={
                                <ProtectedRouter>
                                    <AdminManagement />
                                </ProtectedRouter>
                            }
                        />
                        <Route
                            path="/classes"
                            element={
                                <ProtectedRouter>
                                    <ClassPage />
                                </ProtectedRouter>
                            }
                        />
                        <Route
                            path="/transactions"
                            element={
                                <ProtectedRouter>
                                    <TransactionPage />
                                </ProtectedRouter>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    )
}

export default AppRoutes
