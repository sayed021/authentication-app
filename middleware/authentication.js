function isAuthenticated(req, res, next) {
    if (req.session.user) {
      console.log("User is authenticated");
      return next();
    }
    console.log("unauthorized user");
    res.status(401).json({ message: "Unauthorized. Please log in." });
  }
  
  module.exports = { isAuthenticated };