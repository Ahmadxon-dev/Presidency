const rootUrl = import.meta.env.VITE_SERVER
export const fetchData = async () => {
    const res = await fetch(`${rootUrl}/events/get/all`)
    return res.json()
}
export const createEvents = async (data) => {
    const res = await fetch(`${rootUrl}/events/add`, {
        method: 'POST',
        body: data
    })
    return res.json()
}
export const deletingEvents = async ({ id }) => {
    const res = await fetch(`${rootUrl}/events/delete/${id}`, { method: 'DELETE' })
    return res.json()
}

export const registerClass = async ({ eventId, classId }) => {
    const res = await fetch(`${rootUrl}/events/register/class`, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            eventId,
            classId
        })
    })
    return res.json()
}

export const registerStudent = async ({ eventId, studentId }) => {
    const res = await fetch(`${rootUrl}/events/register/student`, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            eventId,
            studentId
        })
    })
    return res.json()
}
export const fetchEachEvent = async ({ id }) => {
    const res = await fetch(`${rootUrl}/events/get/${id}`)
    return res.json()
}