const mongoose = require('mongoose');

// User Schema Definition
const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  }
});

// Create the User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
