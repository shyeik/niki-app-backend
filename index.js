const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config() // optional, for .env

const app = express()

// Middleware

app.use(express.json())

app.use(cors({
  origin: process.env.CLIENT_ORIGIN, // e.g., https://niki-app.vercel.app
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// This ensures preflight requests respond with 200 OK
app.options("*", cors());
// MongoDB connection
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

// Test route
app.get("/", (req, res) => {
  res.send("NIKI API Server is Running")
})



// Users API
const userRoutes = require("./routes/users")
app.use("/api/users", userRoutes)

// Auth API
const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes)

// Start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})