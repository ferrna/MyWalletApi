require('dotenv').config();
require('./db.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
var passport = require('passport');
const pgSession = require('connect-pg-simple')(session);
const pg = require('pg');

const server = express();
server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://my-wallet-client-chi.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// pool configuration https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pg/index.d.ts
const poolConfigOptions = {
  connectionString: `postgres://tnzzmcexvccgef:37ff68b88881759de8d0e6a803bb91a5634dd9eecd5d54966e49088525fdbe65@ec2-100-26-39-41.compute-1.amazonaws.com/dbadq5pojigai9`,
  ssl: true,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
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
      maxAge: 3600000, //1 hour
      sameSite: 'none',
    },
    secure : true
  })
);

/* -------------- PASSPORT AUTHENTICATION ---------------- */
require('./config/passport');
server.use(passport.initialize());
server.use(passport.session());


const router = require('./routes/index.js');
// app.use('/api/v1/users', usersRouter);
server.use('/', router);


// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
