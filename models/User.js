/**
 * Module for the User model.
 *
 * @module models/User.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() }
})

const User = mongoose.model('User', userSchema)

// Exports
module.exports = User
