const Vehicle = require("../models/Vehicle");

exports.addVehicle = async (req, res) => {
  try {
    const userId = req.user.id;

    const newVehicle = await Vehicle.create({
      owner: userId,
      ...req.body
    });

    res.json({ vehicle: newVehicle });
  } catch (error) {
    console.error("Add vehicle error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.user.id });
    res.json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
