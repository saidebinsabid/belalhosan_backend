const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    // URL slug — unique, auto-generated from the title when not provided
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: { type: String, default: "", trim: true },
    category: { type: String, default: "", trim: true },
    emoji: { type: String, default: "📝", trim: true },
    // Display date string, e.g. "May 5, 2025"
    date: { type: String, default: "", trim: true },
    readTime: { type: String, default: "", trim: true },
    // Article body — markdown-lite: blank-line separated paragraphs,
    // lines starting with "## " render as headings.
    content: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
