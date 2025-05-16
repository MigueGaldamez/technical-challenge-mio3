# 📝 Technical Challenge — Mid Software Developer

This repository contains the instructions for a technical test for the Mid Software Developer position. The objective is to develop a full stack web application using **Next.js**, **Node.js**, and a Mongo database, applying good coding practices, separation of concerns, and proper component structuring.

---

## 🎯 Objective

Develop a small **To-Do List application** with the following:
- A **frontend** built with Next.js.
- A **backend API** built with Node.js and Express (or Next.js API Routes).
- A **database** for storing the task data.

The application must support full CRUD operations:
- **GET** all tasks.
- **POST** a new task.
- **PUT** (update) an existing task.
- **DELETE** a task.

---

## 📋 Requirements

### Backend (Node.js + Express or Next.js API Routes)
- Create a REST API with the following endpoints:
  - `GET /api/tasks` — List all tasks.
  - `POST /api/tasks` — Create a new task.
  - `PUT /api/tasks/:id` — Update an existing task.
  - `DELETE /api/tasks/:id` — Delete a task.

Each task should have:
- `id` (auto-generated)
- `title` (string)
- `description` (string)
- `status` (pending / completed)
- `createdAt` (creation date)

**Additional requirements:**
- Separate controllers, routes, and services.
- Use middlewares where appropriate.
- Implement centralized error handling.

---

### Frontend (Next.js)
- Create a clean interface that allows:
  - Viewing the task list.
  - Creating a new task.
  - Editing an existing task.
  - Deleting a task.

**Frontend requirements:**
- Consume the backend API using `fetch` or `axios`.
- Use React hooks (`useState`, `useEffect`) for state management.
- Create reusable components for:
  - TaskCard (individual task display)
  - TaskForm (create/edit form)
  - TaskList (task list view)
- Use a styling solution of your choice (CSS Modules, Tailwind, or styled-components).
- Maintain clean separation of components in a `components/` folder.

---

### Database
- Use **MongoDB**.
- Define the database schema.
- Set up proper database connections.
- Create a simple script or migration to initialize the database.

---

### Deliverables
- GitHub repository with the complete project.
- Clear and well-documented README.md explaining:
  - Project description.
  - Stack used.
  - Installation and execution steps.
  - Brief explanation of folder structure and architecture.

