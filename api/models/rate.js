const mongoose = require('mongoose')

const rateSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  pair: { type: String, required: true },
  buy: { type: Number, required: true },
  sell: { type: Number, required: true }
})

module.exports = mongoose.model('Rate', rateSchema)
