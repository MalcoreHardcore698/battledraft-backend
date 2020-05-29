const mongoose = require('mongoose')
const { Schema } = mongoose

const Message = require('./Message')

const Chat = new Schema({
    type: {
        type: String,
        enum: ['PERSONAL', 'GROUP']
    },
    messages: [Message]
})

module.exports = Chat