/**
 * Module for the Snippet model.
 *
 * @module models/Snippet.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

const snippetSchema = mongoose.Schema({
  title: { type: String, required: '"{PATH}" is required!', trim: true },
  body: { type: String, required: '"{PATH}" is required!', trim: true },
  createdBy: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
  tags: [String]
})

// Exports
module.exports = mongoose.model('Snippet', snippetSchema)
