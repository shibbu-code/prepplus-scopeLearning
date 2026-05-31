const mongoose = require('mongoose');

const connectDB = async (Url) => {
    try {
        await mongoose.connect(Url);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }};

module.exports = connectDB;