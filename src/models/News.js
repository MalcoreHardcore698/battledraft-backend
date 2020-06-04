const mongoose = require('mongoose')
const { Schema } = mongoose

const NewsSchema = new Schema({
    hub: { type: Schema.Types.ObjectId, ref: 'Hub', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true },
    source: { type: String },
    url: { type: String },
    status: { type: String, required: true },
    dateEdited: { type: String },
    datePublished: { type: String },
    dateCreated: { type: String, required: true }
})

module.exports = mongoose.model('News', NewsSchema)