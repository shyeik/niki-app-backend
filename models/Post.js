const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true, // Cloudinary URL
    },
    caption: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // 🔥 adds createdAt & updatedAt
  },
);

module.exports = mongoose.model("Post", PostSchema);
