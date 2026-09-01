import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/login"
import Signup from "@/pages/signup"
import PartnerPaymentPage from "@/pages/PartnerPages/payment"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/PartnerPages/payment" element={<PartnerPaymentPage />} />
        {/* Redirection par défaut vers le login */}
        <Route path="*" element={<Navigate to="PartnerPages/payment" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

