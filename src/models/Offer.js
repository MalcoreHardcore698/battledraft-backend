const mongoose = require('mongoose')
const { Schema } = mongoose

const OfferSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hub: { type: Schema.Types.ObjectId, ref: 'Hub', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true },
    dateEdited: { type: String },
    datePublished: { type: String },
    dateCreated: { type: String, required: true }
})

module.exports = mongoose.model('Offer', OfferSchema)