const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // User who is booking the vehicle
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // Vehicle being booked
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },
  // Owner of the vehicle (for easy querying)
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // Booking dates
  pickupDate: {
    type: Date,
    required: true
  },
  dropoffDate: {
    type: Date,
    required: true
  },
  // Number of days
  totalDays: {
    type: Number,
    required: true,
    min: 1
  },
  // Price details
  pricePerDay: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  // Booking status
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'AWAITING_PAYMENT', 'REJECTED', 'EXPIRED', 'CANCELLED', 'COMPLETED'],
    default: 'PENDING'
  },
  // Payment status
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  transactionId: {
    type: String,
    default: null
  },
  paidAt: {
    type: Date,
    default: null
  },
  // When booking was created
  bookingTime: {
    type: Date,
    default: Date.now
  },
  // When the booking request expires (5 hours from creation)
  expiresAt: {
    type: Date,
    required: true
  },
  // Optional message from user to owner
  message: {
    type: String,
    default: ""
  },
  // Reason for rejection (if rejected)
  rejectionReason: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

// Index for auto-expiration queries
bookingSchema.index({ status: 1, expiresAt: 1 });

// Index for user queries
bookingSchema.index({ user: 1, status: 1 });

// Index for owner queries
bookingSchema.index({ owner: 1, status: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
