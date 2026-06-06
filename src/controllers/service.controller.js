const Service = require("../models/service.model");

// Normalize an incoming features value into a clean string array.
const cleanFeatures = (features) =>
  Array.isArray(features)
    ? features.map((f) => (typeof f === "string" ? f.trim() : "")).filter(Boolean)
    : [];

// GET /api/services/published  (public) — only published, ordered
const getPublishedServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isPublished: true }).sort({
      order: 1,
      createdAt: 1,
    });
    res.json({ success: true, count: services.length, services });
  } catch (err) {
    next(err);
  }
};

// GET /api/services  (admin) — all services, ordered
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: services.length, services });
  } catch (err) {
    next(err);
  }
};

// GET /api/services/:id  (admin) — single service (for the edit form)
const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, service });
  } catch (err) {
    next(err);
  }
};

// POST /api/services  (admin)
const createService = async (req, res, next) => {
  try {
    const { title, description, icon, features, order, isPublished } = req.body;
    const service = await Service.create({
      title,
      description,
      icon,
      features: cleanFeatures(features),
      order,
      isPublished,
    });
    res.status(201).json({ success: true, message: "Service created", service });
  } catch (err) {
    next(err);
  }
};

// PUT /api/services/:id  (admin) — full update from the edit form
const updateService = async (req, res, next) => {
  try {
    const { title, description, icon, features, order, isPublished } = req.body;

    const update = { title, description, icon, order, isPublished };
    if (features !== undefined) update.features = cleanFeatures(features);
    // Don't overwrite fields that weren't sent
    Object.keys(update).forEach(
      (k) => update[k] === undefined && delete update[k]
    );

    const service = await Service.findByIdAndUpdate(req.params.id, update, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, message: "Service updated", service });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/services/:id/publish  (admin) — set show-on-site status (the tick)
const setPublish = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isPublished: !!req.body.isPublished },
      { returnDocument: "after" }
    );
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({
      success: true,
      message: service.isPublished ? "Service is now live" : "Service hidden",
      service,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/services/:id  (admin)
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, message: "Service deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPublishedServices,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  setPublish,
  deleteService,
};
