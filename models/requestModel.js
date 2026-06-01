const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  artType: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  budget: {
    type: Number,
    required: true,
  },

  deadline: {
    type: Date,
    required: true,
  },

  referenceImage: {
    type: String,
  },

  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "In Progress", "Completed"],
    default: "Pending",
  },

  price: {
    type: Number,
    default: 0,
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Request", requestSchema);
