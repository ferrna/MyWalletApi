//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, User, Transaction } = require("./src/db.js");

const port = process.env.PORT || 80;

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
  /*
  await User.create({ username: "usern1" });
  const newdate = new Date();
  const newOrder = await Transaction.create({
    amount: "10",
    type: "Ingress",
    date: newdate,
  });
  await newOrder.setUser(1);
  const newOrder2 = await Transaction.create({
    amount: "10",
    type: "Ingress",
    date: newdate,
  });
  await newOrder2.setUser(1);
  const newOrder3 = await Transaction.create({
    amount: "10",
    type: "Ingress",
    date: newdate,
  });
  await newOrder3.setUser(1);
  const newOrder4 = await Transaction.create({
    amount: "10",
    type: "Ingress",
    date: newdate,
  });
  await newOrder4.setUser(1);
  const newOrder5 = await Transaction.create({
    amount: "10",
    type: "Ingress",
    date: newdate,
  });
  await newOrder5.setUser(1);
  const newOrder6 = await Transaction.create({
    amount: "10",
    type: "Egress",
    date: newdate,
  });
  await newOrder6.setUser(1);
  const newOrder7 = await Transaction.create({
    amount: "10",
    type: "Egress",
    date: newdate,
  });
  await newOrder7.setUser(1);
  const newOrder8 = await Transaction.create({
    amount: "10",
    type: "Egress",
    date: newdate,
  });
  await newOrder8.setUser(1);
  const newOrder9 = await Transaction.create({
    amount: "10",
    type: "Egress",
    date: newdate,
  });
  await newOrder9.setUser(1);
  const newOrder10 = await Transaction.create({
    amount: "10",
    type: "Egress",
    date: newdate,
  });
  await newOrder10.setUser(1);
  */
});
