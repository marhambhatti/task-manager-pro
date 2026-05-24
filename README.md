# Task Manager Backend

A secure Task Manager backend built with the MERN stack backend technologies using Node.js, Express.js, MongoDB, and JWT authentication.

## Features

### Authentication

* User Registration
* User Login
* Password hashing using bcryptjs
* JWT Authentication
* Protected Routes

### Task Management

* Create Task
* Get Tasks
* Update Task
* Delete Task
* User-specific task ownership

### Advanced Features

* Search tasks by title
* Filter tasks by:

  * Status
  * Priority
  * Category
* Pagination
* Sorting
* Centralized error handling

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* dotenv

## Project Structure

```txt
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── task.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── user.model.js
│   └── task.model.js
│
├── routes/
│   ├── user.route.js
│   └── task.route.js
│
├── server.js
├── .env
├── package.json
```

## Installation

Clone repository:

```bash
git clone <repository-url>
```

Move into backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run server:

```bash
npm run dev
```

## Environment Variables

Create a .env file:

```env
PORT=5000
MONGOURL=mongodb://localhost:27017/Task
JWT_SECRET=your_secret_key
```

## API Routes

### Authentication

POST /api/register

POST /api/login

### Tasks

POST /api/task/create

GET /api/tasks

PUT /api/task/:id

DELETE /api/task/:id

### Search

GET /api/task/search?title=value

### Filters

GET /api/task/filter?status=Pending

GET /api/task/filter?priority=High

GET /api/task/filter?category=Study

### Pagination

GET /api/tasks?page=1&limit=5

### Sorting

GET /api/tasks?sort=newest

GET /api/tasks?sort=oldest

GET /api/tasks?sort=due

## Security

* JWT protected routes
* Password hashing
* User ownership validation
* Task access restriction

## Future Improvements

* File upload support
* Team collaboration
* Task analytics
* Drag
