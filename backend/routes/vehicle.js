const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// Add vehicle (test with one field)
router.post("/add", async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();

    res.status(201).json({ message: "Vehicle saved", vehicle });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
