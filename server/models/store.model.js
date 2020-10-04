const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    storeName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    tagline:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    description:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

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
        rel: 'User'
    },
    // Pendiente de si se crea array de productos dentro de tienda o se referencia 

}, {
    timestamps: true
})

const Store = mongoose.model('Store', storeSchema)
module.exports = Store