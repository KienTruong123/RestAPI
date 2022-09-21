const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    count: { // The total number of products that have that specific category.
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Category", categorySchema)