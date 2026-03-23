const Event = require("../models/events.model")
const { uploadToCloudinary } = require("../utils/uploadToClaudinary")
const cloudinary = require("cloudinary").v2
class EventController {
    async addEvent(req, res) {
        const { eventName, eventDate, description, type } = req.body
        if (!eventName || !eventDate || !description || !type)
            return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
        const image = req.file ? req.file : null
        const userModel = type === "Student" ? "User" : "Class"
        const imageUrl = image ? await uploadToCloudinary(image.buffer, `event_${global.crypto.randomUUID()}`) : null
        const newEvent = new Event({ eventName, eventDate, userModel, description, img: imageUrl, type, registeredUsers: [] })
        await newEvent.save()
        return res.status(201).json({ msg: "Tadbir muvaffaqiyatli yaratildi" })
    }
    async deleteEvent(req, res) {
        const { id } = req.params
        const deletedEvent = await Event.findByIdAndDelete(id)
        const imagePublicId = deletedEvent.img !== null && deletedEvent.img.split("/").pop().split(".")[0]
        await cloudinary.uploader.destroy(`presidency/${imagePublicId}`) // delete event image from cloudinary
        return res.status(200).json({ msg: "Tadbir o'chirildi" })
    }
    async editEvent(req, res) {
        const { eventName, eventDate, description, type } = req.body
        if (!eventName || !eventDate || !description || !type) return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
        const { id } = req.params
        const image = req.file
        const userModel = type === "Student" ? "User" : "Class"
        const updatedData = { eventName, eventDate, description, type, userModel }
        if (image) {
            const imageUrl = await uploadToCloudinary(image.buffer, `event_${global.crypto.randomUUID()}`)
            updatedData.img = imageUrl
        }
        if (!eventName || !eventDate || !title || !description || !type)
            return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
        await Event.findByIdAndUpdate(id, updatedData, { new: true })
        const newData = await Event.find()
        return res.status(200).json({ msg: "Tadbir o'zgartirildi", newData })
    }
    async getAllEvents(req, res) {
        const allEvents = await Event.find().sort({ _id: -1 })
        return res.status(200).json(allEvents)
    }
    async getOneEvent(req, res) {
        const { id } = req.params
        const event = await Event.findById(id).populate("registeredUsers")
        return res.status(200).json(event)
    }

    async registerClass(req, res) {
        try {
            const { classId, eventId } = req.body
            const event = await Event.findByIdAndUpdate(eventId, { $push: { registeredUsers: classId } }).populate(
                "registeredUsers"
            )
            return res.status(200).json({ msg: "Sinf ro'yxatdan muvaffaqiyatli o'tdi" })
        } catch (e) {
            return res.status(404).json({ error: e.message })
        }
    }
    async registerStudent(req, res) {
        try {
            const { studentId, eventId } = req.body
            const event = await Event.findByIdAndUpdate(eventId, { $push: { registeredUsers: studentId } }).populate(
                "registeredUsers"
            )
            return res.status(200).json({ msg: "O'quvchi ro'yxatdan muvaffaqiyatli o'tdi" })
        } catch (e) {
            return res.status(404).json({ error: e.message })
        }
    }
    async getClassEvents(req, res) {
        try {
            const { id } = req.params
            const events = await Event.find({ type: "Class", registeredUsers: { $in: [id] } })
            return res.status(200).json(events)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
    async getStudentEvents(req, res) {
        try {
            const { id } = req.params
            const events = await Event.find({ type: "Student", registeredUsers: { $in: [id] } })
            return res.status(200).json(events)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

module.exports = new EventController()
