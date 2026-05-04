# ⚡ DSA Master Sheet — Full Stack MERN Application

A complete, production-ready DSA tracking web app built with the MERN stack.

---

## 🚀 Features

- **Secure Authentication** — Register/Login with JWT tokens (30-day sessions)
- **60+ Curated Problems** across 10 DSA topics
- **Per-Problem Resources** — YouTube tutorial, LeetCode/Codeforces link, GFG article
- **Level Indicators** — Easy / Medium / Hard tags with color coding
- **Progress Tracker** — Checkbox per problem, auto-saved to MongoDB
- **Resume on Login** — Progress persists across sessions
- **Overall & Per-Topic Progress** — Ring chart and progress bars
- **Search & Filter** — Search by problem name, filter by difficulty
- **Responsive UI** — Works on mobile and desktop

---

## 📁 Project Structure

```
dsa-sheet/
├── backend/
│   ├── data/           # DSA problems dataset
│   ├── middleware/     # JWT auth middleware
│   ├── models/         # Mongoose schemas (User, Progress)
│   ├── routes/         # Express API routes
│   ├── server.js       # Entry point
│   └── package.json
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/ # Navbar, TopicCard, ProblemRow, OverallProgress
│       ├── context/    # AuthContext, ProgressContext
│       ├── data/       # Local DSA data (fallback)
│       ├── pages/      # LoginPage, DashboardPage
│       ├── App.js
│       └── index.js
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js >= 16
- MongoDB (local or Atlas)

### 1. Clone & Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Backend Environment

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

`.env` file:
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/dsa-sheet
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### 3. Run the App

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev   # uses nodemon for hot reload
# OR
npm start
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---



---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login & get token | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/problems` | Get all DSA problems | Yes |
| GET | `/api/progress` | Get user's progress | Yes |
| POST | `/api/progress/toggle` | Toggle problem completion | Yes |
| GET | `/api/progress/stats` | Get progress stats | Yes |

---

## 🗂️ DSA Topics Covered

| # | Topic | Problems |
|---|-------|----------|
| 1 | Arrays | 8 problems |
| 2 | Strings | 6 problems |
| 3 | Linked List | 5 problems |
| 4 | Stacks & Queues | 5 problems |
| 5 | Trees & BST | 6 problems |
| 6 | Graphs | 6 problems |
| 7 | Dynamic Programming | 7 problems |
| 8 | Sorting Algorithms | 4 problems |
| 9 | Binary Search | 4 problems |
| 10 | Recursion & Backtracking | 4 problems |

**Total: 55 problems**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Styling | Pure CSS with CSS Variables |




