const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Campaign = require("../campaign/campaign.model");

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

  const User = sequelize.define("User", attributes);

  return User;
}
