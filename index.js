'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) {
    return console.log(`Error to connect to the database: ${err}`)
  }
  console.log('Conection established to the database...')
    
  app.listen(port, () => {
    console.log(`API REST MONGOJS EXPRESS ${port}`)
  })
})

