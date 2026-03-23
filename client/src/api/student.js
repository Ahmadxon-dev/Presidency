const rootUrl = import.meta.env.VITE_SERVER
// export const fetchStudents = async () => {
//     const res = await fetch(`${rootUrl}/class/get`)
//     return res.json()
// }
export const createStudents = async ({ fullName, login, password, classId, phoneNumber, tgUserName, email }) => {
    const res = await fetch(`${rootUrl}/auth/register/user/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName,
            login,
            password,
            classId,
            phoneNumber,
            tgUserName,
            email
        })
    })

    return res.json()
}
export const deleteStudents = async ({ studentId, classId }) => {
    const res = await fetch(`${rootUrl}/auth/delete/student/${studentId}/${classId}`, { method: 'DELETE' })
    return res.json()
}
export const editStudents = async ({ fullName, login, password, studentId, classId, phoneNumber, tgUserName, email }) => {
    const res = await fetch(`${rootUrl}/auth/admin/user/edit`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            studentId,
            fullName,
            login,
            classId,
            password,
            phoneNumber,
            tgUserName,
            email
        })
    })
    return res.json()
}

export const addPointsStudent = async ({ userId, amount, description }) => {
    const res = await fetch(`${rootUrl}/admin/add/points/students`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            amount,
            description
        })
    })
    return res.json()
}
