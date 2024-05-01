//for config
const { MYSQL_DB_CONFIG } = require("../config/db.config");

//for mysql connection
const mysql = require("mysql2/promise");

//for Sequelize ORM
const { Sequelize, DataTypes } = require("sequelize");

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
    sequelize, DataTypes
  );
  db.Campaign = require("../campaign/campaign.model")(
    sequelize, DataTypes
  );
  db.Funding = require("../funding/funding.model")(
    sequelize, DataTypes
  );
  db.Category = require("../category/category.model")(
    sequelize, DataTypes
  );
  db.Team = require("../team/team.model")(
    sequelize, DataTypes
  );

  // Defining associations
  db.User.hasMany(db.Campaign, {
    foreignKey: "user_id",
    as: "Campaigns"
  });
  db.Campaign.belongsTo(db.User, {
    foreignKey: "user_id",
    as: "User"
  });
  db.Campaign.hasOne(db.Funding, { 
    foreignKey: "campaign_id",
    as: "Funding" });
  db.Funding.belongsTo(db.Campaign, { 
    foreignKey: "campaign_id",
    as: "Campaign"
   });
   db.Campaign.hasOne(db.Funding, { 
    foreignKey: "campaign_id",
    as: "Team" });
  db.Team.belongsTo(db.Campaign, { 
    foreignKey: "campaign_id",
    as: "Campaign"
   });
  await sequelize.sync({ alter: false });

 
}