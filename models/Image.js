const mongoose = require('mongoose')
 
const ImageSchema = mongoose.Schema({
    path: String,
    filename: String,
    mimetype: String
})
 
module.exports = mongoose.model('Image', ImageSchema)