const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../models/order.model')
const User = require('../models/user.model')


// Endpoints
router.get('/getAllOrders', (req, res) => {

    Order.find()
        // .populate('productList')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOrdersFromUser/:userId', (req, res) => {
    Order.find({owner : req.params.userId})
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
    const owner = req.body.loggedInUser
    console.log(req.body.loggedInUser)
    const productList = req.body.productList.map(elm => { 
        return {product : elm.product._id, quantity : elm.quantity }
    })
    const {subtotal, shipping, total, isClosed} = req.body
    const payment = {cardName : req.body.payment.cardName, cardNumber : req.body.payment.cardNumber}
    const dateString = new Date().toLocaleString('es-ES')

    let newOrderId = ''
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&',owner._id, productList, subtotal, shipping, total, isClosed, payment, dateString )
    Order.create({owner: owner._id, productList, subtotal, shipping, total, isClosed, payment, dateString })
        .then(response => {
            console.log('*************************************************************************',response)
            newOrderId = response._id.toHexString()
            owner.orderHistory.unshift(newOrderId)
        })
        .then(() => User.findByIdAndUpdate(owner._id, owner, {new:true}))
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
    Math.random() > 0.1 ? res.json({paymentOk: true}) : res.status(400).json("Payment Rejected")
    

})


module.exports = router