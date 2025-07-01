
# 🚗 Uber Clone – Backend API

This is the backend service for the Uber Clone application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). It handles **user registration**, **authentication**, and will support future features like **ride booking**, **real-time sockets**, and **driver/passenger management**.

---

## 🌐 Base URL

```
http://localhost:4000
```

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **bcrypt** for password hashing
- **express-validator** for input validation
- **dotenv** for environment variables

---

## 📁 Project Structure

```
Backend/
│
├── controllers/         # Route Handlers (e.g. register, login)
├── models/              # Mongoose Schemas (User)
├── routes/              # Express Routers
├── services/            # Business logic
├── db/                  # MongoDB connection
├── app.js               # App setup (middleware & routes)
├── server.js            # Server startup
├── .env                 # Environment config
└── readme.md            # Project documentation
```

---

## 🧾 API Endpoints

### 🔐 User Registration

- **POST** `/users/register`

Registers a new user and returns a JWT token.

#### ✅ Request Body (JSON)

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

#### 🔄 Sample curl Request

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "password": "secret123"
  }'
```

#### ✅ Success Response

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

---

### 🔑 User Login (Coming Soon)

- **POST** `/users/login`

Will authenticate users and return a valid JWT.

---

## ⚠️ Validation Error Example

```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sagarsarkar09/Build-an-Uber-Clone-App-with-MERN-Stack.git
cd Backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up `.env` file

```
PORT=4000
DB_CONNECT=mongodb://localhost:27017/uber-videos
JWT_SECRET=your-secret-key
```

### 4️⃣ Start the server

```bash
npx nodemon
```

---

## 📌 To Do Next

- [ ] Login route with JWT auth
- [ ] Protected routes with middleware
- [ ] Socket integration for ride status
- [ ] Role-based access (Driver / Passenger)

---

## 🙋‍♂️ Developer Info

**Name:** Sagar Sarkar  
**Location:** Jorhat, Assam, India  
**GitHub:** [@sagarsarkar09](https://github.com/sagarsarkar09)

---

## 🚀 Happy Coding!
