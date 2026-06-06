require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;

// Attempt the MongoDB connection. This is intentionally non-blocking:
// the server still starts even if MONGODB_URI isn't set yet, so you can
// keep building while you wire up the database part-by-part.
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
