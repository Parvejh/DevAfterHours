import { Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Posts from "./pages/Posts"
import Post from "./pages/Post"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route 
          path='/login' 
          element={<Login />} 
        />
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/register' 
          element={<Register />} 
        />
        <Route 
          path='/posts' 
          element={<Posts />} 
        />
        <Route 
        path="/posts/:slug" 
        element={<Post />} />
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
