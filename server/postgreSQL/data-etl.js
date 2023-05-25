const { Client } = require('pg');

const client = new Client({
  database: 'questionapi',
});

client.connect();

/* eslint quotes: 0 */
client.query(`UPDATE landing_questions SET reported_boolean = TRUE WHERE reported = 1`)
  .then(() => {
    console.log('reported_boolean was updated');
  })
  .catch((err) => (console.log(err)));

client.query(`UPDATE landing_questions SET date = to_timestamp(date_written/1000)`)
  .then(() => {
    console.log('date was updated');
  })
  .catch((err) => (console.log(err)));

client.query(`UPDATE landing_answers SET date = to_timestamp(date_written/1000)`)
  .then(() => {
    console.log('date in answers was updated');
  })
  .catch((err) => (console.log(err)));

client.query(`UPDATE landing_answers SET reported_boolean = TRUE WHERE reported = 1`)
  .then(() => {
    console.log('reported_boolean in answers was updated');
    client.end();
  })
  .catch((err) => (console.log(err)));
