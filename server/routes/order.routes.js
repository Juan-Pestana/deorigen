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
    const owner = req.body.loggedInUser._id
    const productList = req.body.productList.map(elm => { 
        return {product : elm.product._id, quantity : elm.quantity }
    })
    const {subtotal, shipping, total, isClosed} = req.body
    const payment = {cardName : req.body.payment.cardName, cardNumber : req.body.payment.cardNumber}
    const dateString = new Date().toLocaleString('es-ES')

    let newOrderId = ''
    let orderHistory = []
    

    Order.create({owner, productList, subtotal, shipping, total, isClosed, payment, dateString })
        .then(response => newOrderId = response._id)
        .then(()=>User.findById(owner))
        .then(response => orderHistory = !response.orderHistory  ? [newOrderId] : response.orderHistory.unshift(newOrderId))
        .then(()=> User.findByIdAndUpdate(owner,{orderHistory}))
        .then(response => res.json(response))
        .catch(err => console.log('este es el error', err))
})    




    

    // Order.create({owner, productList, subtotal, shipping, total, isClosed, payment, dateString })
    //     // .then(response => User.findByIdAndUpdate(response._id, {orderHistory : [...orderHistory, createdOrder._id]}) )
    //      .then(response => {
             //createdOrder = response
             //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',response.owner, response._id)
        //      User.findByIdAndUpdate(response.owner, {orderHistory : ["5f8355646f8c454d396d641b", ...orderHistory ]})
        //         .then(response => res.json(response))
        //         .catch(err => res.status(500).json(err))
        //  })
      //   .catch(err => res.status(500).json(err))
            // //res.json(response)
            // User.findByIdAndUpdate(response.owner, {orderHistory : [...orderHistory, response._id]})
            // .then(response => res.json(response))
            // .catch(err => res.status(500).json(err))
            // })   

    


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