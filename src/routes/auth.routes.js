const express = require("express");
const { login, me } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", login); // POST /api/auth/login
router.get("/me", protect, me); // GET  /api/auth/me (requires token)

module.exports = router;
