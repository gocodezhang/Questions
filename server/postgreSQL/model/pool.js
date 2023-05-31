const { Pool } = require('pg');

const pool = new Pool({
  database: 'questionapi',
  user: 'jayzhang',
  password: process.env.PASSWORD,
});

module.exports = {
  pool,
};
