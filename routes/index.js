'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const api = express.Router()
const auth = require('../middlewares/auth')

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.get('/private', auth.isAuth, function (req, res) {
  res.status(200).send({ message: `You have access` })
})

module.exports = api