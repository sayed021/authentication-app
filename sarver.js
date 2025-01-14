const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const app = express();
const { errorHandler } = require("./middleware/errorHandler");
const { connectDB, disconnectDB } = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");


// Middleware
app.use(bodyParser.json());

// Connect to DB
connectDB()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
        process.exit(1); // Exit the process if DB connection fails
    });

// Routes
app.get("/", (req, res) => {
    res.send("app is successfully initilized");
});
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/login", authRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Server Setup
const _PORT = 3300;
app.listen(_PORT, () => {
    console.log(`Server is running on http://localhost:${_PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(async () => {
        console.log("HTTP server closed");
        await disconnectDB();
        process.exit(0);
    });
});
