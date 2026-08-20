# Blog Application — Frontend

The frontend for a full-stack personal blogging platform built with React.

The application provides an admin dashboard for creating, managing, editing, and deleting blog posts, along with a public-facing section for reading published posts.

## 🚀 Features

### Authentication
- JWT-based authentication
- Protected dashboard routes
- Authentication state managed through React Context
- Token sent through the `Authorization` header
- Handles invalid/expired authentication tokens

### Blog Management
- Create new posts
- View all managed posts
- Edit existing posts
- Delete posts
- View published posts
- Manage post status: Draft, Published, Archived

### Post Creation
- Title
- Slug
- Excerpt
- Cover image URL
- Content
- Status

### Post Editing
- Fetch existing post using its ID
- Populate the edit form with existing data
- Modify individual fields
- Update the post using PATCH
- Loading state during update
- Success/error messages
- Redirect to dashboard after successful update

### Post Deletion
- Delete post using its ID
- JWT authentication
- Loading state while deleting
- Immediately removes the deleted post from the UI without requiring a page refresh

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend UI |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Axios | API requests |
| Context API | Authentication state |
| JavaScript | Application logic |

## 📁 Project Structure

```text
src/
├── components/
│   ├── Home/
│   │   └── Navbar.jsx
│   ├── ManagePostCard.jsx
│   ├── PostCard.jsx
│   └── EditPostForm.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   ├── ManagePosts.jsx
│   └── Posts.jsx
├── services/
│   └── postServices.js
├── App.jsx
└── main.jsx
```

> The exact structure may change as the application grows.

## 🧩 Application Architecture

```text
Pages
  ↓
Components
  ↓
Services
  ↓
Backend API
  ↓
MongoDB
```

### Pages
Pages handle routing, page-level state, fetching required data, and passing data to components.

### Components
Components handle UI, forms, user interactions, and local component state.

### Services
The service layer handles API communication through functions such as:

```text
createPost()
getPosts()
getManagePosts()
getPostForEdit()
editPost()
deletePost()
```

This keeps Axios/API logic separate from the UI.

## 🔐 Authentication

Authentication is handled using JWT.

The authentication state is exposed through:

```js
useAuth()
```

Protected API requests include:

```text
Authorization: Bearer <token>
```

Request flow:

```text
React Component
      ↓
useAuth()
      ↓
JWT Token
      ↓
Axios
      ↓
Authorization Header
      ↓
Backend Auth Middleware
```

## 🌐 API Service Layer

API requests are centralized inside:

```text
src/services/postServices.js
```

Example flow:

```text
Component
   ↓
postServices.js
   ↓
Axios
   ↓
Express API
```

## ✍️ Create Post Flow

```text
CreatePost
    ↓
User fills form
    ↓
handleSubmit()
    ↓
Create post data object
    ↓
createPost()
    ↓
POST API
    ↓
JWT authentication
    ↓
Backend
    ↓
MongoDB
```

The form uses controlled React inputs for:

```text
title
slug
excerpt
coverImage
content
status
```

## 📝 Edit Post Flow

### Fetch the post

```text
/dashboard/posts/edit/:id
          ↓
getPostForEdit(id, token)
          ↓
GET /edit/:id
          ↓
Backend
          ↓
Post data
```

### Update the post

```text
User modifies form
        ↓
handleSubmit()
        ↓
updatedPostData
        ↓
editPost(id, updatedPostData, token)
        ↓
PATCH /edit/:id
        ↓
MongoDB
```

After a successful update:

```text
Success message
      ↓
2 second delay
      ↓
Dashboard
```

## 🗑️ Delete Post Flow

```text
Delete button
      ↓
handleDelete()
      ↓
deletePost(id, token)
      ↓
DELETE API
      ↓
MongoDB
      ↓
onDelete(id)
      ↓
ManagePosts
      ↓
setPosts()
      ↓
filter deleted post
      ↓
UI re-renders
```

The frontend removes the deleted post from local state instead of fetching the entire list again.

## ⚡ Loading & Error States

Common state:

```js
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
```

Typical lifecycle:

```text
Start request
    ↓
isLoading = true
    ↓
API request
    ↓
Success / Error
    ↓
isLoading = false
```

## 🛣️ Routes

```text
/posts
```

Public posts page.

```text
/dashboard/posts
```

Manage posts dashboard.

```text
/dashboard/posts/edit/:id
```

Edit a specific post.

```text
/dashboard/posts/create
```

Create a new post.

> Route names can be adjusted as the application evolves.

## 🎨 Styling

The application uses Tailwind CSS and follows a minimal, clean, light-themed, responsive design approach.

## ⚙️ Environment Variables

Create a `.env` file in the frontend project:

```env
VITE_API_URL=http://localhost:5000/api
```

The service layer consumes the API URL:

```js
const API_URL = import.meta.env.VITE_API_URL;
```

> Do not commit `.env` files containing secrets to Git.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the frontend

```bash
cd frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create `.env` and add:

```env
VITE_API_URL=<your-backend-api-url>
```

### 5. Start the development server

```bash
npm run dev
```

## 📦 Main Dependencies

```text
react
react-router-dom
axios
tailwindcss
```

## 🔄 Current CRUD Status

| Feature | Status |
|---|---|
| Create Post | ✅ |
| Read Published Posts | ✅ |
| Read Manage Posts | ✅ |
| Read Single Post | ✅ |
| Update Post | ✅ |
| Delete Post | ✅ |
| JWT Authentication | ✅ |
| Protected API Requests | ✅ |
| Loading States | ✅ |
| Error Handling | ✅ |
| Success Feedback | ✅ |
| Client-side State Update After Delete | ✅ |

## 🔮 Future Improvements

- Better form validation
- Automatic slug generation
- Rich text editor
- Markdown support
- Image upload instead of image URLs
- Pagination
- Search posts
- Filter posts by status
- Sort posts
- Confirmation modal before deletion
- Loading skeletons
- Toast notifications
- Responsive mobile UI
- Centralized Axios configuration
- Axios interceptors for authentication errors
- Better authentication/session handling

## 📌 Development Philosophy

The frontend is being developed incrementally with an emphasis on understandable architecture.

Current principles:

- Keep API logic inside service functions
- Keep authentication inside Context
- Keep reusable UI inside components
- Keep page-level logic inside pages
- Use controlled forms
- Handle loading and error states
- Update local state when possible instead of unnecessarily refetching data
- Prefer simple solutions before introducing additional libraries

## 👨‍💻 Project Status

The frontend currently supports the complete basic blog management workflow:

```text
Authentication
      ↓
Dashboard
      ↓
Create ──→ Read ──→ Edit
                ↘
                 Delete
```

The next stage is focused on improving validation, authorization, UX, and overall code architecture.
