const rootUrl = import.meta.env.VITE_SERVER

export const fetchAllRequests = async () => {
    const res = await fetch(`${rootUrl}/request/get/all`)
    return res.json()
}
export const fetchRequestUserId = async ({ id }) => {
    const res = await fetch(`${rootUrl}/request/get/${id}`)
    return res.json()
}

export const postRequestForAcademics = async (data) => {
    const res = await fetch(`${rootUrl}/request/academics`, {
        method: 'POST',
        body: data
    })
    return res.json()
}

export const postRequestForVolunteering = async ({ type, userId, name, eventName, date, numberOfDays, points }) => {
    const res = await fetch(`${rootUrl}/request/volunteering`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type,
            userId,
            name,
            eventName,
            date,
            numberOfDays,
            points
        })
    })
    return res.json()
}

export const postRequestForPresidency = async ({ type, userId, name, level, points}) => {
    const res = await fetch(`${rootUrl}/request/presidency`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type,
            userId,
            name,
            level,
            points,
            additionalDays:0
        })
    })
    return res.json()
}

export const postRequestForCompetitions = async ({ type, userId, competitionName, competitionDate, place, name, points }) => {
    const res = await fetch(`${rootUrl}/request/competitions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type,
            userId,
            competitionName,
            competitionDate,
            place,
            name,
            points
        })
    })
    return res.json()
}

export const postRequestForTeamCompetitions = async ({
    type,
    userId,
    competitionName,
    competitionDate,
    place,
    className,
    points
}) => {
    const res = await fetch(`${rootUrl}/request/team-competitions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type,
            userId,
            competitionName,
            competitionDate,
            place,
            className,
            points
        })
    })
    return res.json()
}

export const approvePost = async ({ id }) => {
    const res = await fetch(`${rootUrl}/request/approve/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}
export const rejectPost = async ({ id }) => {
    const res = await fetch(`${rootUrl}/request/reject/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}

export const deleteAllRequests = async () => {
    const res = await fetch(`${rootUrl}/request/delete/all`, {
        method: 'DELETE'
    })
    return res.json()
}
