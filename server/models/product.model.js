const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    
    store: { //CONEXIÓN DUPLICADA pendiente si se queda en Product List de Store o aquí
        type: Schema.Types.ObjectId,
        rel: 'Store'
    },
    productName:{
        type: String,
        required: true,
        // unique: true,
        trim: true,
        lowercase: true,

    },
    format: {
        type: String,
        // required: true,
        trim: true,
        lowercase:true,

    },
    price: {
        type: Number,
        required:true,
    },
    category: {
        type: String,
        enum: ['meat', `fish`, 'dairy', 'wine', 'veggies'],
        required: true

    },
    productPicUrl:{
        type: String,
        default: "",
    },
    seasonal: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0
    }


}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product