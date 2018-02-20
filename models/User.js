/**
 * Module for the User model.
 *
 * @module models/User.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')
const bluebird = require('bluebird')
const bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'))

const userSchema = mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

// Hashing of password.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { next() }

  const salt = await bcrypt.genSaltAsync(10)
  const hash = await bcrypt.hashAsync(this.password, salt, null)

  this.password = hash

  next()
})

// Compare guessed password to stored password.
userSchema.methods.compare = function (password) {
  return bcrypt.compareAsync(password, this.password)
}

// Exports
module.exports = mongoose.model('User', userSchema)
