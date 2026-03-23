const { Schema, model } = require('mongoose')

const ClassSchema = new Schema({
    className: { type: String, required: true },
    login: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    coins: { type: Number, default: 0 },
    numberOfStudents: {type: Number, required: true},
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }]

})

module.exports = model('Class', ClassSchema)
