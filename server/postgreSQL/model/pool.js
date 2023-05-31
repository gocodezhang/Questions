const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  database: 'questionapi',
  user: 'jayzhang',
  password: process.env.PASSWORD,
});

module.exports = {
  pool,
};
