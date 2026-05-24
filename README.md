# Task Manager Pro

A full-stack MERN task manager with authentication, protected task ownership, search, filters, pagination, and a polished React frontend.

## Features

- User registration and login
- Password hashing with `bcryptjs`
- JWT-protected API routes
- User-specific task ownership
- Create, read, update, and delete tasks
- Task fields: title, description, status, priority, category, due date
- Search tasks by title
- Filter tasks by status, priority, and category
- Paginated task list
- Responsive frontend with home, auth, and dashboard pages

## Tech Stack

- Frontend: React, Vite, Axios, React Router, React Hot Toast, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT, bcryptjs

## Project Structure

```txt
task-manager-pro/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
    package.json

  frontend/
    frontend/
      src/
        components/
        pages/
        routes/
        services/
        assets/
      package.json
```

## Getting Started

Install backend dependencies:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGOURL=mongodb://localhost:27017/Task
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

Install frontend dependencies:

```bash
cd frontend/frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:5000`.

## API Routes

### Auth

```txt
POST /api/register
POST /api/login
```

### Tasks

All task routes require:

```txt
Authorization: Bearer <token>
```

```txt
POST   /api/task/create
GET    /api/task
PUT    /api/task/:id
DELETE /api/task/:id
```

### Query Examples

Paginated tasks:

```txt
GET /api/task?page=1&limit=5
```

Search:

```txt
GET /api/task?search=assignment&page=1&limit=5
```

Filters:

```txt
GET /api/task?status=Pending
GET /api/task?priority=High
GET /api/task?category=Study
```

Combined:

```txt
GET /api/task?search=project&status=In%20Progress&priority=High&page=1&limit=5
```

Legacy helper routes also exist:

```txt
GET /api/task/search?title=value
GET /api/task/filter?status=Pending
```

## Task Model

```js
{
  title: String,
  description: String,
  status: "Pending" | "In Progress" | "Completed",
  priority: "Low" | "Medium" | "High",
  category: "Personal" | "Study" | "Work" | "Health" | "Other",
  dueDate: Date,
  createdBy: ObjectId
}
```

## Verification

Frontend:

```bash
npm run lint
npm run build
```

Backend:

```bash
node --check server.js
node --check controllers/task.controller.js
node --check routes/task.route.js
```

## Notes

- The frontend API base URL is configured in `frontend/frontend/src/services/api.js`.
- Make sure MongoDB is running before starting the backend.
- Task data is protected per user through JWT authentication and ownership checks.
