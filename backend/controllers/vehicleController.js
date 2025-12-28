const Vehicle = require("../models/vehicleModel");

exports.addVehicle = async (req, res) => {
  try {
    const userId = req.userId; // from middleware
    const { name, make, model, year, seats, location, fuelType, image } = req.body;

    // Validation
    if (!name || !make || !model || !year || !seats || !location || !fuelType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVehicle = await Vehicle.create({
      owner: userId,
      name,
      make,
      model,
      year,
      seats,
      location,
      fuelType,
      image: image || '/photos/default-car.jpg'
    });

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle: newVehicle
    });
  } catch (err) {
    console.error("Add vehicle error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get ALL vehicles (public marketplace)
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("owner", "name email");
    res.json({ vehicles });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserVehicles = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const vehicles = await Vehicle.find({ owner: userId });
    res.json({ vehicles });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

