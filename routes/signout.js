/**
 * Module for the signout routes.
 *
 * @module routes/signout.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()

router.route('/signout')
    .get((req, res) => res.redirect('/'))

// Exports
module.exports = router
