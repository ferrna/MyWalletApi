const { Router } = require("express");
const getAllTransactions = require("./getAllTransactions.controller");
const getLastTransactions = require("./getLastTransactions.controller");
const postTransaction = require("./postTransaction.controller");
const getUserBalance = require("./getUserBalance.controller");
const updateTransaction = require("./updateTransaction.controller");
const destroyTransaction = require("./destroyTransaction.controller");

const transactionsRouter = Router();

transactionsRouter.route("/").get(getAllTransactions);
transactionsRouter.route("/last").get(getLastTransactions);
transactionsRouter.route("/").post(postTransaction);
transactionsRouter.route("/balance").get(getUserBalance);
transactionsRouter.route("/").put(updateTransaction);
transactionsRouter.route("/:transaction_id").delete(destroyTransaction);

module.exports = transactionsRouter;
