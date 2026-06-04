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
    enum: ["pending", "approved", "rejected", "in progress", "completed"],
    default: "pending",
  },

  price: {
    type: Number,
    default: 0,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Request", requestSchema);
