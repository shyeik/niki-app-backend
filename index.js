const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config() // optional, for .env

const app = express()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));

app.use(express.json())

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
  console.log(`Server running on https://localhost:${PORT}`)
})