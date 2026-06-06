const mongoose = require("mongoose");

// Connects to MongoDB using MONGODB_URI from .env.
// If the URI is missing it logs a warning instead of crashing, so the
// dev server can still boot before the database is configured.
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "⚠️  MONGODB_URI is not set — skipping DB connection. " +
        "Add it to .env when you set up MongoDB."
    );
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    // Intentionally not exiting — keep the server up during development.
  }
};

module.exports = connectDB;
