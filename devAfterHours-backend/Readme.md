# DevAfterHours Backend

Backend API for **DevAfterHours**, a developer-focused blogging platform. The project is built with Node.js, Express, MongoDB, and Mongoose, with JWT-based authentication and bcrypt password hashing.

The backend is designed to power a React frontend and currently focuses on user authentication and blog post management.

---

## 🚀 Features

- User registration
- Secure password hashing with `bcrypt`
- User login with JWT authentication
- Protected API routes using authentication middleware
- Blog post creation
- Public access to published posts through slugs
- Blog post update/delete endpoints
- Draft, published, and archived post states
- Categories and tags through MongoDB references
- Post view tracking field
- MongoDB integration using Mongoose
- Environment-based configuration
- Modular MVC-style project structure
- Server-side post pagination
- Search published posts by title, slug, and excerpt
- Combined search and pagination support
- Pagination metadata including current page, total posts, and total pages

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| dotenv | Environment variables |
| CORS | Cross-origin support |

---

## 📁 Project Structure

```text
devAfterHours-backend/
│
├── Configs/
│   └── db.js
│
├── Controllers/
│   ├── authController.js
│   ├── homeController.js
│   └── postController.js
│
├── Middlewares/
│   └── authMiddleware.js
│
├── Models/
│   ├── User.js
│   ├── Post.js
│   ├── Category.js
│   └── Tag.js
│
├── Routes/
│   ├── authRoutes.js
│   └── postRoutes.js
│
├── Utils/
│   └── generateToken.js
│
├── app.js
├── server.js
├── package.json
├── .gitignore
└── README.md
```

### Architecture

The backend follows a simple MVC-inspired architecture:

```text
Client
  │
  ▼
Routes
  │
  ▼
Middleware
  │
  ▼
Controllers
  │
  ▼
Models
  │
  ▼
MongoDB
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd devAfterHours-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit `.env` to Git. It is already included in `.gitignore`.

### 4. Start the development server

```bash
npm start
```

The server will run on:

```text
http://localhost:3000
```

---

# 🔐 Authentication API

Base URL:

```text
/api/auth
```

## Register

### `POST /api/auth/register`

Creates a new user.

### Request body

```json
{
  "name": "Parvej",
  "email": "parvej@example.com",
  "password": "password123",
  "bio": "Full-stack developer"
}
```

### Response

```json
{
  "success": true,
  "message": "User created successfully!"
}
```

---

## Login

### `POST /api/auth/login`

Authenticates a user and returns a JWT.

### Request body

```json
{
  "email": "parvej@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "message": "Login Successfull",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "Parvej",
      "email": "parvej@example.com",
      "avatar": null,
      "bio": "Full-stack developer"
    },
    "token": "JWT_TOKEN"
  }
}
```

The returned token should be sent with protected requests:

```http
Authorization: Bearer JWT_TOKEN
```

---

# 📝 Posts API

Base URL:

```text
/api/posts
```

## Get Published Post

### `GET /api/posts/:slug`

Returns a published post using its slug.

Example:

```http
GET /api/posts/understanding-javascript-closures
```

Only posts with:

```text
status = published
```

are returned by this endpoint.

---

## Create Post

### `POST /api/posts/createPost`

🔒 Authentication required.

### Headers

```http
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

### Request body

```json
{
  "title": "Understanding JavaScript Closures",
  "slug": "understanding-javascript-closures",
  "excerpt": "A practical introduction to JavaScript closures.",
  "content": "Your blog content goes here.",
  "coverImage": "https://example.com/cover.jpg",
  "category": "CATEGORY_ID",
  "tags": [
    "TAG_ID_1",
    "TAG_ID_2"
  ],
  "status": "draft"
}
```

---

## Update Post

### `PATCH /api/posts/:slug`

🔒 Authentication required.

Example:

```http
PATCH /api/posts/understanding-javascript-closures
```

The endpoint is intended to update post metadata and content.

---

## Delete Post

### `DELETE /api/posts/:id`

🔒 Authentication required.

The API verifies that the authenticated user is the author before allowing deletion.

---
## 🔎 Search & Pagination

The published posts endpoint supports both search and pagination.

### Search

Posts can be searched using:

- `title`
- `slug`
- `excerpt`

Example:

```http
GET /api/posts?search=javascript
```

# 🗄️ Database Models

## User

The `User` model stores account and profile information.

```text
User
├── name
├── email
├── password
├── avatar
├── bio
├── createdAt
└── updatedAt
```

Passwords are stored as bcrypt hashes rather than plain text.

---

## Post

The `Post` model represents a blog article.

```text
Post
├── title
├── slug
├── excerpt
├── content
├── coverImage
├── category → Category
├── tags[] → Tag
├── author → User
├── status
├── publishedAt
├── views
├── createdAt
└── updatedAt
```

### Post status

```text
draft
published
archived
```

This allows the backend to support a publishing workflow instead of treating every created post as immediately public.

---

## Category

Categories organize posts into larger topics.

```text
Category
├── name
├── slug
├── createdAt
└── updatedAt
```

---

## Tag

Tags provide more granular classification for posts.

```text
Tag
├── name
├── slug
├── createdAt
└── updatedAt
```

A post can contain multiple tags.

---

# 🔑 Authentication Flow

The authentication flow works as follows:

```text
Register
   │
   ▼
Password
   │
   ▼
bcrypt.hash()
   │
   ▼
MongoDB
```

For login:

```text
Email + Password
       │
       ▼
Find User
       │
       ▼
bcrypt.compare()
       │
       ▼
Generate JWT
       │
       ▼
Return Token
```

For protected routes:

```text
Request
  │
  ▼
Authorization Header
  │
  ▼
Extract Bearer Token
  │
  ▼
Verify JWT
  │
  ▼
Find User
  │
  ▼
req.user
  │
  ▼
Controller
```

JWT tokens currently expire after **7 days**.

---

# 🔒 Security

The project currently implements several basic security practices:

- Passwords are hashed using bcrypt.
- Passwords are never returned in login responses.
- JWT is used for authentication.
- Protected routes require a valid Bearer token.
- User identity is attached to `req.user` by authentication middleware.
- Environment variables are used for secrets and database configuration.

For production, additional protections should be added, such as:

- Request validation
- Rate limiting
- Helmet/security headers
- Stronger error handling
- Input sanitization
- Refresh-token strategy
- Proper CORS configuration
- Production logging
- API documentation
- Automated tests

---

# 🧪 Testing

Automated tests have not been added yet.

The API can currently be tested using tools such as:

- Postman
- Insomnia
- Thunder Client
- Frontend API requests

A future test suite should cover:

```text
Authentication
├── Registration
├── Duplicate registration
├── Login
├── Invalid credentials
└── Invalid/expired JWT

Posts
├── Create
├── Read
├── Update
├── Delete
├── Unauthorized access
└── Published/draft behavior
```

---

# 🗺️ Roadmap

The project is currently being developed alongside the frontend.

Completed:

- [x] Post CRUD flow
- [x] Draft/published/archived post states
- [x] Pagination
- [x] Search by title, slug, and excerpt
- [x] Search + pagination
- [x] Pagination metadata

Planned improvements:

- [ ] Category management APIs
- [ ] Tag management APIs
- [ ] User profile APIs
- [ ] Automatic `publishedAt` handling
- [ ] Post view incrementing
- [ ] Filtering by category and tags
- [ ] Sorting posts
- [ ] Related posts
- [ ] Request validation
- [ ] Centralized error handling
- [ ] API tests
- [ ] API documentation
- [ ] Image upload support
- [ ] Production deployment
- [ ] Admin/dashboard APIs

---

# 📌 Current Development Status

> **Status: Work in Progress**

The backend foundation is in place, including authentication, database models, JWT middleware, and initial post APIs.

The project is intentionally being developed incrementally. Some endpoints and model relationships are currently scaffolding for functionality that will be completed as the frontend and publishing workflow are built.

---

## 👨‍💻 Author

**Parvej Hussain**

Built as part of the **DevAfterHours** developer blogging platform.
ment

Admin/dashboard APIs

📌 Current Development Status

Status: Work in Progress

The backend foundation is in place, including authentication, database models, JWT middleware, and initial post APIs.

The project is intentionally being developed incrementally. Some endpoints and model relationships are currently scaffolding for functionality that will be completed as the frontend and publishing workflow are built.

👨‍💻 Author

Parvej Hussain

Built as part of the DevAfterHours developer blogging platform.