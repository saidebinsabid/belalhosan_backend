const Project = require("../models/project.model");

// Normalize an array of strings (trim + drop empties).
const cleanArray = (arr) =>
  Array.isArray(arr)
    ? arr.map((x) => (typeof x === "string" ? x.trim() : "")).filter(Boolean)
    : [];

// GET /api/projects/published  (public) — only published, ordered
const getPublishedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ isPublished: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json({ success: true, count: projects.length, projects });
  } catch (err) {
    next(err);
  }
};

// GET /api/projects  (admin) — all, ordered
const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, projects });
  } catch (err) {
    next(err);
  }
};

// GET /api/projects/:id  (admin)
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, project });
  } catch (err) {
    next(err);
  }
};

// POST /api/projects  (admin)
const createProject = async (req, res, next) => {
  try {
    const { title, category, client, duration, description, tools, results, photo, order, isPublished } =
      req.body;
    const project = await Project.create({
      title,
      category,
      client,
      duration,
      description,
      tools: cleanArray(tools),
      results: cleanArray(results),
      photo,
      order,
      isPublished,
    });
    res.status(201).json({ success: true, message: "Project created", project });
  } catch (err) {
    next(err);
  }
};

// PUT /api/projects/:id  (admin)
const updateProject = async (req, res, next) => {
  try {
    const { title, category, client, duration, description, tools, results, photo, order, isPublished } =
      req.body;

    const update = { title, category, client, duration, description, photo, order, isPublished };
    if (tools !== undefined) update.tools = cleanArray(tools);
    if (results !== undefined) update.results = cleanArray(results);
    Object.keys(update).forEach(
      (k) => update[k] === undefined && delete update[k]
    );

    const project = await Project.findByIdAndUpdate(req.params.id, update, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, message: "Project updated", project });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/projects/:id/publish  (admin) — the "select" tick
const setPublish = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isPublished: !!req.body.isPublished },
      { returnDocument: "after" }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({
      success: true,
      message: project.isPublished ? "Project is now live" : "Project hidden",
      project,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/projects/:id  (admin)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPublishedProjects,
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  setPublish,
  deleteProject,
};
