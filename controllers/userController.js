const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(406).json("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "Registration successful", newUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json("Incorrect password");
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        userMail: existingUser.email,
        role: existingUser.role,
      },
      process.env.jwtkey,
    );
    console.log(token);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.payload);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.blockUser = async (req, res) => {
  if (req.role != "artist") {
    return res.status(403).json("Access denied");
  }
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(200).json({
      message: user.isBlocked ? "User blocked" : "User unblocked",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
