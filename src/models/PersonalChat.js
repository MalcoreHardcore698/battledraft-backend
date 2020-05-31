const mongoose = require('mongoose')
const { Schema } = mongoose

const PersonalChatSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})

module.exports = mongoose.model('PersonalChat', PersonalChatSchema)