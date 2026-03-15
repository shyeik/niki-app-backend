const express = require("express")
const router = express.Router()
const User = require("../models/User")

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add a new user
router.post("/add", async (req, res) => {
  try {
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router