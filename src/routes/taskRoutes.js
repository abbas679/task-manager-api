const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { body, param, query } = require("express-validator");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// GET /api/tasks
router.get(
  "/",
  protect,
  [
    query("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be true or false"),
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive integer"),
    query("sort").optional().isString().withMessage("Sort must be a string"),
    query("search")
      .optional()
      .isString()
      .withMessage("Search must be a string"),
  ],
  validateRequest,
  getTasks
);

// POST /api/tasks
router.post(
  "/",
  protect,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Priority must be low, medium, or high"),
    body("dueDate")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Due date must be a valid date"),
  ],
  validateRequest,
  createTask
);

// PATCH /api/tasks/:id
router.patch(
  "/:id",
  protect,
  [
    param("id").isMongoId().withMessage("Invalid task ID"),
    body("title").optional().isString(),
    body("description").optional().isString(),
    body("completed").optional().isBoolean(),
    body("priority").optional().isIn(["low", "medium", "high"]),
    body("dueDate").optional().isISO8601().toDate(),
  ],
  validateRequest,
  updateTask
);

// DELETE /api/tasks/:id
router.delete(
  "/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid task ID")],
  validateRequest,
  deleteTask
);

module.exports = router;
