const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { name, mobile, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.log("No JWT_SECRET");
  }

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res
        .status(203)
        .json({ success: false, message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ name, mobile, password });
    await newUser.save();
    const payload = {
      user: {
        id: newUser.id,
        mobile: newUser.mobile,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "365d",
    });
    newUser.password = "";

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      details: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const Login = async (req, res) => {
  const { mobile, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.log("No JWT_SECRET");
  }
  try {
    // Find user by mobile number
    let user = await User.findOne({ mobile });
    if (!user) {
      return res
        .status(203)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(203)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Passwords match, create JWT token
    const payload = {
      user: {
        id: user.id,
        mobile: user.mobile,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "365d",
    });

    user.password = "";
    res
      .status(200)
      .json({ success: true, message: "Login Success", token, details: user });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { Register, Login };
