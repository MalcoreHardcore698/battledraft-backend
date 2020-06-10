const mongoose = require('mongoose')
const { Schema } = mongoose

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true }
})

module.exports = mongoose.model('Message', MessageSchema)