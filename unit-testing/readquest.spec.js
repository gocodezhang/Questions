const request = require('supertest');

describe('Testing on GET questions requests ', () => {
  function getRandomINT(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  it('There should be return value in response body', (done) => {
    request('http://localhost:3000')
      .get('/qa/questions')
      .query({ product_id: 1 })
      .then((res) => {
        expect(res.body).toBeTruthy();
      })
      .then(() => (done()));
  }, 10000);

  it('There should be 5 questions in the response body if unspecified', (done) => {
    request('http://localhost:3000')
      .get('/qa/questions')
      .query({ product_id: 1 })
      .then((res) => {
        expect(res.body.length).toBe(5);
      })
      .then(() => (done()));
  }, 10000);

  it('There should be less or equal to exact number of questions specified', (done) => {
    request('http://localhost:3000')
      .get('/qa/questions')
      .query({ product_id: getRandomINT(9000, 10000), count: 10 })
      .then((res) => {
        expect(res.body.length).toBeLessThanOrEqual(10);
      })
      .then(() => (done()));
  }, 10000);
});

describe('Testing on GET answers requests', () => {
  function getRandomINT(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  it('There should be returned value in the respone body', (done) => {
    request('http://localhost:3000')
      .get(`/qa/questions/${getRandomINT(9000, 10000)}/answers`)
      .then((res) => {
        expect(res.body).toBeTruthy();
      })
      .then(() => (done()));
  }, 10000);

  it('There should be 5 answers in the response if unspecified', (done) => {
    request('http://localhost:3000')
      .get('/qa/questions/1/answers')
      .then((res) => {
        expect(res.body.length).toBe(5);
      })
      .then(() => (done()));
  }, 10000);

  it('There should be >= 5 answers in the response when specified count > 5', (done) => {
    request('http://localhost:3000')
      .get('/qa/questions/5/answers')
      .query({ count: 8 })
      .then((res) => {
        expect(res.body.length).toBeGreaterThanOrEqual(5);
      })
      .then(() => (done()));
  }, 10000);
});
