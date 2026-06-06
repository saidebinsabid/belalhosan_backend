const express = require("express");
const ctrl = require("../controllers/testimonial.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// ── Public ───────────────────────────────────────────────
router.get("/published", ctrl.getPublishedTestimonials);

// ── Admin (require a valid JWT) ──────────────────────────
router.get("/", protect, ctrl.getAllTestimonials);
router.get("/:id", protect, ctrl.getTestimonialById);
router.post("/", protect, ctrl.createTestimonial);
router.put("/:id", protect, ctrl.updateTestimonial);
router.patch("/:id/publish", protect, ctrl.setPublish);
router.delete("/:id", protect, ctrl.deleteTestimonial);

module.exports = router;
