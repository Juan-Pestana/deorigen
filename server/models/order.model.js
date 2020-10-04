const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    owner: { //CONEXIÓN DUPLICADA pendiente si se queda en Order History o aquí
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productList: [{
        productItem: {  
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            } ,
            quantity:{type: Number, min: 0, default: 1}
        }      
    }],
    total: { type: Number, min:0},
    isClosed: Boolean,
    dateString: String,
},{
    timerstamps: true
})

const Order = mongoose.model("Order", userSchema)

module.exports = Order