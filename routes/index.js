'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const api = express.Router()
const auth = require('../middlewares/auth')

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', auth, productCtrl.getProduct)
api.post('/product', auth, productCtrl.saveProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)
api.post('/signUp', userCtrl.signUp)
api.post('/signIn', userCtrl.signIn)
api.get('/private', auth, function (req, res) {
  res.status(200).send({ message: `You have access` })
})

module.exports = api