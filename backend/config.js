module.exports = {
    googleAuth: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
    },
    facebookAuth: {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName"],
    },
    SESSION_SECRET: process.env.SESSION_SECRET || "your-session-secret",
    CHATGPT_API_KEY: process.env.CHATGPT_API_KEY,
    CHATGPT_API_URL: process.env.CHATGPT_API_URL || "https://api.openai.com/v1/engines/davinci-codex/completions",
  };
  