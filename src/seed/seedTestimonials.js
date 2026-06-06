require("dotenv").config();
const mongoose = require("mongoose");
const Testimonial = require("../models/testimonial.model");

// Demo testimonials (from the current site) seeded as starting data.
const TESTIMONIALS = [
  {
    name: "Rahman Al-Farsi",
    designation: "Production Manager",
    company: "Jo Young Engineering, Korea",
    rating: 5,
    order: 1,
    isPublished: true,
    feedback:
      "Belal is an exceptional CNC programmer. His expertise in PowerMill is unmatched. He consistently delivers precision work on complex die-mould components ahead of schedule.",
  },
  {
    name: "Md. Karim Hossain",
    designation: "Senior Engineer",
    company: "Dhaka Manufacturing Ltd.",
    rating: 5,
    order: 2,
    isPublished: true,
    feedback:
      "Working with Belal on our precision machining projects was outstanding. His deep knowledge of Autodesk PowerMill and PowerShape helped us achieve tolerances we thought impossible.",
  },
  {
    name: "Ahmed Reza",
    designation: "Workshop Owner",
    company: "Reza CNC Workshop",
    rating: 5,
    order: 3,
    isPublished: true,
    feedback:
      "Took Belal's PowerMill training course — absolutely transformative. His teaching style is practical, hands-on, and perfectly suited for industry professionals.",
  },
  {
    name: "Sanjida Akter",
    designation: "CAM Designer",
    company: "TechMold Bangladesh",
    rating: 5,
    order: 4,
    isPublished: true,
    feedback:
      "Belal helped our team transition from basic CNC work to advanced die-mould manufacturing. His mentorship and technical guidance have been invaluable to our growth.",
  },
  {
    name: "Tariq Mahmud",
    designation: "Factory Director",
    company: "Precision Tools BD",
    rating: 5,
    order: 5,
    isPublished: true,
    feedback:
      "We've collaborated with Belal on several high-precision mould projects. His attention to detail, programming accuracy and professional approach sets him apart from others.",
  },
  {
    name: "Nasrin Sultana",
    designation: "CNC Operator",
    company: "MechPro Industries",
    rating: 5,
    order: 6,
    isPublished: true,
    feedback:
      "The PowerMill training by Belal sir completely changed my career trajectory. I went from a basic operator to a senior CNC programmer in just 6 months.",
  },
];

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in .env");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const t of TESTIMONIALS) {
      // Upsert by name so re-running doesn't create duplicates.
      await Testimonial.updateOne({ name: t.name }, { $set: t }, { upsert: true });
      console.log(`  ↳ upserted: ${t.name}`);
    }

    const count = await Testimonial.countDocuments();
    console.log(`✅ Seed complete. Total testimonials in DB: ${count}`);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
})();
