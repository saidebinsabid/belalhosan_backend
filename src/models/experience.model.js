const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    company: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    period: { type: String, default: "", trim: true }, // e.g. "2019 — Present"
    desc: { type: String, default: "", trim: true },
    current: { type: Boolean, default: false }, // currently working here
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false }, // shown on the public site
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
