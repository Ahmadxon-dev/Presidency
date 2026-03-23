const TransactionModel = require("../models/transaction.model")
const UserModel = require("../models/user.model")
const ClassModel = require("../models/class.model")
const MockTestModel = require("../models/mocktest.model")
const FootballCourt = require("../models/footballcourt.model")
const Cybersport = require("../models/cybersportroom.model")
const mongoose = require("mongoose")

class ShopController {
    //all
    async fetchAllActivities(req, res) {
        try {
            // const cybersportData = await Cybersport.find().populate({
            //     path: "registeredUsers",
            //     select: "fullName _id"
            // })
            // const footBallCourtData = await FootballCourt.find().populate("bookedBy")
            // const mockTestsData = await MockTestModel.find().populate({
            //     path: "registeredUsers",
            //     select: "fullName _id"
            // })
            // const result = [ ...cybersportData, ...footBallCourtData, ...mockTestsData ]
            const [cybersportData, footBallCourtData, mockTestsData] = await Promise.all([
                Cybersport.find().populate({ path: "registeredUsers", select: "fullName _id" }).lean(),

                FootballCourt.find().populate({ path: "bookedBy", select: "fullName _id" }).lean(),

                MockTestModel.find().populate({ path: "registeredUsers", select: "fullName _id" }).lean()
            ])

            const result = [
                ...cybersportData.map((x) => ({ ...x, type: "cybersport" })),
                ...footBallCourtData.map((x) => ({ ...x, type: "footballCourt" })),
                ...mockTestsData.map((x) => ({ ...x, type: "mockTest" }))
            ]
            return res.status(200).json(result)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    //cybersport room
    async createCybersportRoom(req, res) {
        try {
            const { date, startTime, endTime, points, spots } = req.body
            if (!date || !startTime || !endTime || !points || !spots)
                return res.status(409).json({ error: "Barcha maydonlarni to'ldiring" })
            const room = new Cybersport({ date, startTime, endTime, points, spots })
            await room.save()
            return res.status(201).json({ msg: "Muvaffaqiyatli yaratildi" })
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }
    }
    async deleteCybersportRoom(req, res) {
        try {
            const { id } = req.params
            await Cybersport.findByIdAndDelete(id)
            return res.status(200).json({ msg: "O'chirildi" })
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }
    }
    async getAllCybersportRoom(req, res) {
        try {
            const data = await Cybersport.find().sort({ _id: -1 }).populate({
                path: "registeredUsers",
                select: "fullName _id"
            })
            return res.status(200).json(data)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async registerUsersToCybersportRoom(req, res) {
        try {
            const { userId, cybersportId } = req.body
            const user = await UserModel.findById(userId)
            const room = await Cybersport.findById(cybersportId)
            if (room.registeredUsers.length == room.spots)
                return res.status(409).json({ error: "Barcha joylar band" })
            if (room.registeredUsers.includes(userId))
                return res.status(409).json({ error: "Siz bu mahsulotni allaqachon xarid qilgansiz" })
            if (user.coins < room.points) return res.status(400).json({ error: "Ball yetarli emas" })
            user.coins -= room.points
            await user.save()
            await Cybersport.findByIdAndUpdate(cybersportId, { $push: { registeredUsers: userId } })
            const transaction = new TransactionModel({
                buyer: user._id,
                buyerModel: "User",
                productModel: "CybersportRoom",
                description: `${user.fullName} ${room.date.toLocaleDateString()} sanasida soat ${room.startTime} dan ${
                    room.endTime
                } gacha kibersport xonasida joy band qildi`,
                amount: room.points
            })
            await transaction.save()
            return res.status(201).json({ msg: "Muvaffaqiyatli sotib olindi" })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
    // footballCourt
    async createFootballcourt(req, res) {
        try {
            const { date, startTime, endTime, points } = req.body
            if (!date || !startTime || !endTime || !points)
                return res.status(409).json({ error: "Barcha maydonlarni to'ldiring" })
            const newCourt = new FootballCourt({ date, startTime, endTime, points })
            await newCourt.save()
            return res.status(201).json({ msg: "Muvaffaqiyatli yaratildi" })
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
    // async editFootballcourt(req, res) {
    //     try {

    //     } catch (err) {
    //         return res.status(400).json({ message: err.message })
    //     }
    // }
    async deleteFootballCourt(req, res) {
        try {
            const { id } = req.params
            await FootballCourt.findByIdAndDelete(id)
            return res.status(200).json({ msg: "O'chirildi" })
        } catch (e) {
            return res.status(404).json({ error: e.message })
        }
    }
    async getAllFootballCourt(req, res) {
        try {
            const data = await FootballCourt.find().sort({ _id: -1 }).populate("bookedBy")
            return res.status(200).json(data)
        } catch (e) {
            return res.status(404).json({ error: e.message })
        }
    }
    async registerClassToFootballcourt(req, res) {
        try {
            const { classId, courtId } = req.body
            const classCurrent = await ClassModel.findById(classId)
            const court = await FootballCourt.findById(courtId)
            if (court.isBooked) return res.status(400).json({ error: "Allaqachon sotib olingan" })
            if (classCurrent.coins < court.points) return res.status(400).json({ error: "Ball yetarli emas" })
            classCurrent.coins -= court.points
            court.isBooked = true
            court.bookedBy = classId
            await court.save()
            await classCurrent.save()
            const transaction = new TransactionModel({
                buyer: classCurrent._id,
                buyerModel: "Class",
                productModel: "FootballCourt",
                description: `${classCurrent.className} sinfi ${court.date.toLocaleDateString()} sanasida soat ${
                    court.startTime
                } dan ${court.endTime} gacha futbol maydonini band qildi`,
                amount: court.points
            })
            await transaction.save()
            return res.status(200).json({ msg: "Muvaffaqiyatli sotib olindi" })
        } catch (e) {
            return res.status(404).json({ error: e.message })
        }
    }

    //MockTest
    async createTest(req, res) {
        try {
            const { date, type, points, room } = req.body
            if (!date || !type || !points || !room) return res.status(404).json({ error: "Barcha maydonlarni to'ldiring" })
            const mockTest = new MockTestModel({ date, type, points, room,  registeredUsers: [] })
            await mockTest.save()
            return res.status(201).json({ msg: "Mock muvaffaqiyatli yaratildi" })
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }
    async editTest(req, res) {
        try {
            const { id } = req.params
            const updatedMockTest = await MockTestModel.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            })

            if (!updatedMockTest) {
                return res.status(404).json({ error: "Mock topilmadi" })
            }

            return res.status(200).json({ msg: "Mock mufavvaqiyatli o'zgartirildi", newData: updatedMockTest })
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }
    async deleteTest(req, res) {
        try {
            const { id } = req.params
            await MockTestModel.findByIdAndDelete(id)

            return res.status(200).json({ msg: "O'chirildi" })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
    async getAllTests(req, res) {
        try {
            const mockTests = await MockTestModel.find().sort({ _id: -1 }).populate({
                path: "registeredUsers",
                select: "fullName _id"
            })
            return res.status(200).json(mockTests)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
    async getsingleTest(req, res) {
        try {
            const { id } = req.params
            const mockTest = await MockTestModel.findById(id)

            if (!mockTest) {
                return res.status(404).json({ error: "Mock topilmadi" })
            }

            return res.status(200).json(mockTest)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
    async registerUserToMockTest(req, res) {
        try {
            const { userId, mockId } = req.body
            const user = await UserModel.findById(userId)
            const testCurrent = await MockTestModel.findById(mockId)
            if (testCurrent.registeredUsers.includes(userId))
                return res.status(400).json({ error: "Siz allaqachon ushbu mockni sotib olgansiz" })
            if (user.coins < testCurrent.points) return res.status(400).json({ error: "Ball yetarli emas" })
            user.coins -= testCurrent.points
            await user.save()
            await MockTestModel.findByIdAndUpdate(mockId, { $push: { registeredUsers: userId } })
            const transaction = new TransactionModel({
                buyer: user._id,
                buyerModel: "User",
                productModel: "MockTest",
                description: `${
                    user.fullName
                } ${testCurrent.date.toLocaleDateString()} sanasida ${testCurrent.type.toUpperCase()} sinov imtihoniga ro'yxatdan o'tdi`,
                amount: testCurrent.points
            })
            await transaction.save()

            return res.status(200).json({ msg: "Muvaffaqiyatli sotib olindi" })
        } catch (e) {
            return res.status(404).json({ error: e.message })
        }
    }
    // async buyProductsForStudent(req, res) {
    //     try {
    //         const { productId, userId } = req.body
    //         const product = await ProductModel.findById(productId)
    //         const user = await UserModel.findById(userId)
    //         if(user.coins < product.points) return res.status(400).json({error: "Mablag' yetarli emas"})
    //         user.coins -= product.points
    //         await user.save()
    //         const newTransaction = new TransactionModel({ productId, amount:product.points, buyer: userId, buyerModel:"User", description:`Buying ${product.name}`})
    //         await newTransaction.save()
    //         const newData = await TransactionModel.find({buyer:userId}).populate("productId buyer")
    //         return res.status(200).json({ msg: 'Muvaffaqiyatli sotib olindi', newData })
    //     } catch (e) {
    //         return res.status(400).json({ error: e.message })
    //     }
    // }
    // async buyProductsForClass(req, res) {
    //     try {
    //         const { productId, classId } = req.body
    //         const product = await ProductModel.findById(productId)
    //         const user = await ClassModel.findById(classId)
    //         if(user.coins < product.points) return res.status(400).json({error: "Mablag' yetarli emas"})
    //         user.coins -= product.points
    //         await user.save()
    //         const newTransaction = new TransactionModel({ productId, amount:product.points, buyer: classId, buyerModel:"Class", description:`Buying ${product.name}` })
    //         await newTransaction.save()
    //         const newData = await TransactionModel.find({buyer: classId}).populate("productId buyer")
    //         return res.status(200).json({ msg: 'Muvaffaqiyatli sotib olindi' , newData })
    //     } catch (e) {
    //         return res.status(400).json({ error: e.message })
    //     }
    // }
    async transferToClass(req, res) {
        const session = await mongoose.startSession()
        try {
            session.startTransaction()
            const { userId, amount } = req.body
            const user = await UserModel.findById(userId).session(session)

            const classData = await ClassModel.findOne({ students: userId }).session(session)
            const classId = classData._id
            if (user.coins <= 0 || user.coins < amount) return res.status(409).json({ error: "Insufficient points" })
            const newTransaction = new TransactionModel({
                sender: userId,
                senderModel: "User",
                buyer: classId,
                buyerModel: "Class",
                amount: amount,
                description: `${user.fullName} ${classData.className} sinfiga ball o'tkazdi`
            })
            classData.coins += Number(amount)
            user.coins -= Number(amount)
            await classData.save()
            await user.save()
            await newTransaction.save({ session })
            await session.commitTransaction()
            session.endSession()
            return res.status(200).json({ msg: "Muvaffaqiyatli o'tkazildi" })
        } catch (e) {
            await session.abortTransaction()
            session.endSession()
            return res.status(400).json({ error: e.message })
        }
    }
}

module.exports = new ShopController()
