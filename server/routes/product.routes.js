const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product.model')

//Endpoints

router.get('/getAllProducts', (req, res) => {

    Product.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getProductsFromStore/:store_id', (req,res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.store_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Product.find({store : req.params.store_id})
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})


router.get('/getOneProduct/:product_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.product_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Product.findById(req.params.product_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newProduct', (req, res) => {

    Product.create(req.body)
        .then(response => res.json(response)) //pendiente añadir push a array de productos dentro de store o user.store
        .catch(err => res.status(500).json(err))
})

router.put('/editProduct/:product_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.product_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Product.findByIdAndUpdate(req.params.product_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteProduct/:product_id', (req, res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.product_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Product.findByIdAndRemove(req.params.product_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router