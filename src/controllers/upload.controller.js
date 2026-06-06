const cloudinary = require("../config/cloudinary");

// POST /api/upload  (admin) — uploads a single image to Cloudinary, returns the URL.
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image file provided" });
    }
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(500).json({
        success: false,
        message:
          "Cloudinary is not fully configured (missing CLOUDINARY_CLOUD_NAME). Add it to .env, or paste an image URL instead.",
      });
    }

    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "belalhosan",
      resource_type: "image",
    });

    res.json({ success: true, url: result.secure_url });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadImage };
