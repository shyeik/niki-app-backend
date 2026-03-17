const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// ✅ ROUTES
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const eventsRoutes = require("./routes/events");
const taskRoutes = require("./routes/tasks");
const postRoutes = require("./routes/posts");
const tutorialRoutes = require("./routes/tutorials");

// 🔥 API routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/tutorials", tutorialRoutes);

// ✅ HEALTH CHECK (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ GLOBAL ERROR HANDLER (CLEAN)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

// ✅ MongoDB + Server Start
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
  });
