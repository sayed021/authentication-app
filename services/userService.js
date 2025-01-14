const User = require("../models/user");
const bcrypt = require("bcryptjs");
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
    const { email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({
            email,
            password: hashedPassword,
            isPasswordHashed: true,
        });

        const result = await newUser.save();
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

module.exports = { getAllUsers, createUser };
