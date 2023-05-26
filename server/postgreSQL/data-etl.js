const { Client } = require('pg');

const client = new Client({
  database: 'questionapi',
});

client.connect();

/* eslint quotes: 0 */
client.query(`INSERT INTO questions
  SELECT id, product_id, body, to_timestamp(date_written/1000), asker_name, asker_email, reported::BOOLEAN, helpful
  FROM landing_questions`)
  .then(() => {
    console.log('inserted into questions');
  })
  .catch((err) => (console.log(err)));

// client.query(`UPDATE landing_questions SET date = to_timestamp(date_written/1000)`)
//   .then(() => {
//     console.log('date was updated');
//   })
//   .catch((err) => (console.log(err)));

client.query(`INSERT INTO answers
  SELECT t1.id, t1.question_id,
  t1.body, to_timestamp(t1.date_written/1000), t1.answerer_name, t1.answerer_email, t1.reported::BOOLEAN,
  t1.helpful as helpfulness, COALESCE(json_agg(json_build_object('id', t2.id, 'url', t2.url)) FILTER (WHERE t2.id IS NOT NULL), '[]')
  FROM landing_answers as t1
  LEFT JOIN landing_photos as t2 ON t1.id=t2.answer_id
  GROUP BY t1.id`)
  .then(() => {
    console.log('inserted into answers');
    client.end();
  })
  .catch((err) => (console.log(err)));

// client.query(`UPDATE landing_answers SET reported_boolean = TRUE WHERE reported = 1`)
//   .then(() => {
//     console.log('reported_boolean in answers was updated');
//     client.end();
//   })
//   .catch((err) => (console.log(err)));
