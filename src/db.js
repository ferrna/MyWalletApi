require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
//${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}
//postgres:audinac747@localhost:5432/challengealkemyfs
const sequelize = new Sequelize(
  `postgres://twmuidzpzqswxh:a6cad4b430c8d3e774c1910b45cd877b9b1483a3131dbbb834cfd64e33a20904@ec2-3-208-79-113.compute-1.amazonaws.com:5432/d7e6llkd1otm2i`,
  {
    logging: false,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
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
