const { Transaction, conn } = require("../../db");

const postTransaction = async (req, res, next) => {
  try {
    const [results] = await conn.query("SELECT * FROM session LIMIT 1");
    const { amount, type, description, date } = req.body;
    const newTransaction = await Transaction.create({
      date,
      amount,
      type,
      description,
    });
    await newTransaction.setUser(results[0].sess.passport.user);
    res.send({ msg: "transaccion exitosa!" });
  } catch (error) {
    next(error);
  }
};

module.exports = postTransaction;
