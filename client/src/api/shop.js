const rootUrl = import.meta.env.VITE_SERVER
//fetch all activities

export const fetchAllActivities = async() => {
    const res = await fetch(`${rootUrl}/shop/get/activities/all`)
    return res.json()
}

//mocktests
export const fetchMockTests = async () => {
    const res = await fetch(`${rootUrl}/shop/get/mocktest/all`)
    return res.json()
}

export const createMockTests = async ({ date, type, points, room }) => {
    const res = await fetch(`${rootUrl}/shop/create/mocktest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date,
            type,
            points,
            room
        })
    })
    return res.json()
}

export const deleteMockTests = async ({ id }) => {
    const res = await fetch(`${rootUrl}/shop/delete/mocktest/${id}`, { method: 'DELETE' })
    return res.json()
}
// football
export const fetchFootBallCourts = async () => {
    const res = await fetch(`${rootUrl}/shop/get/footballcourt`)
    return res.json()
}

export const createFootBallCourts = async ({ date, startTime, endTime, points }) => {
    const res = await fetch(`${rootUrl}/shop/create/footballcourt/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date,
            startTime,
            endTime,
            points
        })
    })
    return res.json()
}

export const deleteFootBallCourts = async ({ id }) => {
    const res = await fetch(`${rootUrl}/shop/delete/footballcourt/${id}`, { method: 'DELETE' })
    return res.json()
}

//cybersport rooms
export const fetchCybersportRooms = async () => {
    const res = await fetch(`${rootUrl}/shop/get/cyberportroom`)
    return res.json()
}

export const createCybersportRooms = async ({ date, startTime, endTime, points,spots }) => {
    const res = await fetch(`${rootUrl}/shop/create/cybersportroom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date,
            startTime,
            endTime,
            points,
            spots
        })
    })
    return res.json()
}

export const deleteCybersportRooms = async ({ id }) => {
    const res = await fetch(`${rootUrl}/shop/delete/cybersportoom/${id}`, { method: 'DELETE' })
    return res.json()
}

export const registerToTest = async ({ userId, mockId }) => {
    const res = await fetch(`${rootUrl}/shop/register/mock`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            mockId
        })
    })
    return res.json()
}
export const registerTofootball = async ({ classId, courtId }) => {
    const res = await fetch(`${rootUrl}/shop/register/footballcourt`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classId,
            courtId
        })
    })
    return res.json()
}

export const registerTocybersport = async ({ userId, cybersportId }) => {
    const res = await fetch(`${rootUrl}/shop/register/cybersportroom`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            cybersportId
        })
    })
    return res.json()
}

export const transferToClass = async ({ userId, amount }) => {
    const res = await fetch(`${rootUrl}/shop/transfer/toclass`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId, amount
        })
    })
    return res.json()
}


export const getUserCoins = async(id) =>{
    const res = await fetch(`${rootUrl}/auth/get/coins/${id}`)
    return res.json()
}