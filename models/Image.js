const mongoose = require('mongoose')
 
const ImageSchema = mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    category:  {
        type: String,
        enum: ['ICON', 'POSTER'],
        required: true
    }
})
 
module.exports = mongoose.model('Image', ImageSchema)