const Mongoose = require("mongoose");

const QuestionSchema = new Mongoose.Schema({
    question: String,
    finalResponse: String,
    userid : String
  });
  const Question = Mongoose.model('Question', QuestionSchema);
  module.exports= Question