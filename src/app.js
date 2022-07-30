require("dotenv").config();
require("./db.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
var passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const pg = require("pg");
const userTransactions = require("./routes/transactions/userTransactions.router.js");
const user = require("./routes/user/index.js");

const server = express();
server.name = "API";

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// pool configuration https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pg/index.d.ts
const poolConfigOptions = {
  connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
};
const poolInstance = new pg.Pool(poolConfigOptions);
const pgStore = new pgSession({
  pool: poolInstance,
  createTableIfMissing: true,
});

/* -------------- SESSION SETUP ---------------- */
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: pgStore,
    cookie: {
      secure: false,
      maxAge: 3600000, //1 hour
    },
  })
);

/* -------------- PASSPORT AUTHENTICATION ---------------- */
require("./config/passport");
server.use(passport.initialize());
server.use(passport.session());

// app.use("/api/v1/users", usersRouter);
server.use("/transactions", userTransactions);
server.use("/user", user);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
