const { Schema, model } = require('mongoose')
const RequestSchema = new Schema(
    {
        type: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, refPath:'userModel', required: true },
        userModel: { type: String, enum: ['User', 'Class'] },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        points: { type: Number || String, required: true },
        details: {
            type: Object,
            default: {}
        }
    },
    { timestamps: true }
)

module.exports = model('Request', RequestSchema)
