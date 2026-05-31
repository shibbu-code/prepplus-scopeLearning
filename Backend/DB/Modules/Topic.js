const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  explanation: String
});

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  intro: String,

  formulas: [
    {
      title: String,
      formula: String
    }
  ],

  scenarios: [
    {
      title: String,
      description: String
    }
  ],

  mcqs: [mcqSchema],

  order: Number

}, { timestamps: true });

// 👇 MUST match Compass collection name
module.exports = mongoose.model("Topic", topicSchema, "aptimodules");