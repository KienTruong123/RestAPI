const mongoose = require('mongoose')
const { Schema } = mongoose;

const phoneSchema = new Schema({
    index: true,
    unique: true,
    type: String,
    match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'Enter a valid phone number']
})

const emailSchema = new Schema({
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'],
    required: true,
    unique: true
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: [emailSchema]
    },
    role: {
        type: Number,
        default: 0
    },
    birthDate: Date,
    cart: {
        type: Array,
        default: []
    },
    phone: { 
        type: [phoneSchema]
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)