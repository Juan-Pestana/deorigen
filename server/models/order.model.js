const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    owner: { //CONEXIÓN DUPLICADA pendiente si se queda en Order History o aquí
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productList: [{
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            } ,
            quantity:{type: Number, min: 0, default: 1}         
    }],
    subtotal: { type: Number, min:0},
    shipping: { type: Number, min:0},
    total: { type: Number, min:0},
    payment:{
        cardName: String,
        cardNumber: Number
    },
    isClosed: Boolean,
    dateString: String,
},{
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order