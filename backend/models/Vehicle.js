const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  plateNumber: {
    type: String,
    default: null // remove unique
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
