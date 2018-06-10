'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.avatar = user.gravatar();

  user.save( (err) => {
    if (err) res.status(500).send({ message: `Error to create the user: ${err}`})
    
    return res.status(200).send({ token: service.createToken(user) })
  })
}

const signIn = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err})
    if (!user) return res.status(404).send({ message: `Don't exist the user`})

    return user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ message: err})
      if (!isMatch) return res.status(404).send({ message: `Invalid password` })

      req.user = user
      
      res.status(200).send({
        message: 'Login successful',
        token: service.createToken(user)
      })

    });

  }).select('_id email +password');
}


module.exports = {
  signUp,
  signIn
}