const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    storeName:{
        type: String,
        // required: true,
        // unique: true,
        // trim: true,
        // lowercase: true,
        default: ''
    },
    tagline:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,

        trim: true,
    },
    heroPicUrl:{
        type: String,
        default: "",
    },
    contentPicUrl:{
        type: String,
        default: "",
    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    address: {
        type: String
    },
    owner: { //CONEXIÓN ONE TO ONE pendiente si se integra en user o no
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
        // default: '5f7a11277e7e71bce28a29ca'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
    //Pendiente de si se crea array de productos dentro de tienda o se referencia 

}, {
    timestamps: true
})

const Store = mongoose.model('Store', storeSchema)
module.exports = Store