const mongoose = require('mongoose')
const { Schema } = mongoose

const Message = new Schema({
    message: String
})

module.exports = Message