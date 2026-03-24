const rootUrl = import.meta.env.VITE_SERVER

export const fetchEachNews = async (id) => {
    const res = await fetch(`${rootUrl}/news/get/${id}`)
    return res.json()
}

export const fetchNewsData = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/news/get/all`)
    return res.json()
}
export const createNews = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/news/add/`, {
        method: "POST",
        body: data
    })
    return res.json()
}
export const deletingNews = async ({ id }) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/news/delete/${id}`, { method: "DELETE" })
    return res.json()
}

