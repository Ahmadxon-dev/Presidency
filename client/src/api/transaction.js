const rootUrl = import.meta.env.VITE_SERVER

export const fetchAllTransactions = async () => {
    const res = await fetch(`${rootUrl}/transaction/get`)
    return res.json()
}

export const deleteAllTransactions = async () => {
    const res = await fetch(`${rootUrl}/transaction/delete/all`, { method: 'DELETE' })
    return res.json()
}
