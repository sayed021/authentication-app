const express = require("express");
const { getAllUsers, createUser } = require("../services/userService");
const router = express.Router();

// Route for fetching all users
router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            message: "Fetch users success",
            users,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching users", message: error.message });
    }
});

// Route for creating a new user
router.post("/signup", async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ error: "Error creating user", message: error.message });
    }
});

module.exports = router;
