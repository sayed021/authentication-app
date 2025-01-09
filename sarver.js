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

app.get("/getUsers", async ( req, res ) => {
	try {
	  // Fetch all users
	  const users = await getAllUsers();
	  console.log("All Users:", users);

	  res.status(200).json({
		message: "Fetch users success",
		users,
	  });
	} catch (error) {
	  console.error("Application Error:", error);
	}

});
app.post("/addUser", async ( req, res ) => {

	try {
    const userData = req.body; // Get user data from the request body
    const newUser = await createUser(userData); // Call service to create the user
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

const _PORT = 3300;
app.listen(_PORT, console.log(`Server is running on http://localhost:${_PORT}`));


// Gracefully shut down the server and disconnect from the database
process.on('SIGINT', async () => {
	console.log('SIGINT signal received: closing HTTP server');
	server.close(async () => {
	  console.log('HTTP server closed');
	  await disconnectDB();
	  process.exit(0);
	});
  });