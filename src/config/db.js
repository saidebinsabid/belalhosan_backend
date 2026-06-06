const mongoose = require("mongoose");

// Cache the connection across warm serverless invocations (Vercel reuses the
// module between requests). Without this, every invocation would reconnect or
// fire-and-forget, which causes "buffering timed out" errors.
let cached = global.__mongooseConn;
if (!cached) cached = global.__mongooseConn = { conn: null, promise: null };

// Returns the live mongoose connection — connects on first use, reuses it after.
// Safe to call on every request (cheap once connected). If MONGODB_URI is missing
// it logs a warning and returns null instead of crashing.
const connectDB = async () => {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn(
      "⚠️  MONGODB_URI is not set — skipping DB connection. Add it to .env / Vercel env."
    );
    return null;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 8000 })
      .then((m) => {
        console.log(`✅ MongoDB connected: ${m.connection.host}`);
        return m;
      })
      .catch((err) => {
        cached.promise = null; // let the next request retry
        console.error(`❌ MongoDB connection error: ${err.message}`);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
