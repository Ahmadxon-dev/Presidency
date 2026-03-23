const rootUrl = import.meta.env.VITE_SERVER
export const fetchProfile =async(token) => {
    const res = await fetch(`${rootUrl}/auth/profile`, {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
    return  res.json()
}