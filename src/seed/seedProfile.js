require("dotenv").config();
const mongoose = require("mongoose");
const Profile = require("../models/profile.model");

// Current about/home data seeded as the starting profile.
const PROFILE = {
  name: "Belal Hossain Sunny",
  title: "CNC Programmer & CAM Specialist",
  bio: "Experienced CNC Programmer & CAM Specialist with 9+ years in Precision Die-Mould Manufacturing. Currently at Jo Young Engineering, Korea — delivering world-class machining solutions using Autodesk PowerMill & PowerShape.",
  location: "Dhaka, Bangladesh · Jo Young Engineering, Korea",
  profileImage: "/heroimage.png",
  stats: {
    years: "9+",
    projects: "200+",
    students: "500+",
    followers: "2.5K+",
    precision: "100%",
  },
  skills: [
    { name: "Autodesk PowerMill", level: 98 },
    { name: "Autodesk PowerShape", level: 92 },
    { name: "5-Axis CNC Programming", level: 90 },
    { name: "Die-Mould Manufacturing", level: 95 },
    { name: "CAM Strategy Planning", level: 93 },
    { name: "Post Processor Configuration", level: 85 },
  ],
  experience: [
    {
      role: "Senior CNC Programmer",
      company: "Jo Young Engineering",
      location: "Korea 🇰🇷",
      period: "2019 — Present",
      desc: "Leading CNC programming and CAM design for high-precision die-mould components. Responsible for PowerMill programming, toolpath optimization, and quality control of complex 5-axis machining operations.",
      current: true,
    },
    {
      role: "CNC Programmer",
      company: "Precision Manufacturing BD",
      location: "Dhaka, Bangladesh",
      period: "2015 — 2019",
      desc: "CNC programming using PowerMill for die-mould components. Managed toolpath strategies, reduced cycle times by 30%, and trained junior programmers on CAM software.",
      current: false,
    },
    {
      role: "CNC Operator",
      company: "TechMold Industries",
      location: "Dhaka, Bangladesh",
      period: "2013 — 2015",
      desc: "Started career as CNC machine operator. Learned precision machining fundamentals, G-code programming, and machine setup for mould manufacturing.",
      current: false,
    },
  ],
  achievements: [
    "Successfully programmed 200+ complex die-mould components using PowerMill",
    "Reduced machining cycle time by 35% through optimized toolpath strategies",
    "Trained 500+ students in PowerMill and CNC programming",
    "Achieved ±0.003mm tolerance on aerospace turbine blade prototypes",
    "Led CNC department at Jo Young Engineering Korea",
    "Expert in 5-axis simultaneous machining for complex geometries",
    "Zero scrap rate maintained across critical precision projects",
    "2,500+ LinkedIn followers in manufacturing community",
  ],
  expertiseCards: [
    { icon: "cpu", title: "CNC Programming", count: "200+", unit: "Projects", desc: "Autodesk PowerMill & PowerShape expert programming for precision components." },
    { icon: "pen", title: "CAM Design", count: "150+", unit: "Projects", desc: "Computer-aided manufacturing design for complex mechanical parts." },
    { icon: "layers", title: "Die-Mould Manufacturing", count: "180+", unit: "Projects", desc: "9+ years of precision die-mould manufacturing experience." },
    { icon: "graduation", title: "Professional Training", count: "500+", unit: "Students", desc: "PowerMill & CNC programming training for industry professionals." },
  ],
  experienceSummary:
    "Experienced CNC Programmer using Autodesk PowerMill & PowerShape for programming. Successfully finished many projects in Precision Die-Mould Manufacturing with 5+ years of team expertise.",
  // "Project Complete" intentionally omitted — it's shown from stats.projects
  // (single source) so the projects number is edited in only one place.
  highlightStats: [
    { value: "10k+", label: "Happy Clients" },
    { value: "200+", label: "Client Reviews" },
    { value: "1,000+", label: "Satisfied Clients" },
  ],
  socials: [
    { icon: "instagram", url: "https://instagram.com/belalhossainsunny" },
    { icon: "linkedin", url: "https://www.linkedin.com/in/belal-hossain-sunny-6195b0119/" },
    { icon: "facebook", url: "https://facebook.com/belalhossainsunny" },
    { icon: "twitter", url: "https://twitter.com/belalhossainsunny" },
    { icon: "whatsapp", url: "https://wa.me/8801765001752" },
  ],
  contact: {
    phone: "+880 1765-001752",
    email: "belalhossainsunny@gmail.com",
    whatsapp: "8801765001752",
    address: "Dhaka, Bangladesh",
  },
};

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in .env");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Upsert the single profile document.
    await Profile.findOneAndUpdate({}, { $set: PROFILE }, { upsert: true });
    console.log("✅ Profile seeded for:", PROFILE.name);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
})();
