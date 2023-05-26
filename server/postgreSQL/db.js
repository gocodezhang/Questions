const { Client } = require('pg');

const client = new Client({
  database: 'questionapi',
});

client.connect();

/* -------------------------------------------------------------------------------
------------- Landing layers table -----------------------------------------------
---------------------------------------------------------------------------------*/

/* eslint quotes: 0 */
client.query(`DROP TABLE landing_questions CASCADE`);
client.query(`CREATE TABLE IF NOT EXISTS landing_questions (
    id SERIAL PRIMARY KEY,
    product_id integer,
    body varchar(1000),
    date_written bigint,
    asker_name varchar(60),
    asker_email varchar(60),
    reported integer DEFAULT 0,
    helpful integer DEFAULT 0
)`)
  .then(() => (console.log('landing_questions created')))
  .catch((err) => (console.log(err)));

client.query(`DROP TABLE landing_answers CASCADE`);
client.query(`CREATE TABLE IF NOT EXISTS landing_answers (
  id SERIAL PRIMARY KEY,
  question_id integer REFERENCES landing_questions (id) ON DELETE CASCADE,
  body varchar(1000),
  date_written bigint,
  answerer_name varchar(60),
  answerer_email varchar(60),
  reported integer DEFAULT 0,
  helpful integer DEFAULT 0
)`)
  .then(() => (console.log('landing_answers created')))
  .catch((err) => (console.log(err)));

client.query(`DROP TABLE landing_photos CASCADE`);
client.query(`CREATE TABLE IF NOT EXISTS landing_photos (
  id SERIAL PRIMARY KEY,
  answer_id integer REFERENCES landing_answers (id) ON DELETE CASCADE,
  url varchar(2048)
)`)
  .then(() => {
    console.log('photos created');
  })
  .catch((err) => (console.log(err)));

/* -------------------------------------------------------------------------------
------------- Business layers table (for API calls) ------------------------------
---------------------------------------------------------------------------------*/

client.query(`DROP TABLE questions CASCADE`);
client.query(`CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id integer,
  question_body varchar(1000),
  question_date timestamp DEFAULT current_timestamp,
  asker_name varchar(60),
  asker_email varchar(60),
  reported boolean DEFAULT FALSE,
  question_helpfulness integer DEFAULT 0
)`)
  .then(() => (console.log('questions created')))
  .catch((err) => (console.log(err)));

client.query(`DROP TABLE answers CASCADE`);
client.query(`CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id integer REFERENCES questions (id) ON DELETE CASCADE,
  body varchar(1000),
  date timestamp DEFAULT current_timestamp,
  answerer_name varchar(60),
  answerer_email varchar(60),
  reported boolean DEFAULT FALSE,
  helpfulness integer DEFAULT 0,
  photos json
)`)
  .then(() => {
    console.log('answers created');
    client.end();
  })
  .catch((err) => (console.log(err)));

// client.query(`DROP TABLE landing_photos CASCADE`);
