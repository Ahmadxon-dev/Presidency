const User = require("../models/user.model")
const ClassModel = require("../models/class.model")
const TransactionModel = require("../models/transaction.model")

class AdminController {
    async setManualPointsStudents(req, res) {
        const { userId, amount } = req.body
        const user = await User.findById(userId)
        user.coins = Number(amount)
        await user.save()
        return res.status(200).json({ msg: "O'zgarishlar saqlandi!" })
    }
    async setManualPointsClass(req, res) {
        const { classId, amount } = req.body
        const classModel = await ClassModel.findById(classId)
        classModel.coins = Number(amount)
        await classModel.save()
        return res.status(200).json({ msg: "O'zgarishlar saqlandi!" })
    }
    async addPointsClass(req, res) {
        try {
            const { classId, amount, description } = req.body
            const classModel = await ClassModel.findById(classId)
            if (Number(amount) < 0 && classModel.coins < Math.abs(Number(amount)))
                return res.status(400).json({ error: "Sinfning ballari manfiy bo'la olmaydi" })

            classModel.coins += Number(amount)
            await classModel.save()
            const transaction = new TransactionModel({
                amount: Number(amount),
                description,
                buyerModel: "Class",
                buyer: classId
            })
            await transaction.save()
            return res.status(200).json({ msg: "O'zgarishlar saqlandi!" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async addPointsStudents(req, res) {
        try {
            const { userId, amount, description } = req.body
            const user = await User.findById(userId)
            if (Number(amount) < 0 && user.coins < Math.abs(Number(amount)))
                return res.status(400).json({ error: "Foydalanuvchining ballari manfiy bo'la olmaydi" })
            user.coins += Number(amount)
            await user.save()

            const transaction = new TransactionModel({
                amount: Number(amount),
                description,
                buyerModel: "User",
                buyer: userId
            })
            await transaction.save()
            const newData = await ClassModel.findById(user.classId).populate("students")
            return res.status(200).json({ msg: "O'zgarishlar saqlandi!", newData })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
}

module.exports = new AdminController()
