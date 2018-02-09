/**
 * Module for the create routes.
 *
 * @module routes/create.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 const router = require('express').Router()
 const Snippet = require('../models/Snippet')

 router.route('/snippet/create')
     .get((req, res) => res.render('create'))
     .post((req, res) => {
       const snippet = new Snippet({
         title: req.body.snippetTitle,
         body: req.body.snippetBody
       })

       snippet.save()
       .then(res.redirect('/'))
     })

 // Exports
 module.exports = router
