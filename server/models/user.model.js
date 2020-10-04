const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{type: String},
    email: {type: String, required:true, unique: true, trim: true, lowercase: true}, //match: '/^\S/' 
    password: {type:String, required: true},
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    address: {type: String},
    phone: {type: String, trim: true}, //match: expresión regular solo números y paréntesis
    currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    role: {type: String, enum: ['buyer', 'producer', 'admin'], default: 'buyer'},
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User

