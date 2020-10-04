const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    total: { type: Number, min:0},
    isClosed: Boolean,
    dateString: String,
},{
    timerstamps: true
})

const Order = mongoose.model("Order", userSchema)

module.exports = Order