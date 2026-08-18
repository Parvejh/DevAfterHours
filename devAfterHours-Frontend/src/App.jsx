import { Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Posts from "./pages/Posts"
import Post from "./pages/Post"
import Dashboard from "./pages/Dashboard"
import CreatePost from "./pages/CreatePost";
import ManagePosts from "./pages/ManagePosts";
import ProtectedRoute from "./components/ProtectedRoute"
import EditPost from "./pages/EditPost"

const App = () => {
  return (
    <div className="h-screen w-full">
      <Routes>
        {/* Home page */}
        <Route
          path="/"
          element={<Home />}
        />
        {/* Login page */}
        <Route 
          path='/login' 
          element={<Login />} 
        />
        {/* Dashbaord page */}
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        {/* Dashboard Posts page */}
        <Route
          path="/dashboard/posts"
          element={
              <ProtectedRoute>
                  <ManagePosts />
              </ProtectedRoute>
          }
        />
        {/* Create new Post page */}
        <Route
          path="/dashboard/posts/new"
          element={
              <ProtectedRoute>
                  <CreatePost />
              </ProtectedRoute>
          }
        />
        {/* Edit post */}
        <Route
          path="/dashboard/posts/edit/:id"
          element={
              <ProtectedRoute>
                  <EditPost />
              </ProtectedRoute>
          }
        />
        {/* Register page */}
        <Route 
          path='/register' 
          element={<Register />} 
        />
        {/* Public posts page */}
        <Route 
          path='/posts' 
          element={<Posts />} 
        />
        {/* Specific post page */}
        <Route 
        path="/posts/:slug" 
        element={<Post />} 
        />
        {/* 404 Not Found page */}
        <Route
          path="*"
          element={<NotFound />}
        />
        {/* <Register /> */}
        {/* <Login /> */}
      </Routes>
    </div>
  )
}

export default App
