const mongoose = require('mongoose')
const { Schema } = mongoose

const UserChatSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    status: {
        type: String,
        enum: ['OPEN', 'CLOSE'],
        required: true
    }
})

module.exports = mongoose.model('UserChat', UserChatSchema)