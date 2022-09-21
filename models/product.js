const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    sold:{
        type: Number,
        default: 0
    },
    size:{
        type: String,
        required: true
    },
    color:{
        type: String,
        trim: true,
        required: true
    },
    content: String,
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
})

module.exports = mongoose.model("Products", productSchema)