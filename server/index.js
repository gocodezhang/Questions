const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const controller = require('./controller.js');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Set up routes

// loader.io verification
app.get('/loaderio-60ffc13ae3baf137c20d094ad5233efb', (req, res) => (res.status(200).send('loaderio-60ffc13ae3baf137c20d094ad5233efb')));

// Get requests
app.get('/qa/questions', controller.getQuestions);
app.get('/qa/questions/:question_id/answers', controller.getAnswers);

// Post requests
app.post('/qa/questions', controller.addQuestion);
app.post('/qa/questions/:question_id/answers', controller.addAnswer);

// Put requests
app.put('/qa/questions/:question_id/report', controller.reportQuestion);
app.put('/qa/questions/:question_id/helpful', controller.markQuestionHelpful);
app.put('/qa/answers/:answer_id/helpful', controller.markAnswerHelpful);
app.put('/qa/answers/:answer_id/report', controller.reportAnswer);

// Server listen
app.listen(3000);
console.log('Listening at http://localhost:3000');
