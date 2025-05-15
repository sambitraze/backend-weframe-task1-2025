# 📱 Social Media Backend API

Build a backend API for a basic social media app with users, posts, and comments, including RBAC (Role-Based Access Control).

---

## 🎯 Goal

You'll implement the main business logic for:

- Creating, reading, updating, and deleting posts
- Commenting on posts with CRUD operations
- Enforcing RBAC for user roles (`admin`, `moderator`, `user`)
- User profile management including password change

---

## 📦 Existing Structure

We've scaffolded the following for you:

- Routes, models, and boilerplate setup
- JWT-based authentication middleware
- Role-based access middleware
- MongoDB config

---

## 🧠 Your Task

### Posts Controller

- CRUD endpoints for posts with ownership/admin RBAC enforcement

### Comments Controller

- CRUD endpoints for comments with owner/moderator/admin RBAC enforcement

### Users Controller

- Get profile, update profile, and change password

### Middleware Usage

- Use `auth` middleware on all routes that require the user to be logged in.
- Use `rbac` middleware to restrict actions by user role, passing allowed roles and optionally actions.
- Combine middleware like:

---

## 🔐 Authentication

- Use the provided JWT middleware to secure routes.
- Users have a `role` field: `user`, `moderator`, or `admin`.

---

## 🧪 Testing with Postman

We provide a Postman collection for easy API testing and exploration.

- Import the collection directly from Postman:  
  [Social Media API Collection](https://www.postman.com/grey-eclipse-175099/workspace/weframe-external/collection/12045867-f360dcea-62de-4877-b760-0706885de037?action=share&creator=12045867)

### How to use

1. Open the above link and **fork** or **run in Postman**.
2. Set environment variables like `base_url` (e.g., `http://localhost:5000`) and `token`.
3. Use the collection requests to register, login, and test all endpoints.
4. After login, copy the JWT token and set it in the `token` environment variable to authorize requests.

---

## 🚀 Getting Started

```bash
git clone <your_repo>
cd social-media-api
npm install
cp .env.example .env
npm run dev
```
