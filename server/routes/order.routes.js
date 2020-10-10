const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../models/order.model')



// Endpoints
router.get('/getAllOrders', (req, res) => {

    Order.find()
        // .populate('productList')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneOrder/:order_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.order_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Order.findById(req.params.order_id)
        .populate('productList')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/newOrder', (req, res) => {

    Order.create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editOrder/:order_id', (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.order_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Order.findByIdAndUpdate(req.params.order_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getShippingExpenses', (req, res) => res.json({ shipping: 7 }))

router.post('/checkPayment', (req,res) => {
    const paymentOk = Math.random() > 0.1 ? true : false
    res.json({paymentOk})

})


module.exports = router