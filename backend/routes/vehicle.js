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

// 🌍 GET ALL vehicles (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("owner", "name email");
    res.json({ success: true, vehicles });
  } catch (error) {
    console.error("Get all vehicles error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET all vehicles for a specific user by MongoDB _id
/*router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const vehicles = await Vehicle.find({ owner: userId });

    res.json({ success: true, vehicles });
  } catch (error) {
    console.error("Get vehicles error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});*/

module.exports = router;
