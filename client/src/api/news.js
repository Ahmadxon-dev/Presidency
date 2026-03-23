const rootUrl = import.meta.env.VITE_SERVER

export const fetchEachNews = async (id) => {
    const res = await fetch(`${rootUrl}/news/get/${id}`)
    return res.json()
}
