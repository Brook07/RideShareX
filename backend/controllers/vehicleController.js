const Vehicle = require("../models/Vehicle");

exports.addVehicle = async (req, res) => {
  try {
    const userId = req.userId; // from middleware
    const { name, make, model, year, seats, location, fuelType, image, plateNumber, pricePerDay, type } = req.body;

    // Validation
    if (!name || !make || !model || !year || !seats || !location || !fuelType || pricePerDay === undefined || !type) {
      return res.status(400).json({ message: "All fields are required including pricePerDay and type" });
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
      image: image || '/photos/default-car.jpg',
      plateNumber: plateNumber || null,
      pricePerDay,
      type
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
    const Booking = require("../models/Booking");
    const currentDate = new Date();
    
    // Find all confirmed bookings that are currently active or in the future
    const activeBookings = await Booking.find({
      status: 'CONFIRMED',
      dropoffDate: { $gte: currentDate } // Booking hasn't ended yet
    }).select('vehicle');
    
    // Extract vehicle IDs that are currently booked
    const bookedVehicleIds = activeBookings.map(booking => booking.vehicle.toString());
    
    // Get all vehicles except the ones that are currently booked
    const vehicles = await Vehicle.find({
      _id: { $nin: bookedVehicleIds }
    }).populate("owner", "name email");
    
    res.json({ vehicles });
  } catch (err) {
    console.error("Get all vehicles error:", err);
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

