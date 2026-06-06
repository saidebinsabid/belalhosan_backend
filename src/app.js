const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// ── CORS ─────────────────────────────────────────────────────────
// Allow the Next.js client to call this API. CLIENT_URL in .env can be
// a comma-separated list of allowed origins.
const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:3000,http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser clients (curl/Postman — no Origin header)
      if (!origin) return callback(null, true);
      // Allow explicitly configured origins
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // In development, allow any localhost / 127.0.0.1 port
      if (
        process.env.NODE_ENV !== "production" &&
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

// ── Body parsing & logging ───────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ── Routes ───────────────────────────────────────────────────────
app.use("/api", routes);

// ── 404 + central error handler (must stay last) ─────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
