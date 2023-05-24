const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost:12705');

const questionsSchema = mongoose.Schema({
  product_id: String,
  question_body: String,
  question_date: Date,
  asker_name: String,
  asker_email: String,
  question_helpfulness: Number,
  reported: Boolean
})

const answersSchema = mongoose.Schema({
  body: String,
  date: Date,
  answerer_name: String,
  answerer_email: String,
  helpfulness: Number,
  photos: [String],
  question_id: String
})

const question = mongoose.model('question', questionsSchema);
const answer = mongoose.model('answer', answersSchema);