const { Schema, model } = require('mongoose')

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: false }
  },
  { timestamps: true }
)

module.exports = model('News', NewsSchema)
