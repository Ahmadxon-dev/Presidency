const { model, Schema } = require('mongoose')

const TransactionSchema = new Schema(
    {
        sender: { type: Schema.Types.ObjectId, refPath: 'senderModel' },
        senderModel: { type: String, enum: ['User', 'Class'] },
        buyer: {
            type: Schema.Types.ObjectId,
            //  required:true,
            refPath: 'buyerModel'
        },
        buyerModel: {
            type: String,
            // required:true,
            enum: ['User', 'Class']
        },
        productId: { type: Schema.Types.ObjectId, refPath: 'productModel' },
        productModel: { type: String, enum: ['MockTest', 'CybersportRoom', 'FootballCourt'] },
        description: { type: String, required: true },
        amount: { type: Number }
    },
    { timestamps: true }
)

module.exports = model('Transaction', TransactionSchema)
