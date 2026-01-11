const Task = require("../models/Task");
const sendEmail = require("./mailer"); // make sure mailer.js exists

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

        const subject = `Reminder: Task "${task.title}" is due soon!`;

        const text = `Hi ${task.user.name},

Your task "${task.title}" is due on ${task.dueDate.toDateString()}.

Description: ${task.description || "No description"}

Complete it on time!`;

        const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #d9534f;">Task Reminder ⚠️</h2>
            <p>Hi <strong>${task.user.name}</strong>,</p>
            <p>Your task <strong>"${
              task.title
            }"</strong> is due on <strong>${task.dueDate.toDateString()}</strong>.</p>
            <p><strong>Description:</strong> ${
              task.description || "No description"
            }</p>
            <p style="color: #0275d8;">Please complete it on time!</p>
            <hr>
            <p style="font-size: 0.85em; color: #777;">Task Manager App</p>
          </div>
        `;

        try {
          await sendEmail({
            to: task.user.email,
            subject,
            text,
            html,
          });
          console.log(`✅ Email sent to ${task.user.email}`);
        } catch (err) {
          console.error(
            `❌ Failed to send email to ${task.user.email}:`,
            err.message
          );
        }
      }
    } else {
      console.log("No upcoming tasks due soon.");
    }
  } catch (error) {
    console.error("Error checking due tasks:", error.message);
  }
};

module.exports = { checkDueTasks };
