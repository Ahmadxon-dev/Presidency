const { Schema, model } = require("mongoose")


const CybersportRoomSchema = new Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // "15:15"
  endTime: { type: String, required: true }, // "15:45"
  points:{type: Number, default: 20},
  spots:{type: Number, required:true},
  registeredUsers: [{type:Schema.Types.ObjectId, ref:"User", default:()=> [] }]
});

const CybersportRoom = model("CybersportRoom", CybersportRoomSchema);
module.exports = CybersportRoom;