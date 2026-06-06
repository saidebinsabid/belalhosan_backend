const express = require("express");
const { getProfile, getSocials, getContact, updateProfile } = require("../controllers/profile.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/socials", getSocials); // public (lightweight)
router.get("/contact", getContact); // public (lightweight)
router.get("/", getProfile); // public
router.put("/", protect, updateProfile); // admin

module.exports = router;
