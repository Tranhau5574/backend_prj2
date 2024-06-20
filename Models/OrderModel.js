const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    
    infor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }],
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    priceOrder: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    }
}, {timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema)