var express = require("express");
var router = express.Router();
const usersRouter = require("./user/users.router.js");
const transactionsRouter = require("./transactions/transactions.router.js");

/* GET home page. */
router.use("/user", usersRouter);
router.use("/transactions", transactionsRouter);

module.exports = router;