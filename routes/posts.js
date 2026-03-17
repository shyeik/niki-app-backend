const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadPost");
const Post = require("../models/Post");

// ✅ CREATE POST
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const post = new Post({
      image: req.file.path, // 🔥 Cloudinary URL
      caption: req.body.caption,
    });

    const saved = await post.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // 🔥 latest first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE CAPTION
router.put("/:id", async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { caption: req.body.caption },
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
