const TransactionModel = require('../models/transaction.model')
class TransactionController {
    async getAllTransactions(req, res) {
        try {
            const data = await TransactionModel.find().sort({ _id: -1 }).populate("buyer sender")
            return res.status(200).json(data)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
    async deleteAllTransactions(req,res){
        try{
            await TransactionModel.collection.drop()
            return res.status(200).json({msg: "Barcha tranzaksiyalar o'chirildi"})
        }
        catch(e){
            return res.status(500).json({error: e.message})
        }
    }
}

module.exports = new TransactionController()