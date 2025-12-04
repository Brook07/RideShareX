const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String, // ONLY ONE FIELD FOR TEST
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
