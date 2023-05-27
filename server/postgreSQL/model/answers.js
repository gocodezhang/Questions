const { pool } = require('./pool.js');

/* eslint arrow-body-style: 0 */
/* eslint object-shorthand: 0 */
module.exports = {
  queryAnswers(question_id, page, count) {
    const offset = (page - 1) * count;

    return pool.query(`SELECT id as answer_id, body, date, answerer_name, helpfulness, photos
    FROM answers WHERE question_id=${question_id} LIMIT ${count} OFFSET ${offset}`);
  },

  insertAnswer(question_id, body, name, email, photos) {
    return pool.query(`INSERT INTO answers (question_id, body, answerer_name, answerer_email)
    VALUES ($1, $2, $3, $4) RETURNING id`, [question_id, body, name, email])
      .then((resultAnswers) => {
        console.log('first inserted into answers');
        const { id } = resultAnswers.rows[0];
        return id;
      })
      .then((id) => {
        return Promise.all(photos.map((url) => (pool.query(`INSERT INTO photos (answer_id, url)
        VALUES ($1, $2) RETURNING id, url`, [id, url])
        )))
          .then((results) => {
            return { results, id };
          });
      })
      .then(({ results, id }) => {
        console.log('inserted into photos');
        const photosArr = JSON.stringify(results.map((result) => (result.rows[0])));
        return pool.query(`UPDATE answers SET photos = '${photosArr}'::json WHERE id = ${id}
        RETURNING id, body, date, answerer_name, helpfulness, photos`)
          .then((resultFinal) => {
            return {
              answer: resultFinal.rows[0],
              id: id,
            };
          });
      })
      .then(({ answer, id }) => {
        console.log('inserted photos back in answers');
        answer = JSON.stringify(answer);
        return pool.query(`UPDATE questions_answers SET answers = answers::jsonb || jsonb_build_object(${id}, '${answer}'::json)
                WHERE id = ${question_id}`);
      });
  },

  markAnswerHelpful(answer_id) {
    return pool.query(`UPDATE answers SET helpfulness = helpfulness + 1
      WHERE id = ${answer_id} RETURNING question_id`)
      .then((result) => {
        console.log('marked in answer table');
        const { question_id } = result.rows[0];
        return pool.query(`UPDATE questions_answers SET answers = jsonb_set(answers, '{${answer_id}, helpfulness}',
        to_jsonb(jsonb_extract_path(answers, '${answer_id}','helpfulness')::int + 1)) WHERE id = ${question_id}`);
      });
  },

  reportAnswer(answer_id) {
    return pool.query(`UPDATE answers SET reported = TRUE
      WHERE id = ${answer_id} RETURNING question_id`)
      .then((result) => {
        console.log('reported in answer table');
        const { question_id } = result.rows[0];
        return pool.query(`UPDATE questions_answers SET answers = answers - '${answer_id}' WHERE id = ${question_id}`);
      });
  },
};
