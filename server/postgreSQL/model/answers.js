const { pool } = require('./pool.js');

module.exports = {
  queryAnswers(question_id, page, count) {
    const offset = (page - 1) * count;

    return pool.query(`SELECT id as answer_id, body, date, answerer_name, helpfulness, photos
    FROM answers WHERE question_id=${question_id} LIMIT ${count} OFFSET ${offset}`);
  },

  insertAnswer(question_id, body, name, email, photos) {

    return pool.query(`INSERT INTO answers (question_id, body, answerer_name, answerer_email, photo)`)
  }
};
