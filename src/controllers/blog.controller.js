const Blog = require("../models/blog.model");

// Turn a string into a URL-safe slug.
const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Ensure a slug is unique (optionally excluding a doc on update).
const uniqueSlug = async (base, excludeId) => {
  const root = base || "post";
  let slug = root;
  let n = 2;
  // eslint-disable-next-line no-await-in-loop
  while (
    await Blog.findOne({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    slug = `${root}-${n}`;
    n += 1;
  }
  return slug;
};

// GET /api/blogs/published  (public) — published blogs, ordered
const getPublishedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json({ success: true, count: blogs.length, blogs });
  } catch (err) {
    next(err);
  }
};

// GET /api/blogs/slug/:slug  (public) — single published blog (detail page)
const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (err) {
    next(err);
  }
};

// GET /api/blogs  (admin) — all, ordered
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: blogs.length, blogs });
  } catch (err) {
    next(err);
  }
};

// GET /api/blogs/:id  (admin) — by id (edit form)
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (err) {
    next(err);
  }
};

// POST /api/blogs  (admin)
const createBlog = async (req, res, next) => {
  try {
    const { title, slug, excerpt, category, emoji, date, readTime, content, order, isPublished } =
      req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    const finalSlug = await uniqueSlug(slugify(slug || title));
    const blog = await Blog.create({
      title,
      slug: finalSlug,
      excerpt,
      category,
      emoji,
      date,
      readTime,
      content,
      order,
      isPublished,
    });
    res.status(201).json({ success: true, message: "Blog created", blog });
  } catch (err) {
    next(err);
  }
};

// PUT /api/blogs/:id  (admin)
const updateBlog = async (req, res, next) => {
  try {
    const { title, slug, excerpt, category, emoji, date, readTime, content, order, isPublished } =
      req.body;

    const update = { title, excerpt, category, emoji, date, readTime, content, order, isPublished };
    if (slug !== undefined) {
      update.slug = await uniqueSlug(slugify(slug || title || ""), req.params.id);
    }
    Object.keys(update).forEach(
      (k) => update[k] === undefined && delete update[k]
    );

    const blog = await Blog.findByIdAndUpdate(req.params.id, update, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, message: "Blog updated", blog });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/blogs/:id/publish  (admin)
const setPublish = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { isPublished: !!req.body.isPublished },
      { returnDocument: "after" }
    );
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({
      success: true,
      message: blog.isPublished ? "Blog is now live" : "Blog hidden",
      blog,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/blogs/:id  (admin)
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPublishedBlogs,
  getBlogBySlug,
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  setPublish,
  deleteBlog,
};
