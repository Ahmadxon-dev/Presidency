const rootUrl = import.meta.env.VITE_SERVER

export const editPassword = async ({ studentId, newPassword, oldPassword }) => {
    const res = await fetch(`${rootUrl}/auth/edit/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            studentId,
            newPassword,
            oldPassword
        })
    })
    return res.json()
}

export const editPasswordClass = async ({ classId, newPassword, oldPassword }) => {
    const res = await fetch(`${rootUrl}/auth/edit/class/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classId,
            newPassword,
            oldPassword
        })
    })
    return res.json()
}
