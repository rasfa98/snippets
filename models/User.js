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
  Password: { type: String, required: true, unique: true }
})

const User = mongoose.model('User', userSchema)

// Exports
module.exports = User
