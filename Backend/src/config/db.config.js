require('dotenv').config();
const MYSQL_DB_CONFIG = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PORT: parseInt(process.env.DB_PORT), // Convert port number string to integer
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
};

module.exports = {
  MYSQL_DB_CONFIG,
};
