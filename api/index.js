// Vercel serverless entry — exposes the Express app as a serverless function.
// (Vercel doesn't run a long-lived server, so we export `app` instead of
// calling app.listen(). Local dev still uses `npm run dev` → src/server.js.)
require("dotenv").config();

const app = require("../src/app");
const connectDB = require("../src/config/db");

// Connect to MongoDB on cold start. Mongoose buffers queries until the
// connection is ready and reuses it across warm invocations.
connectDB();

module.exports = app;
