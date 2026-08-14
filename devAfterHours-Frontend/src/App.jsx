import { Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Posts from "./pages/Posts"

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
          path='/register' 
          element={<Register />} 
        />
        <Route 
          path='/posts' 
          element={<Posts />} 
        />
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
