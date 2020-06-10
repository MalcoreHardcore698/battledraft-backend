const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ['ADMINISTRATOR', 'MODERATOR', 'USER'],
        required: true
    },
    avatar: { type: String },
    level: { type: Number },
    experience: { type: Number },
    balance: { type: Number },
    offers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
    preferences: [{ type: Schema.Types.ObjectId, ref: 'Hub' }],
    payment: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    dateLastAuth: { type: Date, required: true },
    dateRegistration: { type: Date, required: true },
    isVerifiedEmail: { type: Boolean },
    isVerifiedPhone: { type: Boolean },
    isNotified: { type: Boolean }
})

module.exports = mongoose.model('User', UserSchema)