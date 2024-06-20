const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        trim: true,
        unique: true
    },
    password: {
        type: String, 
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }],
    role: {
        type: Number,
        required: true, 
        default: 0,
    }

})

module.exports = mongoose.model('User', UserSchema);