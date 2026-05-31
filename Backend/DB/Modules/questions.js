// models/Problem.js

const mongoose = require("mongoose");

const ParameterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
}, { _id: false });

const TestCaseSchema = new mongoose.Schema({
  input: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  output: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { _id: false });

const StarterCodeSchema = new mongoose.Schema({
  cpp: {
    type: String,
    default: ""
  },
  js: {
    type: String,
    default: ""
  },
  python: {
    type: String,
    default: ""
  }
}, { _id: false });

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  problemNumber: {
    type: Number,
    required: true,
    unique: true
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  },

  description: {
    type: String,
    default: ""
  },

  functionName: {
    type: String,
    required: true
  },

  returnType: {
    type: String,
    required: true
  },

  parameters: {
    type: [ParameterSchema],
    required: true
  },

  starterCode: {
    type: StarterCodeSchema,
    default: () => ({})
  },

  sampleTestCases: {
    type: [TestCaseSchema],
    default: []
  },

  hiddenTestCases: {
    type: [TestCaseSchema],
    default: []
  },

  constraints: {
    type: String,
    default: ""
  },

  tags: {
    type: [String],
    default: []
  },

  timeLimit: {
    type: Number,
    default: 2 // seconds
  },

  memoryLimit: {
    type: Number,
    default: 256 // MB
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Question", questionSchema);