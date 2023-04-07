const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const config = require("./config");
const db = require("./db");

const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const chatGptRouter = require("./routes/chatgpt");

const app = express();

app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    store: new SQLiteStore({ db: "sessions.sqlite3" }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
  })
);

app.use(passport.initialize());
app.use(passport.session());

db.initialize();

app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);
app.use("/api/chatgpt", chatGptRouter);

const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
