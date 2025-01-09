const User = require('../models/user');

// Fetch All Users
async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Create a New User
async function createUser(userData) {
  try {
    const newUser = new User(userData);
    const result = await newUser.save();
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

module.exports = { getAllUsers, createUser };
