const { Transaction, conn } = require("../../db");

const getAllTransactions = async (req, res, next) => {
  try {
    const [results] = await conn.query("SELECT * FROM session LIMIT 1");
    const userTransactions = await Transaction.findAll({
      where: { id_user: results[0].sess.passport.user },
      attributes: ["date", "amount", "description", "type", "transaction_id"],
      order: [["date", "DESC"]],
    });
    const data = { userTransactions };
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllTransactions;
