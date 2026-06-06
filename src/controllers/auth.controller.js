const User = require("../models/user.model");
const { signToken } = require("../utils/jwt");

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // password has select:false, so explicitly include it
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = signToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me  (protected) — returns the current user from the token
const me = async (req, res) => {
  res.json({ success: true, user: req.user });
};

module.exports = { login, me };
