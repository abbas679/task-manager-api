# Task Manager API

## Overview

This is the backend API for a Task Manager application.  
It provides endpoints for user authentication and task management (CRUD), and includes features such as task reminders via email.

---

## Features

- User registration and login with JWT authentication
- Create, read, update, delete tasks
- Task reminders via email
- Pagination, filtering, and sorting of tasks
- Centralized error handling

---

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email reminders
- dotenv for environment variables

---

## Setup Instructions

1. **Clone the repository**

git clone <repo-url>
cd task-manager-api

````

2. **Install dependencies**

npm install
```

3. **Create `.env` file**
   Copy `.env.example` (or create a new `.env`) and update the values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

4. **Run the server**

npm run dev
```

Server should start on `http://localhost:5000`.

---

## API Endpoints

### Auth

* `POST /api/auth/register` → register user
* `POST /api/auth/login` → login user

### Tasks (protected)

* `GET /api/tasks` → list tasks with optional query params: `completed`, `page`, `limit`, `sort`, `search`
* `POST /api/tasks` → create task
* `PATCH /api/tasks/:id` → update task
* `DELETE /api/tasks/:id` → delete task

---

## Task Reminder

* Checks tasks due in the next 24 hours and sends email notifications.
* Runs automatically every hour when the server is running.

---

## Notes

* Make sure your MongoDB URI is correct and credentials are valid.
* `.env` file must **never** be committed to Git.
* For testing emails, create a Gmail App Password.

---

## License

MIT

```

---

````
