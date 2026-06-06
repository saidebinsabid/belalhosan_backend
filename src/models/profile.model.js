const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, default: "", trim: true },
    level: { type: Number, default: 80, min: 0, max: 100 },
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, default: "", trim: true },
    company: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    period: { type: String, default: "", trim: true },
    desc: { type: String, default: "", trim: true },
    current: { type: Boolean, default: false },
  },
  { _id: false }
);

// "What I Do" expertise card (StatsSection top row)
const expertiseCardSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "cpu", trim: true },
    title: { type: String, default: "", trim: true },
    count: { type: String, default: "", trim: true },
    unit: { type: String, default: "", trim: true },
    desc: { type: String, default: "", trim: true },
  },
  { _id: false }
);

// Highlight stat (StatsSection 2×2 grid)
const highlightStatSchema = new mongoose.Schema(
  {
    value: { type: String, default: "", trim: true },
    label: { type: String, default: "", trim: true },
  },
  { _id: false }
);

// Social media link (icon key + URL) — shown in the navbar, etc.
const socialSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "instagram", trim: true },
    url: { type: String, default: "", trim: true },
    enabled: { type: Boolean, default: true }, // shown on the public site
  },
  { _id: false }
);

// Singleton — there is only ever ONE profile document.
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    title: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    // Image URL (Cloudinary upload result or a pasted link)
    profileImage: { type: String, default: "" },
    stats: {
      years: { type: String, default: "" },
      projects: { type: String, default: "" },
      students: { type: String, default: "" },
      followers: { type: String, default: "" },
      precision: { type: String, default: "" },
    },
    skills: { type: [skillSchema], default: [] },
    experience: { type: [experienceSchema], default: [] },
    achievements: { type: [String], default: [] },
    // "My Expertise & Achievements" home section
    expertiseCards: { type: [expertiseCardSchema], default: [] },
    experienceSummary: { type: String, default: "" },
    highlightStats: { type: [highlightStatSchema], default: [] },
    // Social media links (managed from the dashboard)
    socials: { type: [socialSchema], default: [] },
    // Contact info (managed from the dashboard, shown in header/footer)
    contact: {
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      address: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
