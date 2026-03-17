const mongoose = require("mongoose");

const TutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    video: {
      type: String,
      required: true, // 🔥 Cloudinary video URL
    },

    thumbnail: {
      type: String, // optional (future use)
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

module.exports = mongoose.model("Tutorial", TutorialSchema);
