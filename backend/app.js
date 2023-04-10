const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const config = require("./config");
const db = require("./db");
const path = require('path');

const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const chatGptRouter = require("./routes/chatgpt");
const authRouter = require("./routes/chatgpt");

const app = express();

require('./config/passport')

//app.use(cors({ origin: config.frontendUrl, credentials: false }));
app.use(cors({ origin: "*", credentials: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    store: new SQLiteStore({ db: "sessions.sqlite3" }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Serve the Vue.js app
if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the dist folder
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')))
  // Serve the index.html file for all other requests
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'))
  })
}

app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);
app.use("/api/chatgpt", chatGptRouter);
app.use('/api/auth', authRouter)

db.initialize();

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
