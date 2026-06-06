const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    // Role / job title, e.g. "Production Manager"
    designation: {
      type: String,
      default: "",
      trim: true,
    },
    // Company / organization, e.g. "Jo Young Engineering, Korea"
    company: {
      type: String,
      default: "",
      trim: true,
    },
    // The review text
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    // Display order on the page
    order: {
      type: Number,
      default: 0,
    },
    // When true, shown on the public client site (the "tick")
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
