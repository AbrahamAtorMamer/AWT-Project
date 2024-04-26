//for config
const { MYSQL_DB_CONFIG } = require("../config/db.config");

//for mysql connection
const mysql = require("mysql2/promise");

//for Sequelize ORM
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  const { HOST, USER, PORT, PASSWORD, DB } = MYSQL_DB_CONFIG;

  const connection = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
  });

  await connection.query(`Create database if not exists \`${DB}\`;`);

  //connect to db
  const sequelize = new Sequelize(DB, USER, PASSWORD, {
    dialect: "mysql",
    host: HOST,
  });

  db.User = require("../profile/user.model")(
    sequelize
  );
  // Import Campaign and Funding models
  const Campaign = require("../campaign/campaign.model")(sequelize);
  const Funding = require("../funding/funding.model")(sequelize);

  // Define associations
  Campaign.hasOne(Funding, { foreignKey: 'campaign_id' });
  Funding.belongsTo(Campaign, { foreignKey: 'campaign_id' });
  await sequelize.sync({ alter: true });
}