const mongoose = require('mongoose')
const { Schema } = mongoose

const Offer = require('./Offer')
const Chat = require('./Chat')

const User = new Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
    role: {
        type: String,
        enum: ['ADMINISTRATOR', 'MODERATOR', 'USER']
    },
    offers: [Offer],
    chats: [Chat]
})

module.exports = User