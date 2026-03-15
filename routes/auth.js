const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

// REGISTER ADMIN (just once)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ name, email, password: hashedPassword })
    await newUser.save()
    res.json({ message: "Admin registered" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  const { name, password } = req.body
  try {
    const user = await User.findOne({ name })
    console.log("User found:", user)
    if (!user) return res.status(400).json({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ id: user._id, name: user.email }, JWT_SECRET, { expiresIn: "1d" })
    res.json({ token, name: user.email })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router