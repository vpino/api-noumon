'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true},
  displayName: String,
  avatar: String,
  password: { type: String, select: false},
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

UserSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next()

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods.gravatar = function (size) {
  if (!size) size = 200
  if (!this.email) return `https:/gravatar.com/avatar/?s${size}&d=retro`

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    cb(err, isMatch)
  });
}


module.exports = mongoose.model('User', UserSchema)