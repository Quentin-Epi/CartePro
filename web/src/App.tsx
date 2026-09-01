import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/login"
import Signup from "@/pages/signup"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Redirection par défaut vers le login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

