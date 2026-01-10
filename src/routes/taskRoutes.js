const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getTasks, createTask } = require("../controllers/taskController");
const { validateTask, handleValidation } = require("../middleware/validators");

router.get("/", protect, getTasks);
router.post("/", protect, validateTask, handleValidation, createTask);

module.exports = router;
