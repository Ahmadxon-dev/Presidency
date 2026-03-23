const RequestModel = require("../models/request.model")
const { uploadToCloudinaryForProofs } = require("../utils/uploadToClaudinary")
const TransactionModel = require("../models/transaction.model.js")
const userModel = require("../models/user.model.js")
const ClassModel = require("../models/class.model.js")
const cloudinary = require("cloudinary").v2

class RequestController {
    async requestForAcademics(req, res) {
        try {
            const { type, userId, points, className, subject, date, bsbType, teacher } = req.body
            const image = req.file ? req.file : null
            const proofImageUrl = image
                ? await uploadToCloudinaryForProofs(image.buffer, `proofImage_${global.crypto.randomUUID()}`)
                : null
            const request = new RequestModel({
                type,
                userId,
                userModel: "User",
                status: "pending",
                points,
                details: { className, subject, date, bsbType, teacher, proofImage: proofImageUrl }
            })
            await request.save()
            return res.status(200).json({ msg: "Ball olish uchun so'rov yuborildi" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async requestForVolunteering(req, res) {
        try {
            const { type, userId, name, eventName, date, numberOfDays, points } = req.body
            const request = new RequestModel({
                type,
                userId,
                userModel: "User",
                status: "pending",
                points,
                details: { name, eventName, date, numberOfDays }
            })
            await request.save()
            return res.status(200).json({ msg: "Ball olish uchun so'rov yuborildi" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async requestForPresidency(req, res) {
        const { type, userId, name, level, additionalDays, points } = req.body
        const request = new RequestModel({
            type,
            userId,
            userModel: "User",
            status: "pending",
            points,
            details: { name, level, additionalDays }
        })
        await request.save()
        return res.status(200).json({ msg: "Ball olish uchun so'rov yuborildi" })
    }
    async requestForCompetitions(req, res) {
        const { type, userId, competitionName, competitionDate, place, name, points } = req.body
        const request = new RequestModel({
            type,
            userId,
            userModel: "User",
            status: "pending",
            points,
            details: { competitionName, competitionDate, place, name }
        })
        await request.save()
        return res.status(200).json({ msg: "Ball olish uchun so'rov yuborildi" })
    }
    async requestForTeamCompetitions(req, res) {
        const { type, userId, competitionName, competitionDate, place, className, points } = req.body
        const request = new RequestModel({
            type,
            userId,
            userModel: "Class",
            status: "pending",
            points,
            details: { competitionName, competitionDate, place, className }
        })
        await request.save()
        return res.status(200).json({ msg: "Ball olish uchun so'rov yuborildi" })
    }
    async getRequestsById(req, res) {
        try {
            const { id } = req.params
            const requests = await RequestModel.find({ userId: id })
            return res.status(200).json(requests)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async getAllRequests(req, res) {
        try {
            const requests = await RequestModel.find().sort({ id: -1 })
            return res.status(200).json(requests)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async approveRequest(req, res) {
        try {
            //post
            const { id } = req.params
            const request = await RequestModel.findByIdAndUpdate(id, { status: "approved" }).populate("userId")
            // const request = await RequestModel.findById(id).populate('userId')
            const activityTranslations = {
                volunteering: "volontyorlik",
                competitions: "musobaqa",
                "presidency-salaries": "prezident maoshlari",
                "team-competitions": "guruh musobaqasi",
                academics: "ta'lim"
            }
            const activityDescription = activityTranslations[request.type]
            if (request.userModel === "User") {
                const user = await userModel.findById(request.userId._id)
                user.coins += +request.points
                await user.save()
            }
            if (request.userModel === "Class") {
                const className = await ClassModel.findById(request.userId._id)
                className.coins += +request.points
                await className.save()
            }

            const transaction = new TransactionModel({
                buyer: request.userId._id,
                buyerModel: request.userModel,
                amount: request.points,
                description: `${
                    request.userModel === "Class"
                        ? `${request.userId.className} ning ${activityTranslations[request.type]} faoliyati bo'yicha so'rovi tasdiqlandi`
                        : `${request.userId.fullName} ning ${activityTranslations[request.type]} faoliyati bo'yicha so'rovi tasdiqlandi`
                }`
            })

            await transaction.save()
            return res.status(200).json({ msg: "Tasdiqlandi!" })
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({ error: e.message })
        }
    }
    async rejectRequest(req, res) {
        try {
            //post
            const { id } = req.params
            await RequestModel.findByIdAndUpdate(id, { status: "rejected" })
            return res.status(200).json({ msg: "Rad etildi" })
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({ error: e.message })
        }
    }
    async deleteAllRequests(req, res) {
        try {
            await RequestModel.collection.drop()
            await cloudinary.api.delete_resources_by_prefix("proofsForAcademics")
            return res.status(200).json({ msg: "Barcha so'rovlar o'chirildi" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
}

module.exports = new RequestController()
