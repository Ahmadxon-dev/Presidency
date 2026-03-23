const { Schema, model } = require('mongoose')

const EventSchema = new Schema({
  eventName: { type: String, required: true },
  registeredUsers: [{ type: Schema.Types.ObjectId, refPath: 'userModel' }],
  eventDate: { type: Date, required: true },
  userModel: {type: String, required:true, enum:["User", "Class"]},
  type: {type:String, required:true, enum:["Student","Class"]},
  description: { type: String, required: true },
  img: { type: String, required: false }
})

module.exports = model('Event', EventSchema)
