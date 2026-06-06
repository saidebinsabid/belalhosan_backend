const Experience = require("../models/experience.model");

// GET /api/experiences/published  (public) — only published, ordered
const getPublishedExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find({ isPublished: true }).sort({
      order: 1,
      createdAt: 1,
    });
    res.json({ success: true, count: experiences.length, experiences });
  } catch (err) {
    next(err);
  }
};

// GET /api/experiences  (admin) — all, ordered
const getAllExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: experiences.length, experiences });
  } catch (err) {
    next(err);
  }
};

// GET /api/experiences/:id  (admin)
const getExperienceById = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.json({ success: true, experience });
  } catch (err) {
    next(err);
  }
};

// POST /api/experiences  (admin)
const createExperience = async (req, res, next) => {
  try {
    const { role, company, location, period, desc, current, order, isPublished } =
      req.body;
    const experience = await Experience.create({
      role,
      company,
      location,
      period,
      desc,
      current,
      order,
      isPublished,
    });
    res
      .status(201)
      .json({ success: true, message: "Experience created", experience });
  } catch (err) {
    next(err);
  }
};

// PUT /api/experiences/:id  (admin)
const updateExperience = async (req, res, next) => {
  try {
    const { role, company, location, period, desc, current, order, isPublished } =
      req.body;
    const update = { role, company, location, period, desc, current, order, isPublished };
    Object.keys(update).forEach(
      (k) => update[k] === undefined && delete update[k]
    );

    const experience = await Experience.findByIdAndUpdate(req.params.id, update, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.json({ success: true, message: "Experience updated", experience });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/experiences/:id/publish  (admin) — the tick
const setPublish = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { isPublished: !!req.body.isPublished },
      { returnDocument: "after" }
    );
    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.json({
      success: true,
      message: experience.isPublished ? "Experience is now live" : "Experience hidden",
      experience,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/experiences/:id  (admin)
const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.json({ success: true, message: "Experience deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPublishedExperiences,
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  setPublish,
  deleteExperience,
};
