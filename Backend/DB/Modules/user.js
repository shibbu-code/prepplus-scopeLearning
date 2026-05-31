const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp : {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },

    // 🔥 Progress Tracking
    totalSolved: {
        type: Number,
        default: 0
    },

    difficultySolved: {
        easy: { type: Number, default: 0 },
        medium: { type: Number, default: 0 },
        hard: { type: Number, default: 0 }
    },

    solvedQuestions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],

    solvedModules: [
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic"
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }
],

    createdAt: {  
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);