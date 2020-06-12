const mongoose = require('mongoose')
const { Schema } = mongoose

const HubSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    slogan: { type: String, required: true },
    icon: { type: Schema.Types.ObjectId, ref: 'Image' },
    poster: { type: Schema.Types.ObjectId, ref: 'Image' },
    color: { type: String, required: true },
    offers: { type: Schema.Types.ObjectId, ref: 'Offer' },
    countUsers: { type: Number },
    countOffers: { type: Number },
    status:  {
        type: String,
        enum: ['MODERATION', 'PUBLISHED'],
        required: true
    },
    dateEdited: { type: String },
    datePublished: { type: String },
    dateCreated: { type: String, required: true }
})

module.exports = mongoose.model('Hub', HubSchema)