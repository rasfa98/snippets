/**
 * Module for different snippet-filter functions.
 *
 * @module lib/filter.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 /**
  * Extract the tags from a text string.
  *
  * @param {object} req Req object.
  * @returns {string[]} All the tags placed in an array.
  */
 function addTags (req) {
   return req.body.snippetTags.split(',')
   .map(x => x.trim())
 }

 // Exports
 module.exports.addTags = addTags
