const rootUrl = import.meta.env.VITE_SERVER
export const fetchClasses = async () => {
    const res = await fetch(`${rootUrl}/class/get`)
    return res.json()
}
export const createClasses = async ({ className, login, password, numberOfStudents }) => {
    const res = await fetch(`${rootUrl}/class/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            className,
            login,
            password,
            numberOfStudents
        })
    })

    return res.json()
}
export const deleteClasses = async ({ id }) => {
    const res = await fetch(`${rootUrl}/class/delete/${id}`, { method: 'DELETE' })
    return res.json()
}
export const editClasses = async ({ className, newLogin, classId, newPassword, numberOfStudents }) => {
    const res = await fetch(`${rootUrl}/class/edit`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            className,
            newLogin,
            classId,
            newPassword,
            numberOfStudents
        })
    })
    return res.json()
}

export const addPointsClass = async ({ classId, amount, description }) => {
    const res = await fetch(`${rootUrl}/admin/add/points/class`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classId,
            amount,
            description
        })
    })
    return res.json()
}

export const getOneClass = async (id) => {
    const res = await fetch(`${rootUrl}/class/get/${id}`)
    return res.json()
}