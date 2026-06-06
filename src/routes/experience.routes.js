const express = require("express");
const ctrl = require("../controllers/experience.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// ── Public ───────────────────────────────────────────────
router.get("/published", ctrl.getPublishedExperiences);

// ── Admin (require a valid JWT) ──────────────────────────
router.get("/", protect, ctrl.getAllExperiences);
router.get("/:id", protect, ctrl.getExperienceById);
router.post("/", protect, ctrl.createExperience);
router.put("/:id", protect, ctrl.updateExperience);
router.patch("/:id/publish", protect, ctrl.setPublish);
router.delete("/:id", protect, ctrl.deleteExperience);

module.exports = router;
