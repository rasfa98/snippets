/**
 * Module for different snippet-filter functions.
 *
 * @module lib/filter.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 /**
  * Extracts the tags from a text string.
  *
  * @param {object} req Req object.
  * @returns {string[]} An array containing all the tags.
  */
 function addTags (req) {
   let tags = req.body.snippetTags.split(',')
   .map(x => x.trim())

   if (tags[0] === '') { tags = undefined }

   return tags
 }

 // Exports
 module.exports.addTags = addTags
