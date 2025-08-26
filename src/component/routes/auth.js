const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { userId, username, email, password, address } = req.body;

    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      userId,
      username,
      email,
      password: hashedPassword,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

module.exports = router;
