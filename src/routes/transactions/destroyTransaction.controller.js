const { Transaction } = require("../../db");

const destroyTransaction = async (req, res, next) => {
  try {
    const { transaction_id } = req.params;
    const isDestroyed = await Transaction.destroy({
      where: { transaction_id: transaction_id },
    });
    if (isDestroyed) {
      res.json({ msg: "Transaction destroyed successfully" });
    } else {
      res.json({ msg: "Transaction haven't destroyed" });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = destroyTransaction;
