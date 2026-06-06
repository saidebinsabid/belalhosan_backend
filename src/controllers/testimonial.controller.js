const Testimonial = require("../models/testimonial.model");

// Clamp an incoming rating to an integer in [1, 5].
const clampRating = (r) => {
  const n = Number(r);
  if (Number.isNaN(n)) return 5;
  return Math.min(5, Math.max(1, Math.round(n)));
};

// GET /api/testimonials/published  (public) — only published, ordered
const getPublishedTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true }).sort({
      order: 1,
      createdAt: 1,
    });
    res.json({ success: true, count: testimonials.length, testimonials });
  } catch (err) {
    next(err);
  }
};

// GET /api/testimonials  (admin) — all, ordered
const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: testimonials.length, testimonials });
  } catch (err) {
    next(err);
  }
};

// GET /api/testimonials/:id  (admin)
const getTestimonialById = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.json({ success: true, testimonial });
  } catch (err) {
    next(err);
  }
};

// POST /api/testimonials  (admin)
const createTestimonial = async (req, res, next) => {
  try {
    const { name, designation, company, feedback, rating, order, isPublished } =
      req.body;
    const testimonial = await Testimonial.create({
      name,
      designation,
      company,
      feedback,
      rating: clampRating(rating),
      order,
      isPublished,
    });
    res
      .status(201)
      .json({ success: true, message: "Testimonial created", testimonial });
  } catch (err) {
    next(err);
  }
};

// PUT /api/testimonials/:id  (admin)
const updateTestimonial = async (req, res, next) => {
  try {
    const { name, designation, company, feedback, rating, order, isPublished } =
      req.body;

    const update = { name, designation, company, feedback, order, isPublished };
    if (rating !== undefined) update.rating = clampRating(rating);
    Object.keys(update).forEach(
      (k) => update[k] === undefined && delete update[k]
    );

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      update,
      { returnDocument: "after", runValidators: true }
    );
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.json({ success: true, message: "Testimonial updated", testimonial });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/testimonials/:id/publish  (admin) — the tick
const setPublish = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isPublished: !!req.body.isPublished },
      { returnDocument: "after" }
    );
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.json({
      success: true,
      message: testimonial.isPublished ? "Testimonial is now live" : "Testimonial hidden",
      testimonial,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/testimonials/:id  (admin)
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPublishedTestimonials,
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  setPublish,
  deleteTestimonial,
};
