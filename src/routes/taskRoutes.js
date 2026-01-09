const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getTasks, createTask } = require("../controllers/taskController");

// Get all tasks for the logged-in user
router.get("/", protect, getTasks);

// Create a new task for the logged-in user
router.post("/", protect, createTask);

module.exports = router;
