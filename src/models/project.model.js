const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: { type: String, default: "", trim: true },
    client: { type: String, default: "", trim: true },
    duration: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    // Tech/tools used (tags)
    tools: { type: [String], default: [] },
    // Key results (tags)
    results: { type: [String], default: [] },
    // Project image — Cloudinary upload result or a pasted URL
    photo: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
