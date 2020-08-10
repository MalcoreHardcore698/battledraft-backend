const mongoose = require('mongoose')
const { Schema } = mongoose

const ChatSchema = new Schema({
    title: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message', required: true}],
    dateCreated: { type: Date, required: true },
    owner: { type: Schema.Types.ObjectId, refPath: 'onOwner', required: true },
    onOwner: {
        type: String,
        enum: ['User', 'Hub']
    }
})

module.exports = mongoose.model('Chat', ChatSchema)