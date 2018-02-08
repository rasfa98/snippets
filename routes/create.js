/**
 * Module for the create routes.
 *
 * @module routes/create.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 const router = require('express').Router()

 router.route('/create')
     .get((req, res) => res.render('create'))
     .post((req, res) => {
       console.log(req.body.snippetText)

       res.redirect('/')
     })

 // Exports
 module.exports = router
