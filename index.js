const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}))

app.use(express.json())

// Routes
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 8080

// Start server AFTER MongoDB connects
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })

  })
  .catch(err => {
    console.error("MongoDB connection error:", err)
  })