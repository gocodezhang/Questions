const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  database: 'questionapi',
  user: 'jayzhang',
  password: process.env.PASSWORD,
});

client.connect();

/* eslint quotes: 0 */
client.query(`INSERT INTO questions
  SELECT id, product_id, body, to_timestamp(date_written/1000), asker_name, asker_email, reported::BOOLEAN, helpful
  FROM landing_questions`)
  .then(() => {
    client.query(`SELECT setval('questions_id_seq', (select max(id) from questions))`)
      .then(() => {
        console.log('inserted into questions');
      })
      .catch((err) => (console.log(err)));
  })
  .catch((err) => (console.log(err)));

client.query(`INSERT INTO answers
  SELECT t1.id, t1.question_id,
  t1.body, to_timestamp(t1.date_written/1000), t1.answerer_name, t1.answerer_email, t1.reported::BOOLEAN,
  t1.helpful as helpfulness, COALESCE(jsonb_agg(jsonb_build_object('id', t2.id, 'url', t2.url)) FILTER (WHERE t2.id IS NOT NULL), '[]')
  FROM landing_answers as t1
  LEFT JOIN landing_photos as t2 ON t1.id=t2.answer_id
  GROUP BY t1.id`)
  .then(() => {
    client.query(`SELECT setval('answers_id_seq', (select max(id) from answers))`)
      .then(() => {
        console.log('inserted into answers');
      })
      .catch((err) => (console.log(err)));
  })
  .catch((err) => (console.log(err)));

client.query(`INSERT INTO photos
  SELECT * FROM landing_photos`)
  .then(() => {
    client.query(`SELECT setval('photos_id_seq', (select max(id) from photos))`)
      .then(() => {
        console.log('inserted into photos');
      })
      .catch((err) => (console.log(err)));
  })
  .catch((err) => (console.log(err)));

client.query(`INSERT INTO questions_answers
  SELECT t1.id as id, t1.product_id,
  t1.question_body as question_body, t1.question_date as question_date, asker_name, asker_email, t1.reported as reported,
  t1.question_helpfulness as question_helpfulness, COALESCE(
    jsonb_object_agg(t2.id,
    jsonb_build_object('id', t2.id, 'body', t2.body, 'date', t2.date, 'answerer_name', t2.answerer_name, 'helpfulness', t2.helpfulness, 'photos', t2.photos))
  FILTER (WHERE t2.id IS NOT NULL), '{}') as answers
  FROM questions as t1
  LEFT JOIN answers as t2 ON t1.id=t2.question_id
  GROUP BY t1.id`)
  .then(() => {
    client.query(`SELECT setval('questions_answers_id_seq', (select max(id) from questions_answers))`)
      .then(() => {
        console.log('inserted into questions_answers');
        client.end();
      })
      .catch((err) => (console.log(err)));
  })
  .catch((err) => (console.log(err)));
