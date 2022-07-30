const { Transaction } = require("../../db");

const updateTransaction = async (req, res, next) => {
  try {
    const { date, amount, description, transaction_id } = req.body;
    await Transaction.update(
      {
        date,
        amount,
        description,
      },
      { where: { transaction_id: transaction_id } }
    );
    res.json({ msg: "Transaction has been updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateTransaction;
