// Import required modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    default: [],
  },
});

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10); // Hashing with bcrypt, salt rounds = 10
  }
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

// Create User model
const User = mongoose.model("User", userSchema);

// Export User model
module.exports = User;
