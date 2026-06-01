const mongoose = require('mongoose');

const connectDB = async (Url) => {
    try {
        await mongoose.connect(Url);
        console.log('MongoDB connected successfully');
        console.log("Connected DB:", mongoose.connection.name);
        console.log("Connected Host:", mongoose.connection.host);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }};

module.exports = connectDB;