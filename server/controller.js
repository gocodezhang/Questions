const model = require('./postgreSQL/model/index.js');

module.exports = {
  getQuestions(req, res) {
    /* eslint prefer-const: 0 */
    let { product_id, page, count } = req.query;
    console.log(req.query);
    page = page || 1;
    count = count || 5;
    model.questions.queryQuestions(product_id, page, count)
      .then((result) => {
        res.status(200).send(result.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  },

  addQuestion(req, res) {
    const {
      product_id, body, name, email,
    } = req.body;
    model.questions.insertQuestion(product_id, body, name, email)
      .then(() => {
        res.status(200).send('The question was added');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  },

  getAnswers(req, res) {
    let { page, count } = req.query;
    const { question_id } = req.params;
    page = page || 1;
    count = count || 5;
    model.answers.queryAnswers(question_id, page, count)
      .then((result) => {
        res.status(200).send(result.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  },
};
