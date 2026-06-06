const express = require("express");
const multer = require("multer");
const { protect } = require("../middlewares/auth.middleware");
const { uploadImage } = require("../controllers/upload.controller");

// Keep the file in memory; we stream its buffer to Cloudinary.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const router = express.Router();

router.post("/", protect, upload.single("image"), uploadImage);

module.exports = router;
