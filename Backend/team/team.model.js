const { DataTypes } = require('sequelize');
const db = require('../helpers/db.helper');

module.exports = model;

function model(sequelize) {
  const Team = sequelize.define('Team', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Team.associate = models => {
    Team.belongsTo(models.Campaign, { foreignKey: 'campaignId' });
  };

  return Team;
}
