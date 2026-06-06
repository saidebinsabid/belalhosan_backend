const jwt = require("jsonwebtoken");

// Sign a JWT. Expiry comes from JWT_EXPIRES_IN (default 7 days).
const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// Verify a JWT — throws if invalid/expired.
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { signToken, verifyToken };
