const express = require("express");
const ctrl = require("../controllers/project.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// ── Public ───────────────────────────────────────────────
router.get("/published", ctrl.getPublishedProjects);

// ── Admin (require a valid JWT) ──────────────────────────
router.get("/", protect, ctrl.getAllProjects);
router.get("/:id", protect, ctrl.getProjectById);
router.post("/", protect, ctrl.createProject);
router.put("/:id", protect, ctrl.updateProject);
router.patch("/:id/publish", protect, ctrl.setPublish);
router.delete("/:id", protect, ctrl.deleteProject);

module.exports = router;
