const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Routes
router.get("/", protect, getTasks); // Get all tasks
router.post("/", protect, createTask); // Create a task
router.patch("/:id", protect, updateTask); // Update task
router.delete("/:id", protect, deleteTask); // Delete task

module.exports = router;
