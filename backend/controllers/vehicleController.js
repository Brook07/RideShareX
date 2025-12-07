const Vehicle = require("../models/vehicleModel");

exports.addVehicle = async (req, res) => {
  try {
    const userId = req.userId; // from middleware

    const newVehicle = await Vehicle.create({
      owner: userId,
      name: req.body.name
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

exports.getUserVehicles = async (req, res) => {
  try {
    const userId = req.userId;

    const vehicles = await Vehicle.find({ owner: userId });

    res.json({ vehicles });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
