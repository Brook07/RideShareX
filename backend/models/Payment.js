const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  // Reference to booking
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  // User who made the payment
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // Vehicle owner who receives the payment
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // Vehicle being paid for
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },
  // Amount breakdown
  amount: {
    baseFare: {
      type: Number,
      required: true
    },
    distanceFare: {
      type: Number,
      default: 0
    },
    serviceFee: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  // Payment method (DEMO)
  paymentMethod: {
    type: String,
    enum: ['Demo Wallet', 'Demo QR Pay', 'Cash'],
    required: true
  },
  // Payment status
  status: {
    type: String,
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED'],
    default: 'PENDING'
  },
  // Demo transaction ID
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  // When payment was initiated
  initiatedAt: {
    type: Date,
    default: Date.now
  },
  // When payment was completed
  completedAt: {
    type: Date,
    default: null
  },
  // Failure reason if any
  failureReason: {
    type: String,
    default: null
  },
  // Demo: Random success/failure (10% fail rate)
  isDemoTransaction: {
    type: Boolean,
    default: true
  },
  // Additional metadata
  metadata: {
    ipAddress: String,
    userAgent: String,
    deviceType: String
  }
}, {
  timestamps: true
});

// Index for quick lookups
paymentSchema.index({ booking: 1 });
paymentSchema.index({ user: 1 });
// transactionId already indexed via unique: true
paymentSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Payment", paymentSchema);
