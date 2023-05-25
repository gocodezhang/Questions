const { Client } = require('pg');
const path = require('path');

const client = new Client({
  database: 'questionapi',
});

client.connect();

const questionsPath = path.join(__dirname, '../../questions-data/questions.csv');
const table1 = 'landing_questions';

client
  .query(`COPY ${table1} (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
  FROM '${questionsPath}' WITH (FORMAT CSV, HEADER)`)
  .then(() => {
    console.log('Successfully imported: ', table1);
  })
  .catch((err) => (console.log(err)));

const answersPath = path.join(__dirname, '../../questions-data/answers.csv');
const table2 = 'landing_answers';

client
  .query(`COPY ${table2} (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
  FROM '${answersPath}' WITH (FORMAT CSV, HEADER)`)
  .then(() => {
    console.log('Successfully imported: ', table2);
  })
  .catch((err) => (console.log(err)));

const photosPath = path.join(__dirname, '../../questions-data/answers_photos.csv');
const table3 = 'photos';

client
  .query(`COPY ${table3} FROM '${photosPath}' WITH (FORMAT CSV, HEADER)`)
  .then(() => {
    console.log('Successfully imported: ', table3);
    client.end();
  })
  .catch((err) => (console.log(err)));
