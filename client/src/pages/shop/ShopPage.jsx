import React from "react"
import MockTestPage from "./MockTestPage"
import FootballCourtPage from "./FootballCourtPage"
import CybersportRoom from "./CybersportRoomPage"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { getUserCoins } from "../../api/shop"
import { Skeleton } from "@/components/ui/skeleton"
import BookingActivity from "../../components/shared/BookingActivity.jsx"

const ShopPage = () => {
    const user = useSelector((state) => state.auth.user)
    const { data, isPending } = useQuery({ queryKey: ["coins"], queryFn: () => getUserCoins(user.id) })

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-8 ">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground">{"Do'kon"}</h1>
                        {user.role !== "admin" && !isPending && <h1 className="text-xl font-bold text-foreground">Mening ballarim: {data.coins}</h1>}
                        {isPending && (
                            <div className="flex gap-1">
                                <Skeleton className={`h-[20px] w-[70px]`} /> <Skeleton className={`h-[20px] w-[100px]`} />{" "}
                            </div>
                        )}
                    </div>
                    {/* {user.role === 'student' && <TransferButton />} */}
                </div>
                <main className="container mx-auto px-4 ">
                    <div className="space-y-12">
                        {user.role === "admin" ? (
                            <>
                                {/* Mock Tests Section */}
                                <MockTestPage user={user} />

                                {/* Football Courts Section */}

                                <FootballCourtPage user={user} />

                                {/* Cybersport Rooms Section */}

                                <CybersportRoom user={user} />
                            </>
                        ) : (
                            <>
                                <BookingActivity user={user} />
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ShopPage
