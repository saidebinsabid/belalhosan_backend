const Profile = require("../models/profile.model");

// GET /api/profile  (public) — returns the single profile (creates a blank one if none).
const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json({ success: true, profile });
  } catch (err) {
    next(err);
  }
};

// GET /api/profile/socials  (public) — just the social links (for the navbar)
const getSocials = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    // Only the ones the admin has enabled (visible) on the public site.
    const socials = (profile?.socials || []).filter((s) => s.enabled !== false);
    res.json({ success: true, socials });
  } catch (err) {
    next(err);
  }
};

// GET /api/profile/contact  (public) — contact info (phone/email/etc.)
const getContact = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, contact: profile?.contact || {} });
  } catch (err) {
    next(err);
  }
};

// PUT /api/profile  (admin) — updates (or creates) the single profile.
const updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      title,
      bio,
      location,
      profileImage,
      stats,
      skills,
      experience,
      achievements,
      expertiseCards,
      experienceSummary,
      highlightStats,
      socials,
      contact,
    } = req.body;

    const update = {
      name,
      title,
      bio,
      location,
      profileImage,
      stats,
      skills,
      experience,
      achievements,
      expertiseCards,
      experienceSummary,
      highlightStats,
      socials,
      contact,
    };
    // Drop keys that weren't sent so we never overwrite with undefined
    Object.keys(update).forEach(
      (k) => update[k] === undefined && delete update[k]
    );

    const profile = await Profile.findOneAndUpdate({}, update, {
      upsert: true,
      returnDocument: "after",
      runValidators: true,
      setDefaultsOnInsert: true,
    });

    res.json({ success: true, message: "Profile updated", profile });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, getSocials, getContact, updateProfile };
