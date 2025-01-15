
// session based authentication middleware
// function isAuthenticated(req, res, next) {
//   if (req.session.user) {
//     console.log("User is authenticated");
//     return next();
//   }
//   console.log("unauthorized user");
//   res.status(401).json({ message: "Unauthorized. Please log in." });
// }

// module.exports = { isAuthenticated };



// JWT based authentication middleware
const { verifyAccessToken } = require("../utils/jwt");

const isAuthenticated = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];  // Get the token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = verifyAccessToken(token);
        req.userId = decoded.userId;  // Attach userId to the request for future use
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = { isAuthenticated };