const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Add vehicle (PROTECTED)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // 🔥 Comes from token (middleware)
        const { name, make, model, year, seats, location, fuelType, image, pricePerDay, type } = req.body;

        // Validation
        if (!name || !make || !model || !year || !seats || !location || !fuelType || pricePerDay === undefined || !type) {
          return res.status(400).json({ message: "All fields are required including pricePerDay and type" });
        }

        // Get owner location from user profile to support location-based filtering later
        const owner = await User.findById(userId).lean();
        const ownerLocation = owner?.city || owner?.address || null;

        const vehicle = await Vehicle.create({
          name,
          make,
          model,
          year,
          seats,
          location,
          fuelType,
          pricePerDay,
          type,
          image: image || '/photos/default-car.jpg',
          owner: userId,
          ownerLocation
        });

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle
    });

  } catch (err) {
    console.error("Add vehicle error:", err);
    res.status(400).json({ error: err.message });
  }
});

// 🌍 GET ALL vehicles (PUBLIC) - Only active vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ status: "active" }).populate("owner", "name email");
    res.json({ success: true, vehicles });
  } catch (error) {
    console.error("Get all vehicles error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🔐 GET current user's vehicles (PROTECTED) - All statuses
router.get("/my-vehicles", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const vehicles = await Vehicle.find({ owner: userId });
    res.json({ success: true, vehicles });
  } catch (error) {
    console.error("Get user vehicles error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🔐 UPDATE vehicle status (PROTECTED)
router.patch("/:vehicleId/status", authMiddleware, async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    // Validate status
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find vehicle and verify ownership
    const vehicle = await Vehicle.findById(vehicleId);
    
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (vehicle.owner.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this vehicle" });
    }

    vehicle.status = status;
    await vehicle.save();

    res.json({ success: true, message: "Status updated", vehicle });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🔐 DELETE vehicle (PROTECTED)
router.delete("/:vehicleId", authMiddleware, async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const userId = req.userId;

    const vehicle = await Vehicle.findById(vehicleId);
    
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (vehicle.owner.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this vehicle" });
    }

    await Vehicle.findByIdAndDelete(vehicleId);
    res.json({ success: true, message: "Vehicle deleted" });
  } catch (error) {
    console.error("Delete vehicle error:", error);
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
