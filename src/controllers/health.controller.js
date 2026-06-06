const mongoose = require("mongoose");

const DB_STATES = ["disconnected", "connected", "connecting", "disconnecting"];

// GET /api/health
const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Belal Hossain backend API is running",
    database: DB_STATES[mongoose.connection.readyState] || "unknown",
    timestamp: new Date().toISOString(),
  });
};

module.exports = { healthCheck };
