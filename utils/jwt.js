const jwt = require("jsonwebtoken");
// const { User } = require("../models/user");
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;  // Add JWT_REFRESH_SECRET to your .env file

// Generate JWT Access Token
function generateAccessToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15s" });  // Access token expires in 15 minutes
}

// Generate JWT Refresh Token
function generateRefreshToken(userId) {
    return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: "30m" });  // Refresh token expires in 7 days
}

// Verify the Access Token
function verifyAccessToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

// Verify the Refresh Token
function verifyRefreshToken(token) {
    return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
