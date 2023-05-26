const model = require('./postgreSQL/model/questions.js');

module.exports = {
  getQuestions(req, res) {
    /* eslint prefer-const: 0 */
    let { product_id, page, count } = req.body;
    page = page || 1;
    count = count || 5;
    model.queryQuestions(product_id, page, count)
      .then((result) => {
        res.status(200).send(result.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  },
};
