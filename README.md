---

# Bellcorp Event Management Platform

### Full-Stack MERN Application

🌐 **Live Application**
Frontend → [https://bellcorp-event-management-assignment.netlify.app/](https://bellcorp-event-management-assignment.netlify.app/)
Backend → [https://bellcorp-event-management-assignment.onrender.com/](https://bellcorp-event-management-assignment.onrender.com/)

---

# 1. Overview

The Bellcorp Event Management Platform is a scalable full-stack MERN application that enables users to discover, explore, and manage event registrations efficiently.

This project simulates a real-world event discovery system with:

- Secure JWT authentication
- Dynamic event search & filtering
- Real-time seat capacity handling
- Registration & cancellation logic
- Personalized user dashboard
- Cloud deployment

The architecture follows clean separation of concerns and production-aware design principles.

---

# 2. Architecture Overview

Frontend (React + Context API)
⬇
REST API (Node.js + Express)
⬇
MongoDB Atlas (Mongoose ODM)

### Authentication Flow

- Password hashing using bcryptjs
- JWT token generation on login
- Protected backend routes via middleware
- Frontend route protection using `ProtectedRoute`
- Global authentication state managed with `AuthProvider`

---

# 3. Core Features

## Authentication

- User Registration
- User Login
- JWT session management
- Protected routes
- Password hashing with bcrypt

## Event Discovery

- Browse all events
- View event details
- Dynamic text search (MongoDB Regex)
- Filter by:
  - Location
  - Category
  - Date

- Real-time seat availability handling

## Registration System

- Prevent duplicate registrations
- Prevent overbooking beyond capacity
- Cancel event registration
- Dynamic seat updates

## User Dashboard

- View registered events
- Upcoming events (future dates)
- Past event history
- Clean separation of data in UI

---

# 4. Technical Stack

## Frontend

- React.js (Functional Components + Hooks)
- React Router DOM
- Context API
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

## Deployment

- Netlify (Frontend)
- Render (Backend)
- MongoDB Atlas (Cloud DB)

---

# 5. Database Design

## User Schema

```js
{
  name: String,
  email: { type: String, unique: true },
  password: String
}
```

## Event Schema

```js
{
  name: String,
  organizer: String,
  location: String,
  date: Date,
  description: String,
  capacity: Number,
  availableSeats: Number,
  category: String
}
```

## Registration Schema

```js
{
  userId: { type: ObjectId, ref: "User" },
  eventId: { type: ObjectId, ref: "Event" }
}
```

### Relationship Model

User → Registration → Event

This ensures:

- No duplicate registrations
- Controlled seat availability
- Clean relational mapping using references

---

# 6. API Documentation

### Base URL

```
https://bellcorp-event-management-assignment.onrender.com/
```

---

## Authentication APIs

| Method | Endpoint           | Description       | Body Example                |
| ------ | ------------------ | ----------------- | --------------------------- |
| POST   | /api/auth/register | Register new user | `{ name, email, password }` |
| POST   | /api/auth/login    | Login user        | `{ email, password }`       |

### Example Request (Login)

```json
POST /api/auth/login

{
  "email": "test@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "123",
    "name": "Test User"
  }
}
```

---

## Event APIs

| Method | Endpoint        | Description                         |
| ------ | --------------- | ----------------------------------- |
| GET    | /api/events     | Get all events (with search/filter) |
| GET    | /api/events/:id | Get single event                    |
| POST   | /api/events     | Create new event (Protected)        |
| DELETE | /api/events/:id | Delete event                        |

### Query Parameters

```
/api/events?search=music&location=Chennai&category=Tech
```

Backend logic:

```js
if (search) query.name = { $regex: search, $options: "i" };
if (category) query.category = category;
if (location) query.location = location;
```

---

## Registration APIs

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| POST   | /api/register/:eventId | Register for event (Protected)  |
| DELETE | /api/register/:eventId | Cancel registration (Protected) |
| GET    | /api/register/user     | Get user registered events      |

---

# 7. Folder Structure

```
bellcorp-event-management/
│
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/          # Navbar, ProtectedRoute, EventCard
│   │   ├── pages/               # Events, Login, Register, Dashboard
│   │   ├── context/             # AuthContext
│   │   ├── App.js               # Routing configuration
│   │   └── index.js
│   │
│   └── package.json
│
├── server/                      # Express Backend
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── middleware/
│   │   └── protect.js           # JWT middleware
│   ├── seed.js                  # Mock event data
│   └── server.js                # Entry point
│
└── README.md
```

This structure ensures:

- Clean separation of frontend & backend
- Modular backend architecture
- Scalable code organization

---

# 8. Local Development Setup

## Clone Repository

```bash
git clone <repository-url>
cd bellcorp-event-management
```

---

## Backend Setup

```bash
cd server
npm install
```

Install dependencies manually if needed:

```bash
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
npm install nodemon --save-dev
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Install additional packages:

```bash
npm install axios react-router-dom
```

Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add to `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Run frontend:

```bash
npm start
```

---

# 9. Seeding Mock Data

To populate 10–20 events:

```bash
node seed.js
```

This helps test:

- Search performance
- Filtering
- Capacity handling
- Large collection browsing

---

# 10. Design Decisions

- Server-side filtering for performance
- Backend validation for seat capacity
- Context API for lightweight global state
- MongoDB for flexible schema
- Modular folder architecture
- Clean RESTful API structure

---

# 11. Production Considerations

In real-world applications:

- Event creation should be restricted to Admin roles
- Role-Based Access Control (RBAC) should be implemented
- Pagination should be added
- Database indexing should be optimized
- Sensitive credentials must never be exposed publicly

Event creation was enabled for demonstration purposes only.

---

# 12. Author

Vengatesh Ramar
Email: [vinex521@gmail.com](mailto:vinex521@gmail.com)
GitHub: [https://github.com/Vengatesh521](https://github.com/Vengatesh521)
LinkedIn: [https://www.linkedin.com/in/vengatesh-ramar-5988152a7/](https://www.linkedin.com/in/vengatesh-ramar-5988152a7/)

Developed as part of Bellcorp Engineering Assignment
MERN Stack Application

---End---
