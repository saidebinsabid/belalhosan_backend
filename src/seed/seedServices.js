require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../models/service.model");

// The four services currently shown on the site — seeded as dummy data.
const SERVICES = [
  {
    title: "CNC Programming",
    icon: "cpu",
    order: 1,
    isPublished: true,
    description:
      "Expert CNC programming using Autodesk PowerMill for precision machining of complex components in die-mould manufacturing.",
    features: [
      "PowerMill Programming",
      "5-Axis Machining",
      "Toolpath Optimization",
      "Post Processing",
    ],
  },
  {
    title: "CAM Design & Engineering",
    icon: "settings",
    order: 2,
    isPublished: true,
    description:
      "Computer-Aided Manufacturing design for intricate mechanical parts ensuring highest precision and efficiency.",
    features: [
      "CAM Strategy Planning",
      "PowerShape Modeling",
      "Surface Machining",
      "Quality Control",
    ],
  },
  {
    title: "Die-Mould Manufacturing",
    icon: "wrench",
    order: 3,
    isPublished: true,
    description:
      "9+ years of hands-on precision die-mould manufacturing experience across automotive, aerospace, and industrial sectors.",
    features: [
      "Precision Die Making",
      "Mould Design",
      "High Tolerance Work",
      "Complex Geometries",
    ],
  },
  {
    title: "Professional Training",
    icon: "graduation",
    order: 4,
    isPublished: true,
    description:
      "Comprehensive PowerMill & CNC programming training programs designed to upskill manufacturing professionals.",
    features: [
      "PowerMill Basics to Advanced",
      "Hands-on Practice",
      "Industry Projects",
      "Certification Support",
    ],
  },
];

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in .env");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const s of SERVICES) {
      // Upsert by title so re-running the seed doesn't create duplicates.
      await Service.updateOne({ title: s.title }, { $set: s }, { upsert: true });
      console.log(`  ↳ upserted: ${s.title}`);
    }

    const count = await Service.countDocuments();
    console.log(`✅ Seed complete. Total services in DB: ${count}`);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
})();
