const News = require("../models/news.model")
const { uploadToCloudinary } = require("../utils/uploadToClaudinary")
const cloudinary = require("cloudinary").v2
class newsController {
    async addNews(req, res) {
        const { title, description } = req.body
        const image = req.file ? req.file : null
        if (!title || !description) return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
        const imageUrl = image ? await uploadToCloudinary(image.buffer, `news_${global.crypto.randomUUID()}`) : null
        const currentNews = new News({ title, description, img: imageUrl })
        await currentNews.save()
        const newData = await News.find()
        return res.status(201).json({ msg: "Yangilik muvaffaqiyatli yaratildi!", newData })
    }
    async deleteNews(req, res) {
        const { id } = req.params
        const deletedNews = await News.findByIdAndDelete(id)
        const imagePublicId = deletedNews.img !== null && deletedNews.img.split("/").pop().split(".")[0]
        await cloudinary.uploader.destroy(`presidency/${imagePublicId}`)
        return res.status(200).json({ msg: "Yangilik o'chirildi" })
    }
    async editNews(req, res) {
        const { title, description } = req.body
        const { id } = req.params
        const image = req.file
        const updatedData = { title, description }
        if (!title || !description) return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
        if (image) {
            const imageUrl = await uploadToCloudinary(image.buffer, `news_${global.crypto.randomUUID()}`)
            updatedData.img = imageUrl
        }
        await News.findByIdAndUpdate(id, updatedData, { new: true })
        const newData = await News.find()
        return res.status(200).json({ msg: "Yangilik o'zgartirildi", newData })
    }
    async getAllNews(req, res) {
        const allNews = await News.find().sort({ _id: -1 })
        return res.status(200).json(allNews)
    }
    async getOneNews(req, res) {
        const { id } = req.params
        const oneNews = await News.findById(id)
        return res.status(200).json(oneNews)
    }
}

module.exports = new newsController()
