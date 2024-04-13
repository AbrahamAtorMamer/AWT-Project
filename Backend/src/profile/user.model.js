const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

module.exports = model;

function model(sequelize) {
  const attributes = {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };
  return sequelize.define("user", attributes);
}



