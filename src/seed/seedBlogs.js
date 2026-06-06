require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("../models/blog.model");

// The blogs currently on the site, seeded as demo data.
const BLOGS = [
  {
    slug: "powermill-5-axis-machining-guide",
    title: "Complete Guide to 5-Axis Machining in PowerMill",
    excerpt:
      "A comprehensive walkthrough of 5-axis simultaneous machining strategies in Autodesk PowerMill — from setup to final toolpath verification.",
    category: "CNC Programming",
    emoji: "⚙️",
    date: "May 5, 2025",
    readTime: "8 min read",
    order: 1,
    isPublished: true,
    content: `5-axis simultaneous machining is one of the most powerful capabilities in Autodesk PowerMill. It allows cutting tools to approach a workpiece from virtually any direction, enabling complex geometries to be machined in a single setup.

## Setting Up Your Machine

Before programming, ensure your machine definition is correctly configured in PowerMill. This includes the kinematic model, axis limits, and tool center point (TCP) settings. Incorrect machine setup is the leading cause of collisions.

## Choosing the Right Strategy

For die-mould components, 3+2 (positional 5-axis) is often more efficient than full simultaneous. Use simultaneous only when undercuts or complex curved surfaces genuinely require continuous axis motion.

## Toolpath Verification

Always simulate with the full machine model before sending to the machine. Use PowerMill's ViewMill for material removal simulation and check for collisions using the machine simulation tool.`,
  },
  {
    slug: "die-mould-manufacturing-tips",
    title: "Top 10 Tips for Precision Die-Mould Manufacturing",
    excerpt:
      "Practical tips from 9+ years of hands-on die-mould experience — covering material selection, tolerances, and surface finish optimization.",
    category: "Die-Mould",
    emoji: "🔧",
    date: "Apr 20, 2025",
    readTime: "6 min read",
    order: 2,
    isPublished: true,
    content: `After 9+ years in precision die-mould manufacturing, these tips consistently deliver better results across automotive, electronics, and industrial projects.

## 1. Material Selection Matters

Choose the correct steel grade for your application. P20 is great for general injection moulds, while H13 excels in high-temperature die casting applications.

## 2. Plan Your Machining Sequence

Always rough first, semi-finish, then finish. Never skip the semi-finishing stage for critical surfaces. This removes heat-induced stress and ensures consistent stock for the finishing pass.

## 3. Tolerance Stack-up Awareness

Consider how individual tolerances combine in an assembly. A ±0.01mm tolerance on each of 5 components can result in a ±0.05mm variation at the final assembly.`,
  },
  {
    slug: "powermill-toolpath-optimization",
    title: "How to Optimize Toolpaths for Faster Cycle Times",
    excerpt:
      "Learn how to reduce machining cycle time by 30-40% using advanced toolpath strategies, step-down optimization, and HSM settings in PowerMill.",
    category: "CAM Design",
    emoji: "🏭",
    date: "Apr 10, 2025",
    readTime: "7 min read",
    order: 3,
    isPublished: true,
    content: `Reducing cycle time without sacrificing quality is the holy grail of CNC programming. Here are strategies to achieve 30-40% faster cycle times in PowerMill.

## Step-Down Optimization

With the right tooling and material, you can often increase step-down by 20-30% during roughing without affecting tool life. Always verify with cutting data charts.

## High-Speed Machining (HSM)

HSM strategies in PowerMill — especially Optimized Constant Z and Steep and Shallow — dramatically reduce air-cutting time by maintaining consistent chip load.`,
  },
  {
    slug: "cnc-programming-career-bangladesh",
    title: "CNC Programming Career Path in Bangladesh",
    excerpt:
      "A detailed guide on how to start and grow a CNC programming career in Bangladesh — required skills, tools, salary expectations, and opportunities abroad.",
    category: "Career",
    emoji: "🎓",
    date: "Mar 28, 2025",
    readTime: "10 min read",
    order: 4,
    isPublished: true,
    content: `CNC programming is one of the most in-demand technical skills in Bangladesh's growing manufacturing sector. Here's everything you need to start and advance your career.

## Required Skills

Start with technical drawing and basic machining fundamentals. Then learn a CAM software — PowerMill is the most valued in precision manufacturing.

## Career Progression

Typical path: CNC Operator → CNC Programmer → Senior Programmer → CAM Engineer → Department Lead. Each step takes 2-3 years with dedicated practice.`,
  },
  {
    slug: "powermill-vs-mastercam",
    title: "PowerMill vs Mastercam: Which is Better for Die-Mould?",
    excerpt:
      "An honest comparison of Autodesk PowerMill and Mastercam for precision die-mould manufacturing — features, learning curve, and industry adoption.",
    category: "Tools",
    emoji: "📊",
    date: "Mar 15, 2025",
    readTime: "9 min read",
    order: 5,
    isPublished: true,
    content: `Both PowerMill and Mastercam are industry-leading CAM solutions, but they excel in different areas. Here's an honest comparison based on real-world experience.

## PowerMill Strengths

PowerMill dominates in high-speed 5-axis machining of complex mould surfaces. Its toolpath strategies for steep and shallow areas and barrel cutters are unmatched.

## Mastercam Strengths

Mastercam has broader general machining capabilities and is widely used in North America. Its Dynamic Motion toolpaths are excellent for roughing.`,
  },
  {
    slug: "surface-finish-cnc-machining",
    title: "Achieving Perfect Surface Finish in CNC Machining",
    excerpt:
      "Step-by-step techniques to achieve Ra 0.4μm surface finish in CNC milling — tool selection, cutting parameters, and finishing strategies.",
    category: "CNC Programming",
    emoji: "✨",
    date: "Feb 28, 2025",
    readTime: "7 min read",
    order: 6,
    isPublished: true,
    content: `Achieving Ra 0.4μm or better surface finish in CNC milling requires the right combination of tooling, cutting parameters, and toolpath strategies.

## Tool Selection

Use solid carbide ball-nose end mills with TiAlN coating for finishing passes. Smaller diameter tools (6-10mm) with 4 flutes produce better surface finish on complex 3D surfaces.

## Cutting Parameters

High spindle speed with low feed rate is the key. For steel at Ra 0.4μm target: 12,000-15,000 RPM, 800-1200mm/min feed, 0.01-0.05mm step-over.`,
  },
];

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in .env");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const b of BLOGS) {
      await Blog.updateOne({ slug: b.slug }, { $set: b }, { upsert: true });
      console.log(`  ↳ upserted: ${b.title}`);
    }

    const count = await Blog.countDocuments();
    console.log(`✅ Seed complete. Total blogs in DB: ${count}`);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
})();
