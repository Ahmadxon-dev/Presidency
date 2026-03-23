const ClassModel = require("../models/class.model")
const bcrypt = require("bcryptjs")
const UserModel = require("../models/user.model")
class ClassController {
    // admin creates class
    async createClass(req, res) {
        const { className, login, password, numberOfStudents } = req.body
        if (!className || !login || !password || !numberOfStudents) return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
        const classExist = await ClassModel.findOne({ login })
        if (classExist) return res.status(400).json({ error: "Bu login allaqachon ishlatilmoqda" })
        const hashedPass = bcrypt.hashSync(password, 10)
        const newClass = new ClassModel({ className, login, password: hashedPass, coins: 0, students: [], numberOfStudents })
        await newClass.save()
        return res.status(201).json({ msg: "Sinf muvaffaqiyatli yaratildi!" })
    }
    async removeClass(req, res) {
        const { id } = req.params
        const classData = await ClassModel.findById(id)
        await UserModel.deleteMany({ _id: { $in: classData.students }})
        await ClassModel.findByIdAndDelete(id)
        return res.status(200).json({ msg: "Sinf o'chirildi va sinfdagi o'quvchilar o'chirildi" })
    }
    async editClass(req, res) {
        try {
            const { className, newLogin, classId, newPassword, numberOfStudents } = req.body
            if (!className || !newLogin || !newPassword || !numberOfStudents) return res.status(409).json({ error: "Barcha maydonlarni to'ldiring" })
            const hashedPass = bcrypt.hashSync(newPassword, 10)
            await ClassModel.findByIdAndUpdate(classId, { className, login: newLogin, password: hashedPass, numberOfStudents }, { new: true })
            return res.status(200).json({ msg: "Sinf o'zgartirildi" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async getClasses(req, res) {
        const classes = await ClassModel.find().populate("students")
        return res.status(200).json(classes)
    }
    async getOneClass(req, res) {
        try {
            const { id } = req.params
            const classCurrent = await ClassModel.findById(id).populate("students")
            if (!classCurrent) return res.status(404).json({ error: "Sinf topilmadi" })
            return res.status(200).json(classCurrent)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
}

module.exports = new ClassController()
