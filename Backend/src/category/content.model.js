const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    content_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  };
  return sequelize.define("content", attributes);
}


