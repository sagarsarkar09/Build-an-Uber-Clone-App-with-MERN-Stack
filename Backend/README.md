# 🚖 Uber Clone Backend (MERN Stack)

This is the backend service for an Uber Clone application using Node.js, Express, MongoDB, and JWT for authentication.

---

## 📁 Folder Structure

```
backend/
├── controllers/
│   └── user.controller.js
├── models/
│   ├── user.model.js
│   └── blacklistToken.model.js
├── routes/
│   └── user.routes.js
├── middleware/
│   └── auth.middleware.js
├── db/
│   └── db.js
├── app.js
├── server.js
├── .env
└── package.json
```

---

## ⚙️ Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Bcrypt
- Express Validator

---

## 📦 API Endpoints

### 📝 `POST /users/register` – Register a new user

#### Request Body:
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

#### Response:
```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

---

### 🔐 `POST /users/login` – Login a user

#### Request Body:
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

#### Response:
```json
{
  "token": "<jwt_token>",
  "user": { "email": "john@example.com", ... }
}
```

---

### 🔒 `GET /users/profile` – Protected route (requires token)

Send JWT in header:
```
Authorization: Bearer <token>
```

#### Response:
```json
{
  "user": { "email": "john@example.com", "fullname": ... }
}
```

---

### 🚪 `POST /users/logout` – Logout and blacklist the token

#### Description:
Adds the current token to a blacklist with a TTL (Time To Live) of 24 hours. This prevents reuse after logout.

#### Response:
```json
{
  "message": "Logout successful. Token invalidated."
}
```

---

## 🗃️ Token Blacklisting

Blacklisted tokens are stored in MongoDB using the `blacklistToken.model.js` schema.

- Each token has a TTL of **24 hours**.
- Expired tokens are auto-deleted by MongoDB.

---

## 🧪 Testing

Use Postman or curl to test:
- `POST /users/register`
- `POST /users/login`
- `GET /users/profile` with token
- `POST /users/logout`

---

## 📞 Contact Developer

**Name:** Sagar Sarkar  
**Location:** Jorhat, Assam, India

---

🚀 Happy Coding!
