'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error when making the request ${err}`})
    if (!products) return res.status(404).send({ message: `Products dont exist`})

    res.status(200).send({ products })
  })
})

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error when making the request ${err}`})
    if (!product) return res.status(404).send({ message: `Product dont exist`})

    res.status(200).send({ product: product })
  })
})

app.post('/api/product', (req, res) => {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error in save the object: ${err}` })
    
    res.status(200).send({product: productStored})
  })
})

app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/product/:productId', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) {
    return console.log(`Error to connect to the database: ${err}`)
  }
  console.log('Conection established to the database...')
    
  app.listen(port, () => {
    console.log(`API REST MONGOJS EXPRESS ${port}`)
  })
})

