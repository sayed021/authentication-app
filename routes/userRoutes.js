const express = require("express");
const { getAllUsers, createUser } = require("../services/userService");
const { Login } = require("../services/loginService");
const { isAuthenticated } = require("../middleware/authentication");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");
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
router.post("/signup", isAuthenticated, async (req, res) => {
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
        // req.session.user = {
        //     id: loginData.id,
        //     email: loginData.email,
        // };


        // JWT apply here
        // Generate the access and refresh tokens
        const accessToken = generateAccessToken(loginData._id);
        const refreshToken = generateRefreshToken(loginData._id);

        // Save the refresh token (you could store it in a database or as an HTTP-only cookie)
        res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });

        res.status(200).json({
            message: "User login successful",
            user: loginData,
            token: accessToken, // get token 
            refreshToken: refreshToken
        });

    } catch (error) {
        res.status(500).json({
            message: "Error logging in user",
            error: error.message,
        });
    }
});

router.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        // Verify the refresh token
        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Generate a new access token
        const accessToken = generateAccessToken(decoded.userId);
        res.status(200).json({
            accessToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error refreshing token",
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
