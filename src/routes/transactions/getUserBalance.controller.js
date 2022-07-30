const { Transaction, conn } = require("../../db");
const sequelize = require("sequelize");

const getUserBalance = async (req, res, next) => {
  try {
    const [results] = await conn.query("SELECT * FROM session LIMIT 1");
    console.log(results);
    const userBalanceIngress = await Transaction.findAll({
      where: { id_user: results[0].sess.passport.user, type: "Ingress" },
      //attributes: ["date", "amount", "description", "type", "transaction_id"],
      attributes: [[sequelize.fn("sum", sequelize.col("amount")), "total"]],
    });
    const userBalanceEgress = await Transaction.findAll({
      where: { id_user: results[0].sess.passport.user, type: "Egress" },
      //attributes: ["date", "amount", "description", "type", "transaction_id"],
      attributes: [[sequelize.fn("sum", sequelize.col("amount")), "total"]],
    });
    const userBalance =
      userBalanceIngress[0].dataValues.total - userBalanceEgress[0].dataValues.total;
    const data = { userBalance };
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getUserBalance;
