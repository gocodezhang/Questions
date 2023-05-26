const { Pool } = require('pg');

const pool = new Pool({
  database: 'questionapi',
});

module.exports = {
  queryQuestions(product_id, page, count) {
    const offset = (page - 1) * count;

    return pool.query(`SELECT t1.id as id,
    t1.body as body, t1.date_written as date, answerer_name, t1.helpful as helpfulness,
    t1.reported as reported, json_agg(json_build_object('id', t2.id, 'url', t2.url))
    FROM landing_answers as t1
    JOIN landing_photos as t2 ON t1.id=t2.answer_id
    GROUP BY t1.id
    LIMIT 10`);
  },
};

// `SELECT t1.id as question_id,
//     t1.body as question_body, t1.date as question_date, asker_name, t1.helpful as helpfulness,
//     t1.reported_boolean as reported, json_object_agg(t2.id, t2.*)
//     FROM landing_questions as t1
//     JOIN landing_answers as t2 ON t1.id=t2.question_id
//     WHERE product_id=${product_id}
//     GROUP BY t1.id LIMIT ${count} OFFSET ${offset}`
