const Task = require("../models/Task");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

// GET /api/tasks - Get all tasks for logged-in user
const getTasks = asyncHandler(async (req, res) => {
  const query = { user: req.user._id };

  // Filter by completed status
  if (req.query.completed !== undefined) {
    query.completed = req.query.completed === "true";
  }

  // Search by title (case-insensitive)
  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: "i" };
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Sorting: comma-separated, e.g. sort=createdAt,-title
  let sort = "-createdAt"; // default
  if (req.query.sort) {
    sort = req.query.sort
      .split(",")
      .map((s) => s.trim())
      .join(" ");
  }

  const tasks = await Task.find(query).sort(sort).skip(skip).limit(limit);
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
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
      dueDate,
      priority,
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    if (task.user.toString() !== req.user._id.toString())
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });

    const { title, description, completed, dueDate, priority } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (priority !== undefined) task.priority = priority;

    await task.save();
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/tasks/:id - Delete a task
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to delete this task");
  }

  await task.deleteOne();

  res.status(200).json({ success: true, message: "Task deleted" });
});

module.exports = { getTasks, createTask, updateTask, deleteTask };
