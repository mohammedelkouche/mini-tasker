# Mini-Tasker

Mini-Tasker is a lightweight task management web application built with a React + Tailwind CSS frontend and an Express + MongoDB backend. It provides CRUD operations for tasks, user authentication (JWT), and basic task categorization (important, completed, incomplete).

## Key Features
- User registration and login with password hashing and JWT authentication.
- Create, view, and manage tasks.
- Task categorization: All, Important, Completed, Incomplete.
- Responsive UI built with React and Tailwind CSS.
- RESTful API endpoints protected by token middleware.
- Clean project structure for easy extension.

## Tech Stack & Tools
- Frontend: React, React Router, Tailwind CSS, react-icons
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: bcryptjs (password hashing), jsonwebtoken (JWT)
- Dev tools: VS Code, Postman
- Package manager: npm
- Optional: Docker (for production/DB), dotenv for env vars

## Project Structure
Top-level structure (concise):
```
c:\Users\MOHAMMED\Documents\mini-tasker
├─ backend
│  ├─ models
│  │  ├─ user.js
│  │  └─ task.js
│  ├─ routes
│  │  ├─ task.js
│  │  ├─ user.js
│  │  └─ middleware
│  │     └─ auth.js
│  ├─ app.js
│  └─ package.json
├─ frontend
│  ├─ src
│  │  ├─ components
│  │  │  └─ Home
│  │  │     ├─ Card.jsx
│  │  │     ├─ InputData.jsx
│  │  │     └─ Sidebar.jsx
│  │  ├─ pages
│  │  │  ├─ Home.jsx
│  │  │  ├─ AllTasks.jsx
│  │  │  ├─ ImportantTasks.jsx
│  │  │  ├─ CompletedTasks.jsx
│  │  │  ├─ IncompletedTasks.jsx
│  │  │  ├─ Signup.jsx
│  │  │  └─ Login.jsx
│  │  └─ App.js
│  └─ package.json
└─ README.md
```

## Backend (API)
Environment variables (backend `.env`):
- PORT (e.g. 5000)
- MONGO_URI (MongoDB connection string)
- JWT_SECRET (secret string for JWT signing)

Important endpoints:
- POST /api/user/sign-in — register (expects { username, email, password }) → returns token
- POST /api/user/log-in — login (expects { username, password }) → returns { id, token }
- POST /api/task/create-task — create task (protected, Authorization: Bearer <token>) { title, desc }
- GET /api/task/get-all-tasks — get user's tasks (protected)

Auth: Token middleware reads Authorization header `Bearer <token>` and sets req.user.id.

Notes:
- Passwords are hashed using bcrypt.
- Tokens expire (configured in auth.js).

## Frontend
- React Router handles routes:
  - `/` — Home (AllTasks displayed)
  - `/ImportantTasks`, `/CompletedTasks`, `/IncompletedTasks` — filtered task views
  - `/signup`, `/login` — authentication pages
- Components:
  - Card — task card, shows title/desc/status and actions
  - InputData — modal for creating tasks
  - Sidebar — navigation
- Typical flow: login → store token (recommended: localStorage) → include token in Authorization header when calling protected APIs.

Frontend env:
- REACT_APP_API_BASE_URL — backend base URL (e.g. http://localhost:5000/api)

Recommended auth flow:
- On successful login receive token and user id; store token securely and include in API calls:
  Authorization: `Bearer ${token}`

## Setup & Run (local)
Prerequisites: Node.js, npm, MongoDB (local or Atlas)

Backend:
1. cd backend
2. cp .env.example .env (or create .env)
3. Set MONGO_URI, JWT_SECRET, PORT
4. npm install
5. npm run dev (or node app.js) — ensure MongoDB is reachable

Frontend:
1. cd frontend
2. npm install
3. set REACT_APP_API_BASE_URL if needed
4. npm start


## Database
- Main collections: users, tasks
- User schema: username, email, password (hashed), tasks: [ObjectId]
- Task schema: title, desc, status flags (important/completed/etc.), timestamps

## Contribution
- Follow code style, add tests for new features, open PRs against main branch.
- Provide clear commit messages and update README for new features.

<!-- ## License
- Add your preferred license (e.g. MIT) or company/legal notice. -->

