const { Client } = require('pg');

const client = new Client({
  database: 'questionapi'
});

client.connect();


client.query(`CREATE TABLE IF NOT EXISTS questions (
    question_id integer PRIMARY KEY,
    product_id integer,
    question_body varchar(1000),
    question_date timestamp,
    user_id integer,
    question_helpfulness integer,
    reported boolean
  )`);

client.query(`CREATE TABLE IF NOT EXISTS answers (
  answer_id integer PRIMARY KEY,
  body varchar(1000),
  date timestamp,
  user_id integer,
  helpfulness integer,
  question_id integer
)`);

client.query(`CREATE TABLE IF NOT EXISTS users (
  user_id integer PRIMARY KEY,
  name varchar(60),
  email varchar(60)
)`);
