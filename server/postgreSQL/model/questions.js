const { pool } = require('./pool.js');

module.exports = {
  queryQuestions(product_id, page, count) {
    const offset = (page - 1) * count;

    return pool.query(
      `SELECT * FROM questions_answers
      WHERE product_id=${product_id} LIMIT ${count} OFFSET ${offset}`,
    );
  },

  insertQuestion(productId, body, name, email) {
    return pool.query(`INSERT INTO questions (product_id, question_body, asker_name, asker_email)
      VALUES ($1, $2, $3, $4) RETURNING *`, [productId, body, name, email])
      .then((result) => {
        const {
          id, product_id, question_body, question_date,
          asker_name, asker_email, reported, question_helpfulness,
        } = result.rows[0];
        return pool.query(`INSERT INTO questions_answers
        (id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)`, [id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness]);
      });
  },

  reportQuestion(question_id) {
    return pool.query(`UPDATE questions SET reported = TRUE WHERE id = ${question_id}`)
      .then(() => {
        console.log('reported in the question table');
        return pool.query(`UPDATE questions_answers SET reported = TRUE WHERE id = ${question_id}`);
      });
  },

  markQuestionHelpful(question_id) {
    return pool.query(`UPDATE questions SET question_helpfulness = question_helpfulness + 1
      WHERE id = ${question_id}`)
      .then(() => {
        console.log('marked in the question table');
        return pool.query(`UPDATE questions_answers SET question_helpfulness = question_helpfulness + 1
        WHERE id = ${question_id}`);
      });
  },
};

// `SELECT t1.id as question_id,
//     t1.body as question_body, t1.date as question_date, asker_name, t1.helpful as helpfulness,
//     t1.reported_boolean as reported, json_object_agg(t2.id, t2.*)
//     FROM landing_questions as t1
//     JOIN landing_answers as t2 ON t1.id=t2.question_id
//     WHERE product_id=${product_id}
//     GROUP BY t1.id LIMIT ${count} OFFSET ${offset}`
