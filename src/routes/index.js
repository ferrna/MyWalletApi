var express = require("express");
var router = express.Router();
const path = require('path');
const usersRouter = require("./user/users.router.js");
const transactionsRouter = require("./transactions/transactions.router.js");

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

router.use("/user", usersRouter);
router.use("/transactions", transactionsRouter);

module.exports = router;