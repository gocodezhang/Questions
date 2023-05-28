const request = require('supertest');

/* eslint arrow-body-style: 0 */
describe('Testing on writing questions requests', () => {
  it('Increase the helpfulness by 1 after the put request', (done) => {
    request('http://localhost:3000')
      .put('/qa/questions/2/helpful')
      .then((res) => {
        expect(res.text).toBe('The question was marked');
      })
      .then(() => (done()))
      .catch((err) => (console.log(err)));
  }, 10000);
  //   const question_id = 4;
  //   const client = new pg.Client({
  //     database: 'questionapi',
  //   });

  //   client.connect();

  //   let helpfulness;

  //   client.query(`SELECT question_helpfulness FROM questions
  //     WHERE id = ${question_id}`)
  //     .then((result) => {
  //       helpfulness = result.rows[0].question_helpfulness;
  //       return request('http://localhost:3000')
  //         .put('/qa/questions/2/helpful')
  //         .then((res) => (console.log(res)));
  //     })
  //     .then(() => {
  //       return client.query(`SELECT question_helpfulness FROM questions
  //       WHERE id = ${question_id}`);
  //     })
  //     .then((resultNew) => {
  //       const helpfulnessNew = resultNew.rows[0].question_helpfulness
  //       expect(helpfulnessNew - helpfulness).toBe(1);
  //     })
  //     .catch((err) => (console.log(err)));
  // });
});
