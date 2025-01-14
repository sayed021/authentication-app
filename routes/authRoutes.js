const express = require("express");
const { Login } = require("../services/loginService");
const router = express.Router();

// Route for user login
router.post("/login", async (req, res) => {
    try {
        const userData = req.body;
        const loginData = await Login(userData);
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

module.exports = router;
