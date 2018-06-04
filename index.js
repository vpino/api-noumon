'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error to connect to the database: ${err}`)
  }
  console.log('Conection established to the database...')
    
  app.listen(config.port, () => {
    console.log(`API REST MONGOJS EXPRESS ${config.port}`)
  })
})

