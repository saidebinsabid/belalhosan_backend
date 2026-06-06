const express = require("express");
const { healthCheck } = require("../controllers/health.controller");
const connectDB = require("../config/db");

const router = express.Router();

// GET /api/health → confirms the API (and DB state) is alive (no DB needed)
router.get("/health", healthCheck);

// Ensure MongoDB is connected before any data route below (serverless-safe).
router.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Auth (login, me)
router.use("/auth", require("./auth.routes"));

// Services (offerings shown on the public site)
router.use("/services", require("./service.routes"));

// Testimonials (client reviews shown on the public site)
router.use("/testimonials", require("./testimonial.routes"));

// Profile / About (singleton — stats, bio, skills, image)
router.use("/profile", require("./profile.routes"));

// Work experience (shown on the About page)
router.use("/experiences", require("./experience.routes"));

// Blog (articles shown on the public /blog pages)
router.use("/blogs", require("./blog.routes"));

// Projects (portfolio work shown on the /projects page)
router.use("/projects", require("./project.routes"));

// Image upload (Cloudinary)
router.use("/upload", require("./upload.routes"));

// Mount more feature routers here as you build them, e.g.:
// router.use("/projects", require("./project.routes"));
// router.use("/contact", require("./contact.routes"));

module.exports = router;
