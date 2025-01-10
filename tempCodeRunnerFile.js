const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// Middleware for JSON Parsing
app.use(bodyParser.json());

// const connectDB = require('./config/db.js');
const { connectDB, disconnectDB } = require('./config/db.js');
const { getAllUsers, createUser } = require('./services/userService.js');

// Connect to the database once when the server starts
connectDB().then(() => {
	console.log("Database connected successfully");
  }).catch((error) => {
	console.error("Database connection error:", error);
	process.exit(1); // Exit the process if the database connection fails
});

app.get("/", ( req, res ) => {
	res.send("app is successfully initilized");
});
