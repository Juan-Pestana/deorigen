const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')

// Endpoints
router.get('/getAllUsers', (req, res) => {

    User.find()

        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneUser/:user_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User.findById(req.params.user_id,)
        .populate('currentOrder')
        .populate('orderHistory')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/newUser', (req, res, next) => {

    User.create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/:user_id', (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User.findByIdAndUpdate(req.params.user_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router