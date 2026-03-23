const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    fullName: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: function () {
            return this.role === 'student'
        }
    },
    details: {
        phoneNumber: {type: String, default:null},
        tgUserName: {type: String, default:null},
        email: {type: String, default:null}

    },
    coins: {
        type: Number,
        // default: 0,
        required: function () {
            return this.role === 'student'
        }
    },
    role: { type: String, required: true, enum: ['admin', 'student'] },
    status: { type:String, required:false,}  // highest or nothing
    
})

module.exports = model('User', userSchema)
