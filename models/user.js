const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        index: true,
        unique: true,
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'],
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
        type: String,
        index: true,
        // unique: true,
        match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'Enter a valid phone number']
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)