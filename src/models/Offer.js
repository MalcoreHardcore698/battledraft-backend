const mongoose = require('mongoose')
const { Schema } = mongoose

const Offer = new Schema({
    message: String
})

module.exports = Offer