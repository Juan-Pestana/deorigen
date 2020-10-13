const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')

const Store = require ('../models/store.model')
const Product = require ('../models/product.model')
const User = require ('../models/user.model')
// const { default: UserService } = require('../../client/src/services/user.services')

//Endpoints

router.get('/getAllStores', (req, res) => {

    Store.find()
        .populate('owner')
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

router.post('/newStore/:user_id', (req, res) => {
    
    let newStoreId = ''
    let storeUser = {}

    Store.create(req.body)
        .then(response => newStoreId = response._id)
        .then(()=>User.findById(req.params.user_id))
        .then(user=> storeUser = user)
        .then(()=> {
            storeUser.store = newStoreId
            storeUser.role = "producer"})
        .then(()=> User.findByIdAndUpdate(req.params.user_id, storeUser))
        .then(response => res.json(response))
        .catch(err => console.log('este es el error', err))

        // .catch(err => res.status(500).json(err))
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
    let ownerID = ''
    let updOwner ={}

    Store.findById(req.params.store_id)
    .then(store => ownerID = store.owner)
    .then(()=> User.findById(ownerID))
    .then(owner => updOwner = owner)
    .then(()=> {updOwner.role = 'buyer'
                updOwner.store = null
                console.log(updOwner.store)})
    .then(()=>User.findByIdAndUpdate(ownerID, updOwner))
    .then(()=> Product.updateMany({store : req.params.store_id},{active : false}))

    .then(()=>Store.findByIdAndDelete(req.params.store_id))
    .then(response =>{
        console.log('tienda eliminada')
        res.json(response)

    } )
    .catch(err => console.log('este es el error', err))

    
        
        
})

module.exports = router