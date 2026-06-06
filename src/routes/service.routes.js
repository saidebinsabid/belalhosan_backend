const express = require("express");
const ctrl = require("../controllers/service.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// ── Public ───────────────────────────────────────────────
// Only published services — used by the client "What I Offer" section.
router.get("/published", ctrl.getPublishedServices);

// ── Admin (require a valid JWT) ──────────────────────────
router.get("/", protect, ctrl.getAllServices);
router.get("/:id", protect, ctrl.getServiceById);
router.post("/", protect, ctrl.createService);
router.put("/:id", protect, ctrl.updateService);
router.patch("/:id/publish", protect, ctrl.setPublish);
router.delete("/:id", protect, ctrl.deleteService);

module.exports = router;
