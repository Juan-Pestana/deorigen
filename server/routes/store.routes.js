const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')

const Store = require ('../models/store.model')
const Product = require ('../models/product.model')

//Endpoints

router.get('/getAllStores', (req, res) => {

    Store.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getLast3Stores', (req, res) => {

    Store.find().sort({created_At : -1}).limit(3)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneStore/:store_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.store_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Store.findById(req.params.store_id)
        // .populate('owner')
        .populate('products')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newStore', (req, res) => {

    Store.create(req.body)
        .then(response => res.json(response)) //pendiente añadir push a array de productos dentro de store o user.store
        .catch(err => res.status(500).json(err))
})


router.put('/editStore/:store_id', (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.store_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Store.findByIdAndUpdate(req.params.store_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteStore/:store_id', (req, res) => {
 
    if (!mongoose.Types.ObjectId.isValid(req.params.store_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Store.findByIdAndRemove(req.params.store_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router