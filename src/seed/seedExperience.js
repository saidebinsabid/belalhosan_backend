require("dotenv").config();
const mongoose = require("mongoose");
const Experience = require("../models/experience.model");

// Work experience (from the About page) seeded as starting data.
const EXPERIENCES = [
  {
    role: "Senior CNC Programmer",
    company: "Jo Young Engineering",
    location: "Korea 🇰🇷",
    period: "2019 — Present",
    desc: "Leading CNC programming and CAM design for high-precision die-mould components. Responsible for PowerMill programming, toolpath optimization, and quality control of complex 5-axis machining operations.",
    current: true,
    order: 1,
    isPublished: true,
  },
  {
    role: "CNC Programmer",
    company: "Precision Manufacturing BD",
    location: "Dhaka, Bangladesh",
    period: "2015 — 2019",
    desc: "CNC programming using PowerMill for die-mould components. Managed toolpath strategies, reduced cycle times by 30%, and trained junior programmers on CAM software.",
    current: false,
    order: 2,
    isPublished: true,
  },
  {
    role: "CNC Operator",
    company: "TechMold Industries",
    location: "Dhaka, Bangladesh",
    period: "2013 — 2015",
    desc: "Started career as CNC machine operator. Learned precision machining fundamentals, G-code programming, and machine setup for mould manufacturing.",
    current: false,
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

    for (const x of EXPERIENCES) {
      // Upsert by role + company so re-running doesn't duplicate.
      await Experience.updateOne(
        { role: x.role, company: x.company },
        { $set: x },
        { upsert: true }
      );
      console.log(`  ↳ upserted: ${x.role} @ ${x.company}`);
    }

    const count = await Experience.countDocuments();
    console.log(`✅ Seed complete. Total experiences in DB: ${count}`);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
})();
