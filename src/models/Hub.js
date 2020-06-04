const mongoose = require('mongoose')
const { Schema } = mongoose

const HubSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    slogan: { type: String, required: true },
    icon: { type: String, required: true },
    poster: { type: String, required: true },
    color: { type: String, required: true },
    countUsers: { type: Number },
    countOffers: { type: Number },
    status: { type: String, required: true },
    dateEdited: { type: String },
    datePublished: { type: String },
    dateCreated: { type: String, required: true }
})

module.exports = mongoose.model('Hub', HubSchema)