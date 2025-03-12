// backend/routes/adminRoute.js
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin1@";
    const adminMobile = process.env.ADMIN_MOBILE || "09059719959";

    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Create the admin user, setting the "roles" field to "admin"
    const admin = await User.create({
      username: "admin",
      email: adminEmail,
      password: hashedPassword,
      mobile: adminMobile,
      role: "admin"  // Use "roles" if that's what your schema uses
    });

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error("Admin creation error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
