const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    // Icon key — resolved to a react-icon on the client (see src/lib/serviceIcons.js)
    icon: {
      type: String,
      default: "settings",
      trim: true,
    },
    // Bullet-point features shown on the service card
    features: {
      type: [String],
      default: [],
    },
    // Display order (rendered as 01, 02, ... on the card)
    order: {
      type: Number,
      default: 0,
    },
    // When true, the service is shown on the public client site (the "tick")
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
