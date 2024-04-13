 require('dotenv').config(); // Load environment variables from .env file
const MYSQL_DB_CONFIG = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PORT: process.env.PORT,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
};

module.exports = {
  MYSQL_DB_CONFIG,
};
