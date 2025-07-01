# User Registration API Documentation

## Endpoint

`POST /users/register`

---

## Description

Registers a new user in the system. On successful registration, returns a JWT token and the created user object.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",      // Required, min 3 chars
    "lastname": "Doe"         // Optional, min 3 chars if provided
  },
  "email": "john@example.com", // Required, must be a valid email
  "password": "secret123"      // Required, min 6 chars
}
```

### Field Requirements

- `fullname.firstname` (string, required): User's first name (min 3 characters).
- `fullname.lastname` (string, optional): User's last name (min 3 characters if provided).
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Success

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      // ...other fields
    }
  }
  ```

### Validation Error

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name is required",
        "param": "fullname.firstname",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

### Other Errors

- **Status:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Error message"
  }
  ```

---

## Example Request

```bash
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "password": "secret123"
  }'
```

---

// filepath: d:\Projects UBER MERN\Backend\readme.md