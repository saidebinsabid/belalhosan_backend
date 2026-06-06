require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("../models/project.model");

// The projects currently on the site, seeded as demo data.
const PROJECTS = [
  {
    title: "Precision CNC Machining — Die Component",
    category: "CNC Programming",
    client: "Jo Young Engineering, Korea",
    duration: "45 Days",
    tools: ["PowerMill", "5-Axis CNC", "CMM Inspection"],
    description:
      "High-precision CNC machining of complex die components using Autodesk PowerMill. Multi-axis toolpath strategies applied for optimal surface finish and dimensional accuracy.",
    results: ["±0.005mm precision", "Mirror finish", "On-time delivery"],
    photo:
      "https://media.licdn.com/dms/image/v2/D5622AQEB28O5drfYmA/feedshare-shrink_800/B56Z2v2hB5HgAc-/0/1776771797362?e=1779926400&v=beta&t=f4O77gv9WacOVPoMTNz1RoYE_SHq0JtHfBvZt5X4iuE",
    order: 1,
    isPublished: true,
  },
  {
    title: "PowerMill CAM Programming — Mould Core",
    category: "CAM Design",
    client: "Jo Young Engineering, Korea",
    duration: "30 Days",
    tools: ["PowerMill", "PowerShape", "3D Inspection"],
    description:
      "Advanced CAM programming for mould core machining. Complex 3D surface strategies with collision-free toolpaths, high-speed finishing, and post-processor optimization.",
    results: ["Zero collision", "Ra 0.4μm finish", "35% faster cycle"],
    photo:
      "https://media.licdn.com/dms/image/v2/D4D22AQHtC5q2AkEaeA/feedshare-image-high-res/B4DZx1ois8GUAU-/0/1771500088480?e=1779926400&v=beta&t=cTIQe4A9JLfsR55L2xL0_LUKzFNsBcKjlS3krTEDiUA",
    order: 2,
    isPublished: true,
  },
  {
    title: "Die-Mould Manufacturing — Automotive Part",
    category: "Die-Mould",
    client: "Automotive OEM — Korea",
    duration: "60 Days",
    tools: ["PowerMill", "Wire Cut EDM", "5-Axis CNC"],
    description:
      "Complete die-mould manufacturing for automotive stamped component. From raw material to finished mould including all precision machining, EDM, and assembly stages.",
    results: ["500K+ strokes", "±0.01mm flatness", "100% QC pass"],
    photo:
      "https://media.licdn.com/dms/image/v2/D5622AQFM3v27sZ6wEg/feedshare-shrink_1280/B56ZuoBTi1GsAc-/0/1768050473322?e=1779926400&v=beta&t=qhRBbXnDD4blafOtPQV-WUM937j8JeD6jgQdVP3v7fE",
    order: 3,
    isPublished: true,
  },
];

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in .env");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const p of PROJECTS) {
      await Project.updateOne({ title: p.title }, { $set: p }, { upsert: true });
      console.log(`  ↳ upserted: ${p.title}`);
    }

    const count = await Project.countDocuments();
    console.log(`✅ Seed complete. Total projects in DB: ${count}`);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
})();
