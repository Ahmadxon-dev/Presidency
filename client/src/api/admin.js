const rootUrl = import.meta.env.VITE_SERVER

export const fetchAdmins = async () => {
    const res = await fetch(`${rootUrl}/auth/admin/all`)
    return res.json()
}
export const createAdmins = async ({ fullName, login, password }) => {
    const res = await fetch(`${rootUrl}/auth/register/admin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName,
            login,
            password
        })
    })

    return res.json()
}
export const deleteAdmins = async ({ id }) => {
    const res = await fetch(`${rootUrl}/auth/admin/delete/${id}`, { method: "DELETE" })
    return res.json()
}
export const editAdmins = async ({ fullName, login, password, userId }) => {
    const res = await fetch(`${rootUrl}/auth/admin/edit`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName,
            login,
            password,
            userId
        })
    })
    return res.json()
}
