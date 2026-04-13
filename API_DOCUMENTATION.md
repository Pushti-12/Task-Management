# Task Management API Documentation

## Overview
This API enables user registration, login, and task management. It stores user credentials in PostgreSQL and task data in MongoDB.

Base URL: `http://localhost:3000`

Authentication: JWT Bearer token is required for protected endpoints.

---

## Authentication Flow

1. **Register** a new user with email and password.
2. **Login** with email and password to receive a JWT.
3. Use the token in `Authorization: Bearer <token>` for protected routes.

---

## Endpoints

### 1. Register

`POST /api/auth/register`

Request body:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Success response (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "test@example.com"
  }
}
```

Validation errors:
- missing `email`
- invalid email format
- missing `password`
- password shorter than 6 chars
- duplicate email

---

### 2. Login

`POST /api/auth/login`

Request body:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Success response (200):
```json
{
  "token": "<JWT_TOKEN>"
}
```

Failure response (400):
```json
{
  "message": "Invalid credentials"
}
```

---

### 3. Get Profile

`GET /api/auth/profile`

Headers:
- `Authorization: Bearer <JWT_TOKEN>`

Success response (200):
```json
{
  "id": 1,
  "email": "test@example.com"
}
```

Unauthorized responses:
- `{"message":"No token provided"}`
- `{"message":"Invalid token"}`

---

### 4. Create Task

`POST /api/tasks`

Headers:
- `Authorization: Bearer <JWT_TOKEN>`

Request body:
```json
{
  "title": "Finish homework",
  "description": "Complete the task management API documentation",
  "dueDate": "2026-04-20",
  "status": "pending"
}
```

Success response (201):
```json
{
  "_id": "605c5fa5e1a4ec3044f1c123",
  "title": "Finish homework",
  "description": "Complete the task management API documentation",
  "dueDate": "2026-04-20T00:00:00.000Z",
  "status": "pending",
  "userId": 1,
  "createdAt": "2026-04-13T04:01:54.175Z",
  "updatedAt": "2026-04-13T04:01:54.175Z",
  "__v": 0
}
```

Validation errors:
- missing `title`
- missing `description`
- missing `dueDate`
- invalid `dueDate`
- invalid `status`

---

### 5. Get All Tasks

`GET /api/tasks`

Headers:
- `Authorization: Bearer <JWT_TOKEN>`

Success response (200):
```json
[
  {
    "_id": "605c5fa5e1a4ec3044f1c123",
    "title": "Finish homework",
    "description": "Complete the task management API documentation",
    "dueDate": "2026-04-20T00:00:00.000Z",
    "status": "pending",
    "userId": 1,
    "createdAt": "2026-04-13T04:01:54.175Z",
    "updatedAt": "2026-04-13T04:01:54.175Z",
    "__v": 0
  }
]
```

---

### 6. Get Single Task

`GET /api/tasks/{id}`

Headers:
- `Authorization: Bearer <JWT_TOKEN>`

Success response (200):
```json
{
  "_id": "605c5fa5e1a4ec3044f1c123",
  "title": "Finish homework",
  "description": "Complete the task management API documentation",
  "dueDate": "2026-04-20T00:00:00.000Z",
  "status": "pending",
  "userId": 1,
  "createdAt": "2026-04-13T04:01:54.175Z",
  "updatedAt": "2026-04-13T04:01:54.175Z",
  "__v": 0
}
```

Error response if task does not exist or belongs to another user:
```json
{
  "message": "Task not found"
}
```

---

### 7. Update Task

`PUT /api/tasks/{id}`

Headers:
- `Authorization: Bearer <JWT_TOKEN>`

Request body example:
```json
{
  "status": "completed"
}
```

Success response (200):
```json
{
  "_id": "605c5fa5e1a4ec3044f1c123",
  "title": "Finish homework",
  "description": "Complete the task management API documentation",
  "dueDate": "2026-04-20T00:00:00.000Z",
  "status": "completed",
  "userId": 1,
  "createdAt": "2026-04-13T04:01:54.175Z",
  "updatedAt": "2026-04-13T04:05:20.000Z",
  "__v": 0
}
```

Validation errors:
- invalid `status`
- invalid `dueDate`

Error response if task not found:
```json
{
  "message": "Task not found"
}
```

---

### 8. Delete Task

`DELETE /api/tasks/{id}`

Headers:
- `Authorization: Bearer <JWT_TOKEN>`

Success response (200):
```json
{
  "message": "Task deleted"
}
```

Error response if task not found:
```json
{
  "message": "Task not found"
}
```

---

## Error Handling

The API uses global error handling middleware to respond with:
- `400 Bad Request` for validation failures
- `401 Unauthorized` for missing or invalid JWT
- `403 Forbidden` is not currently used directly, but can be added for role-based access
- `404 Not Found` when a resource is absent or not owned by the authenticated user
- `500 Internal Server Error` for unexpected server conditions

---

## Example curl Workflow

1. Register:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

2. Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

3. Save the token:
```bash
TOKEN="<JWT_TOKEN>"
```

4. Create a task:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Study API","description":"Practice endpoints","dueDate":"2026-04-20","status":"pending"}'
```

---

## Folder Structure and Design Decisions

### Folder structure

```
Task-Management/
├── src/
│   ├── config/
│   │   ├── database.js      # Connects to MongoDB and PostgreSQL via Sequelize
│   │   └── postgres.js      # Sequelize configuration for PostgreSQL
│   ├── controllers/         # Business logic for each route
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/          # Reusable Express middleware
   │   ├── auth.js           # JWT authentication guard
   │   └── errorHandler.js   # Global error handler
│   ├── models/              # Data models for PostgreSQL and MongoDB
   │   ├── User.js           # Sequelize model for users
   │   └── Task.js           # Mongoose model for tasks
│   ├── routes/              # Route definitions
   │   ├── auth.js
   │   └── tasks.js
│   └── utils/               # Shared utilities
   │       └── validation.js  # Joi validation schemas
├── .env
├── docker-compose.yml
├── package.json
├── server.js
└── openapi.yaml
```

### Why this structure?

- `src/config`: keeps database connection and configuration separate so changes are isolated.
- `src/controllers`: stores endpoint logic away from routing, making code easier to read and test.
- `src/middleware`: isolates auth and error handling so they can be reused across routes.
- `src/models`: splits user schema (PostgreSQL) and task schema (MongoDB) clearly.
- `src/routes`: maps URL paths to controller actions in a clean, RESTful way.
- `src/utils`: stores validation rules centrally so request validation is consistent.

### Design decisions

- **PostgreSQL for users**: Relational structure is a good fit for account data and unique constraints.
- **MongoDB for tasks**: Tasks are stored as documents for flexibility and faster iteration.
- **JWT authentication**: Stateless auth makes the API simple and scalable.
- **Separation of concerns**: Routes, controllers, models, and middleware are separated to keep the codebase maintainable.
- **Validation with Joi**: Ensures input is correct before business logic runs.
- **Global error middleware**: Standardizes error responses and avoids repetition.
- **Docker Compose**: Simplifies setup of PostgreSQL and MongoDB for local development.

---

## API Spec Files

- `openapi.yaml`: OpenAPI 3.0 specification for the full API.
- `API_DOCUMENTATION.md`: human-readable endpoint guide, examples, and design rationale.

---

## How to use

1. Start the API server.
2. Use `openapi.yaml` in Swagger UI, Postman, or another OpenAPI-compatible tool.
3. Follow the curl examples to register, login, create tasks, and manage them.
