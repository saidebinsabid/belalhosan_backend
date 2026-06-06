require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user.model");

// Default admin credentials (temporary — change later from the dashboard).
const ADMIN = {
  name: "Belal Hossain Sunny",
  email: "admin@belalhossain.com",
  password: "Admin@12345",
  role: "admin",
};

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const existing = await User.findOne({ email: ADMIN.email });
    if (existing) {
      console.log(`ℹ️  Admin already exists: ${ADMIN.email}`);
    } else {
      await User.create(ADMIN);
      console.log("✅ Admin user created:");
      console.log(`   email:    ${ADMIN.email}`);
      console.log(`   password: ${ADMIN.password}`);
      console.log(`   role:     ${ADMIN.role}`);
    }
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
})();
