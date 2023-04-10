const express = require('express')
const passport = require('passport')
const router = express.Router()

// Google OAuth login route
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

// Google OAuth callback route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect('/')
  }
)

module.exports = router
