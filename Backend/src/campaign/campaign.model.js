const { DataTypes } = require("sequelize");
const Funding = require("../funding/funding.model")
module.exports = model;

function model(sequelize) {
  const attributes = {
    campaign_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    campaign_image: {
      type: DataTypes.BLOB,
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
  };

  const Campaign = sequelize.define("campaign", attributes);
  Campaign.associate = () => {
    Campaign.hasOne(Funding);
  };
  return Campaign;
}

