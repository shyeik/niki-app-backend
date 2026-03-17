const express = require("express");
const router = express.Router();
const Task = require("../models/Tasks.js");


// GET all tasks
router.get("/", async (req, res) => {
  try {

    const tasks = await Task.find().sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
});


// CREATE task
router.post("/", async (req, res) => {
  try {

    const { title, description, priority, dueDate } = req.body;

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
});


// UPDATE status (for Kanban drag)
router.patch("/:id/status", async (req, res) => {
  try {

    const { status } = req.body;

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
});


// DELETE task
router.delete("/:id", async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted successfully" });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
});

module.exports = router;