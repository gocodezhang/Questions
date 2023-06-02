const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  database: 'questionapi',
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  host: process.env.HOST,
});

module.exports = {
  pool,
};
