const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const config = require("../config");


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => {
      done(null, user)
    })
    .catch(err => {
      done(err)
    })
})

passport.use(
  new GoogleStrategy(
    {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
    //   clientID: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({
        where: { googleId: profile.id },
        defaults: { name: profile.displayName },
      })
        .then(([user]) => {
          done(null, user)
        })
        .catch(err => {
          done(err)
        })
    }
  )
)
