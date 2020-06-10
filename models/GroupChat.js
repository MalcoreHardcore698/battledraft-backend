const mongoose = require('mongoose')
const { Schema } = mongoose

const GroupChatSchema = new Schema({
    hub: { type: Schema.Types.ObjectId, ref: 'Hub', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})

module.exports = mongoose.model('GroupChat', GroupChatSchema)