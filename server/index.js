const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const controller = require('./controller.js');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Set up routes

// Get requests
app.get('/qa/questions', controller.getQuestions);
// app.get('/qa/questions/:question_id/answers', )

// Post requests
// app.post('/qa/questions')
// app.post('/qa/questions/:question_id/answers')

// Put requests
// app.put('/qa/questions/:question_id/helpful')
// app.put('/qa/questions/:question_id/report')
// app.put('/qa/answers/:answer_id/helpful')
// app.put('/qa/answers/:answer_id/report')

// Server listen
app.listen(3000);
console.log('Listening at http://localhost:3000');
