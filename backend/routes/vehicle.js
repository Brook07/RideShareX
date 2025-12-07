const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const authMiddleware = require("../middleware/auth");

// Add vehicle (PROTECTED)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // 🔥 Comes from token (middleware)

    const vehicle = await Vehicle.create({
      name: req.body.name,
      owner: userId   // 🔥 THIS IS THE FIX
    });

    res.status(201).json({
      message: "Vehicle saved",
      vehicle
    });

  } catch (err) {
    console.error("Add vehicle error:", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
