const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    funding_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    funding_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
    funding_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_account_location: {
        type: DataTypes.STRING,
        allowNull: false
      },
  };
  return sequelize.define("funding", attributes);
}


