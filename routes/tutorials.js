const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTutorial"); // Cloudinary
const Tutorial = require("../models/Tutorial"); // Tutorial model

// ✅ CREATE TUTORIAL (VIDEO UPLOAD)
router.post("/", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video is required" });
    }

    const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      video: req.file.path, // 🔥 Cloudinary URL
    });

    const saved = await tutorial.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL TUTORIALS
router.get("/", async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({ createdAt: -1 });
    res.json(tutorials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET SINGLE TUTORIAL
router.get("/:id", async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE TUTORIAL (title + description only)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Tutorial.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE TUTORIAL
router.delete("/:id", async (req, res) => {
  try {
    await Tutorial.findByIdAndDelete(req.params.id);

    res.json({ message: "Tutorial deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
