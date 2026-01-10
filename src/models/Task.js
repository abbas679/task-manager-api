const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dueDate: { type: Date }, // New: due date for task
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    }, // New: task priority
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
