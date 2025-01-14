const express = require("express");
const { getAllUsers, createUser } = require("../services/userService");
const { Login } = require("../services/loginService");
const { isAuthenticated } = require("../middleware/authentication");
const router = express.Router();

// Route for fetching all users
router.get("/get-all", isAuthenticated, async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            message: "Fetch users success",
            users,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error fetching users",
            message: error.message,
        });
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
        res.status(500).json({
            error: "Error creating user",
            message: error.message,
        });
    }
});

// Route for user login
router.post("/login", async (req, res) => {
    try {
        const userData = req.body;
        const loginData = await Login(userData);

        // Store session data for authenticated users
        req.session.user = {
            id: loginData.id,
            email: loginData.email,
        };

        res.status(200).json({
            message: "User login successful",
            user: loginData,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error logging in user",
            error: error.message,
        });
    }
});

// Logout Route
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid"); // Clear session cookie
        res.status(200).json({ message: "Logout successful" });
    });
});

module.exports = router;
