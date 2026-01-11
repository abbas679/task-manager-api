const Task = require("../models/Task");
const sendEmail = require("./email");

const checkDueTasks = async (days = 1) => {
  try {
    const now = new Date();
    const upcoming = new Date();
    upcoming.setDate(upcoming.getDate() + days);

    const tasks = await Task.find({
      completed: false,
      dueDate: { $gte: now, $lte: upcoming },
    }).populate("user", "name email");

    if (tasks.length > 0) {
      console.log(`⚠️ ${tasks.length} task(s) due in the next ${days} day(s)`);

      for (const task of tasks) {
        console.log(
          `- ${task.title} (due: ${task.dueDate.toISOString()}) - ${
            task.user.name
          }`
        );

        // Send email notification
        const subject = `Reminder: Task "${task.title}" is due soon!`;
        const text = `Hi ${task.user.name},\n\nYour task "${
          task.title
        }" is due on ${task.dueDate.toDateString()}.\n\nDescription: ${
          task.description || "No description"
        }\n\nComplete it on time!`;

        await sendEmail(task.user.email, subject, text);
      }
    } else {
      console.log("No upcoming tasks due soon.");
    }
  } catch (error) {
    console.error("Error checking due tasks:", error.message);
  }
};

module.exports = { checkDueTasks };
