const { Schema, model } = require('mongoose')

const FootballCourtSchema = new Schema({
    date: { type: Date, required: true }, // actual day
    startTime: { type: String, required: true }, // "15:15"
    endTime: { type: String, required: true }, // "15:45"
    points: { type: Number, required:true},
    isBooked: { type: Boolean, default: false },
    bookedBy: { type: Schema.Types.ObjectId, ref: 'Class', default: null }
})

const FootballCourt = model('FootballCourt', FootballCourtSchema)
module.exports = FootballCourt
