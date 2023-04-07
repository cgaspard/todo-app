const express = require("express");
const router = express.Router();
const passport = require("passport");

// Google OAuth2 authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect(process.env.FRONTEND_URL || "http://localhost:8080");
});

// Facebook OAuth2 authentication
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/facebook/callback", passport.authenticate("facebook"), (req, res) => {
  res.redirect(process.env.FRONTEND_URL || "http://localhost:8080");
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL || "http://localhost:8080");
});

module.exports = router;
