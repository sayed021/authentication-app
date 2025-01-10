const User = require('../models/user');

// Fetch All Users
async function Login(user) {
const { email, password } = user;
const userEmail = email ? email.toString().trim() : '';
const userPassword = password ? password.toString().trim() : '';
  try {
    // Find the user by email and password
    const user = await User.findOne({ email: userEmail, password: userPassword });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    return { message: 'Login successful', user };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { Login };