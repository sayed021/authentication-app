
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
const { verifyAccessToken, verifyRefreshToken, generateAccessToken } = require("../utils/jwt");

// JWT based authentication middleware
const isAuthenticated = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];  // Get the token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        // Try to verify the access token first
        const decoded = verifyAccessToken(token);
        req.userId = decoded.userId;  // Attach userId to the request for future use
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // If the access token is expired, try to refresh it using the refresh token
            const refreshToken = req.cookies.refresh_token;  // Get the refresh token from cookies

            if (!refreshToken) {
                return res.status(401).json({ message: "No refresh token provided" });
            }

            try {
                // Verify the refresh token
                const decodedRefresh = verifyRefreshToken(refreshToken);
                
                // Generate a new access token
                const newAccessToken = generateAccessToken(decodedRefresh.userId);
                res.setHeader("Authorization", `Bearer ${newAccessToken}`);  // Set the new access token in the response header

                // Attach the new access token's userId to the request for future use
                req.userId = decodedRefresh.userId;

                // Proceed with the request
                next();
            } catch (err) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }
        } else {
            // If the error is not token expiration, return an error
            return res.status(403).json({ message: "Invalid or expired token" });
        }
    }
};

module.exports = { isAuthenticated };
