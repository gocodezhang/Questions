const { Pool } = require('pg');

const pool = new Pool({
  database: 'questionapi',
});

module.exports = {
  pool,
};
