import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Movies from './pages/Movies'
import LikedMovies from './pages/LikedMovies'
import Navbar from './components/Navbar'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><><Navbar /><Movies /></></PrivateRoute>} />
        <Route path="/liked" element={<PrivateRoute><><Navbar /><LikedMovies /></></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App