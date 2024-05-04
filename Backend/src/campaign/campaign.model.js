const { DataTypes } = require("sequelize");
const User = require("../profile/user.model"); // Import the User model
const Funding = require("../funding/funding.model");

module.exports = model;

function model(sequelize) {
  const attributes = {
    campaign_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    campaign_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_amount:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    campaign_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  };

  const Campaign = sequelize.define("Campaign", attributes);

  return Campaign;
}
