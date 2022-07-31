require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
//${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}
//postgres:audinac747@localhost:5432/challengealkemyfs
const sequelize = new Sequelize(
  `postgres://tnzzmcexvccgef:37ff68b88881759de8d0e6a803bb91a5634dd9eecd5d54966e49088525fdbe65@ec2-100-26-39-41.compute-1.amazonaws.com/dbadq5pojigai9`,
  {
    logging: false,
    dialect: 'postgres',
    native: true,
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Transaction } = sequelize.models;

User.hasMany(Transaction, {
  foreignKey: 'id_user',
  timestamps: false,
});
Transaction.belongsTo(User, {
  foreignKey: 'id_user',
  timestamps: false,
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
