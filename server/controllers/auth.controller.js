const User = require("../models/user.model")
const ClassModel = require("../models/class.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
class AuthController {
    async registerUser(req, res) {
        try {
            const { fullName, login, password, classId, phoneNumber, tgUserName, email } = req.body
            if (!fullName || !login || !password) return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
            const isUserExist = await User.findOne({ login })
            const classDoc = await ClassModel.findById(classId)
            if (classDoc.numberOfStudents === classDoc.students.length)
                return res.status(400).json({ error: "Sinfga qo'shish mumkin bo'lgan o'quvchilar soni cheklangan" })
            if (isUserExist) return res.status(409).json({ error: "Bunday loginli foydalanuvchi allaqachon ro'yxatdan o'tgan" })
            const hashedPass = await bcrypt.hash(password, 10)
            const newUser = new User({
                fullName,
                login,
                password: hashedPass,
                role: "student",
                coins: 0,
                classId,
                details: {
                    phoneNumber,
                    tgUserName,
                    email
                }
            })
            await newUser.save()
            // oquvchini sinfga qoshish
            // await ClassModel.findByIdAndUpdate(classId, { $push: { students: newUser._id } })
            classDoc.students.push(newUser._id)
            await classDoc.save()
            const newData = await ClassModel.findById(classId).populate("students")
            return res.status(200).json({ msg: `O'quvchi qo'shildi`, newData: newData })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async deleteUser(req, res) {
        try {
            const { studentId, classId } = req.params
            await User.findByIdAndDelete(studentId)
            const newData = await ClassModel.findByIdAndUpdate(
                classId,
                { $pull: { students: studentId } },
                { new: true }
            ).populate("students")
            return res.status(200).json({ msg: "O'quvchi o'chirildi", newData })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async editUserFullName(req, res) {
        try {
            const { newfullName, newLogin, studentId, classId } = req.body
            await User.findByIdAndUpdate(studentId, { fullName: newfullName, login: newLogin })
            const currentClass = await ClassModel.findById(classId).populate("students")
            const newData = currentClass.students
            return res.status(200).json({ msg: "O'zgartirildi", newData })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async editUserPassword(req, res) {
        try {
            const { studentId, newPassword, oldPassword } = req.body
            const user = await User.findById(studentId)
            if (!user) {
                return res.status(404).json({ error: "Foydalanuvchi topilmadi" })
            }
            const checkPass = bcrypt.compareSync(oldPassword, user.password)
            if (!checkPass) return res.status(409).json({ error: "Kiritilgan parol joriy parolga mos kelmadi" })
            const hashNewPass = bcrypt.hashSync(newPassword, 10)
            user.password = hashNewPass
            await user.save()
            return res.status(200).json({ msg: "O'zgartirildi" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async editClassPassword(req, res) {
        try {
            const { classId, newPassword, oldPassword } = req.body
            const classCurrent = await ClassModel.findById(classId)
            if (!classCurrent) {
                return res.status(404).json({ error: "Sinf topilmadi" })
            }
            const checkPass = bcrypt.compareSync(oldPassword, classCurrent.password)
            if (!checkPass) return res.status(409).json({ error: "Kiritilgan parol joriy parolga mos kelmaydi" })
            const hashNewPass = bcrypt.hashSync(newPassword, 10)
            classCurrent.password = hashNewPass
            await classCurrent.save()
            return res.status(200).json({ msg: "O'zgartirildi" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async setUserPasswordCustom(req, res) {
        try {
            const { studentId, newPassword } = req.body
            const hashPass = bcrypt.hashSync(newPassword, 10)
            await User.findByIdAndUpdate(studentId, { password: hashPass })
            return res.status(200).json({ msg: "O'zgartirildi" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async registerAdmin(req, res) {
        const { fullName, login, password } = req.body
        if (!fullName || !login || !password) return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
        const isUserExist = await User.findOne({ login })
        if (isUserExist) return res.status(409).json({ error: "Foydalanuvchi allaqachon ro'yxatdan o'tgan" })
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = new User({ fullName, login, password: hashedPass, role: "admin" })
        await newUser.save()
        return res.status(200).json({ msg: `Admin muvaffaqiyatli yaratildi` })
    }
    async signIn(req, res) {
        try {
            const { login, password } = req.body
            if (!login || !password) return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
            let account = await User.findOne({ login })
            let roleType
            if (account) {
                roleType = account.role
            } else {
                account = await ClassModel.findOne({ login })
                if (account) roleType = "class"
            }

            if (!account) {
                return res.status(404).json({ error: "Foydalanuvchi topilmadi" })
            }
            const compare = bcrypt.compareSync(password, account.password)
            if (!compare) return res.status(409).json({ error: "Login yoki parol xato" })

            let token

            let sendData = {}
            if (roleType === "class") {
                sendData = {
                    name: account.className,
                    login: account.login,
                    coins: account.coins,
                    role: "class",
                    id: account._id
                }
                token = jwt.sign(
                    { id: account._id, role: "class", name: account.className, login: account.login },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                )
            } else if (roleType === "student") {
                sendData = {
                    name: account.fullName,
                    login: account.login,
                    classId: account.classId,
                    coins: account.coins,
                    role: account.role,
                    id: account._id,
                    phoneNumber: account.details.phoneNumber,
                    tgUserName: account.details.tgUserName,
                    email: account.details.email
                }
                token = jwt.sign(
                    {
                        id: account._id,
                        role: "student",
                        classId: account.classId,
                        name: account.fullName,
                        login: account.login,
                        phoneNumber: account.details.phoneNumber,
                        tgUserName: account.details.tgUserName,
                        email: account.details.email
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                )
            } else if (roleType === "admin") {
                sendData = {
                    name: account.fullName,
                    login: account.login,
                    role: account.role,
                    id: account._id
                }
                token = jwt.sign(
                    { id: account._id, role: "admin", name: account.fullName, login: account.login },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                )
            }
            return res.status(200).json({ msg: "Kirish muvaffaqiyatli", token, user: sendData })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
    async getStudents(req, res) {
        const students = await User.find({ role: "student" })
        return res.status(200).json({ students })
    }
    async getAllUsers(req, res) {
        const users = await User.find()
        return res.status(200).json({ users })
    }
    async editUserForAdmin(req, res) {
        try {
            const { fullName, login, password, studentId, classId, phoneNumber, tgUserName, email } = req.body
            const hashPass = bcrypt.hashSync(password, 10)
            if (login === login.trim()) {
                const doesOtherUserUsesLogin = await User.findOne({ login: login, _id: { $ne: studentId } })
                if (doesOtherUserUsesLogin) {
                    return res.status(409).json({ error: "Bu login band" })
                }
            }
            await User.findByIdAndUpdate(studentId, {
                fullName,
                login,
                password: hashPass,
                details: { phoneNumber, tgUserName, email }
            })
            const newData = await ClassModel.findById(classId).populate("students")
            return res.status(200).json({ msg: "O'zgartirildi", newData })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async getProfile(req, res) {
        return res.json({
            msg: "Profile fetched successfully",
            user: req.user
        })
    }
    async getUserCoins(req, res) {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            const classCurrent = await ClassModel.findById(id)
            return res.status(200).json({ coins: classCurrent.coins })
        }
        return res.status(200).json({ coins: user.coins })
    }
    async getAdmins(req, res) {
        try {
            const admins = await User.find({ role: "admin", status: { $ne: "highest" } })
            return res.status(200).json(admins)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async deleteAdmin(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json({ msg: "Admin o'chirildi" })
        } catch (e) {
            return res.status(500).json({ e: e.message })
        }
    }
    async editAdmin(req, res) {
        try {
            const { fullName, login, password, userId } = req.body
            const user = await User.findById(userId)
            if (login === login.trim()) {
                if (user.login !== login) {
                    const doesOtherUserUsesLogin = await User.findOne({ login: login, _id: { $ne: userId } })
                    if (doesOtherUserUsesLogin) {
                        return res.status(409).json({ error: "Bu login band" })
                    }
                }
            } else {
                return res.status(409).json({ error: "Login faqat harf va raqamlardan iborat bo'lishi kerak (bo'sh joysiz)." })
            }

            const hashed = await bcrypt.hash(password, 10)
            await User.findByIdAndUpdate(userId, { fullName, login, password: hashed })

            return res.status(200).json({ msg: "O'zgartirildi" })
        } catch (e) {
            return res.status(500).json({ e: e.message })
        }
    }
}

module.exports = new AuthController()
