const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../middleware/asyncHandler");

// GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const query = {
    user: req.user._id,
  };

  // Filter by completed
  if (req.query.completed !== undefined) {
    query.completed = req.query.completed === "true";
  }

  // Search by title or description
  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
    ];
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sort || "-createdAt";

  const tasks = await Task.find(query).sort(sortBy).skip(skip).limit(limit);

  const total = await Task.countDocuments(query);

  res.status(200).json({
    success: true,
    page,
    totalPages: Math.ceil(total / limit),
    count: tasks.length,
    data: tasks,
  });
});

// POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const task = await Task.create({
    title,
    description,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

// PATCH /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Not authorized");
  }

  const { title, description, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  await task.save();

  res.status(200).json({
    success: true,
    data: task,
  });
});

// DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Not authorized");
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted",
  });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
