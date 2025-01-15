const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Fetch All Users
async function Login(user) {
    const { email, password } = user;
    
    try {
        // Find the user by email and password
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
      }
  
      // If the password is not hashed
      if (!user.isPasswordHashed) {
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
  
          // Update the user record
          user.password = hashedPassword;
          user.isPasswordHashed = true;
          await user.save();
      } else {
          // Compare hashed password
          const isMatch = await bcrypt.compare(plainPassword, user.password);
          if (!isMatch) {
              throw new Error("Invalid password");
          }
      }
      console.log("login successfull");
      
      return { message: "Login successful", user };
    } catch (error) {
        throw new Error("login service error: " + error.message);
    }
}

module.exports = { Login };
