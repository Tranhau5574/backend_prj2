const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: Object,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Product', ProductSchema)