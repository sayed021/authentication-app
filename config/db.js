const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error("Database connection failed", err.message);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await mongoose.disconnect();
};

module.exports = { connectDB, disconnectDB };
