module.exports = {
    port: process.env.PORT || 3000,
    frontendUrl: "http://localhost:8080",
    googleAuth: {
      clientID: process.env.GOOGLE_CLIENT_ID || "826236956679-b5fgv2ksfftb7s7jvdkgsqa798s8vie9.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
    },
    SESSION_SECRET: process.env.SESSION_SECRET || "your-session-secret",
    CHATGPT_API_KEY: process.env.CHATGPT_API_KEY,
    CHATGPT_API_URL: process.env.CHATGPT_API_URL || "https://api.openai.com/v1/engines/davinci-codex/completions",
  };
  