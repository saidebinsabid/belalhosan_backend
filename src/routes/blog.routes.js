const express = require("express");
const ctrl = require("../controllers/blog.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// ── Public ───────────────────────────────────────────────
router.get("/published", ctrl.getPublishedBlogs);
router.get("/slug/:slug", ctrl.getBlogBySlug);

// ── Admin (require a valid JWT) ──────────────────────────
router.get("/", protect, ctrl.getAllBlogs);
router.get("/:id", protect, ctrl.getBlogById);
router.post("/", protect, ctrl.createBlog);
router.put("/:id", protect, ctrl.updateBlog);
router.patch("/:id/publish", protect, ctrl.setPublish);
router.delete("/:id", protect, ctrl.deleteBlog);

module.exports = router;
