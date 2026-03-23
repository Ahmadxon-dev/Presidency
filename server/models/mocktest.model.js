const { Schema, model} = require("mongoose")

const MockTestSchema = new Schema({
  name: { type: String },  // e.g. "Mock IELTS"
  date: { type: Date, required: true },    // specific day chosen
  points: {type: Number, required:true},
  room: {type: String, required:true},
  type: {type:String, required:true, enum: ["ielts", "sat"]},
  registeredUsers:[{type: Schema.Types.ObjectId, ref:"User"}],
});

MockTestSchema.pre('save', function(next) {
  if (this.type === "ielts") {
    // this.points = 20;
    this.name = "IELTS Mock"
  } else if (this.type === "sat") {
    // this.points = 50;
    this.name="SAT Mock"
  }
  next();
});

module.exports = model("MockTest", MockTestSchema);