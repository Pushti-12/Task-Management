# Task Management API

A RESTful API for task management built with Node.js, Express.js, PostgreSQL, and MongoDB.

## Features

- **User Management**:
  - User registration with unique email and hashed password
  - User login with JWT token
  - Authenticated endpoint to retrieve user profile

- **Task Management**:
  - Create, read, update, delete tasks
  - Tasks associated with authenticated users
  - Fields: title, description, due date, status (pending/completed)

- **Security**:
  - JWT authentication
  - Password hashing with bcrypt
  - Input validation with Joi

- **Databases**:
  - PostgreSQL for user data
  - MongoDB for task data

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Git

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Pushti-12/Task-Management.git
cd Task-Management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Databases
Start PostgreSQL and MongoDB using Docker Compose (recommended):

```bash
docker-compose up -d
```

Or manually with Docker:

```bash
# Start PostgreSQL
docker run -d --name postgres \
  -e POSTGRES_DB=task_management \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 postgres:13

# Start MongoDB
docker run -d --name mongo \
  -p 27017:27017 mongo:5
```

### 4. Environment Configuration
Create a `.env` file in the root directory:

```env
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_here
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=task_management
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
MONGO_URI=mongodb://localhost:27017/task_management
```

**Important:** Change `JWT_SECRET` to a strong, unique secret key for production.

### 5. Run the Application
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### Stopping the Application
```bash
# Stop databases
docker-compose down

# Or manually
docker stop postgres mongo
docker rm postgres mongo
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Tasks
- `POST /api/tasks` - Create a task (requires auth)
- `GET /api/tasks` - Get all user tasks (requires auth)
- `GET /api/tasks/:id` - Get a specific task (requires auth)
- `PUT /api/tasks/:id` - Update a task (requires auth)
- `DELETE /api/tasks/:id` - Delete a task (requires auth)

For full API details, example requests/responses, and the OpenAPI spec, see `API_DOCUMENTATION.md` and `openapi.yaml`.

## Testing

### Automated Testing
Run the included test script:
```bash
./test_api.sh
```

### Manual Testing
Use curl or Postman:

1. Register: `curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'`

2. Login: `curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'`

3. Use the returned token in Authorization header: `Authorization: Bearer <token>`

## Project Structure

```
Task-Management/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── postgres.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tasks.js
│   ├── utils/
│   │   └── validation.js
├── .env
├── package.json
├── server.js
└── README.md
```

## Troubleshooting

### Database Connection Issues
- Ensure Docker containers are running: `docker ps`
- Check container logs: `docker logs postgres` or `docker logs mongo`
- Verify `.env` configuration matches container settings

### Port Conflicts
- If port 3000 is in use, change `PORT` in `.env`
- For databases, modify Docker port mappings if needed

### Permission Issues
- Ensure Docker commands are run with appropriate permissions
- On Linux/Mac, you might need `sudo` for Docker commands

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

ISC
- `GET /api/tasks/:id` - Get a specific task (requires auth)
- `PUT /api/tasks/:id` - Update a task (requires auth)
- `DELETE /api/tasks/:id` - Delete a task (requires auth)

## Usage

Use tools like Postman or curl to test the API. Include `Authorization: Bearer <token>` header for authenticated requests.
