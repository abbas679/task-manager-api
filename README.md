# Task Manager API

## Overview

This is the **backend API** for a Task Manager application.  
It provides endpoints for **user authentication** and **task management (CRUD)**, and includes features such as **task reminders via email**.

---

## Features

- User registration and login with **JWT authentication**
- Create, read, update, and delete tasks
- Task reminders via **email notifications**
- Pagination, filtering, and sorting of tasks
- Centralized error handling with custom API errors
- Input validation using `express-validator`

---

## Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB** with Mongoose  
- **JWT** for authentication  
- **Nodemailer** for email reminders  
- **dotenv** for environment variables

---

## Achievements & Learnings

During the development of this **Task Manager API**, I have:

- Built a **fully functional backend API** using Node.js, Express.js, and MongoDB.
- Implemented **user authentication** with JWT for secure login and registration.
- Designed **task management endpoints** with full CRUD operations.
- Added **task filtering, sorting, and pagination** for better usability.
- Integrated **email notifications** for task reminders using Nodemailer.
- Learned to **handle asynchronous operations** with `async/await` and centralized error handling.
- Implemented **input validation** using `express-validator`.
- Learned **environment variable management** with dotenv and keeping sensitive information secure (`.env` management and Git exclusions).
- Used **Mongoose population** to link tasks with user details.
- Built a **scheduler** to automatically check due tasks and send email reminders every hour.
- Gained experience with **debugging, error tracing, and authentication issues** in MongoDB Atlas.
- Practiced **clean project structuring**, separating routes, controllers, middlewares, and utilities.
- Prepared the project to be **frontend-ready**, allowing seamless integration with a React application.

**Overall**, I strengthened my skills in backend development, database management, API design, and secure application practices while completing a real-world project.
