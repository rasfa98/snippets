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
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdBy: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
  tags: [String]
})

const Snippet = mongoose.model('Snippet', snippetSchema)

// Exports
module.exports = Snippet
