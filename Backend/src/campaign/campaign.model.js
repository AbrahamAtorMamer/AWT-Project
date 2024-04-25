const { DataTypes } = require("sequelize");

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
    funding_id: {
      type: DataTypes.INTEGER, // Assuming funding_id is an integer
      allowNull: true, // or false depending on your requirements
      references: {
        model: Funding, // Reference to the Funding model
        key: 'funding_id' // The primary key of the referenced model
      }
    }
  };
  Campaign.associate = (models) => {
    Campaign.hasOne(models.Funding, { foreignKey: 'campaign_id' });
  };
  return sequelize.define("campaign", attributes);
}


