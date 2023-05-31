const { Client } = require('pg');
const path = require('path');
require('dotenv').config();

const client = new Client({
  database: 'questionapi',
  user: 'jayzhang',
  password: process.env.PASSWORD,
});

client.connect();

const questionsPath = path.join(__dirname, '../../questions-data/questions.csv');
const table1 = 'landing_questions';

client
  .query(`\\copy ${table1} FROM '${questionsPath}' WITH (FORMAT CSV, HEADER)`)
  .then(() => {
    console.log('Successfully imported: ', table1);
  })
  .catch((err) => (console.log(err)));

const answersPath = path.join(__dirname, '../../questions-data/answers.csv');
const table2 = 'landing_answers';

client
  .query(`\\copy ${table2} FROM '${answersPath}' WITH (FORMAT CSV, HEADER)`)
  .then(() => {
    console.log('Successfully imported: ', table2);
  })
  .catch((err) => (console.log(err)));

const photosPath = path.join(__dirname, '../../questions-data/answers_photos.csv');
const table3 = 'landing_photos';

client
  .query(`\\copy ${table3} FROM '${photosPath}' WITH (FORMAT CSV, HEADER)`)
  .then(() => {
    console.log('Successfully imported: ', table3);
    client.end();
  })
  .catch((err) => (console.log(err)));
