import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Signup from "./pages/signup"
import PartnerPaymentPage from "./pages/PartnerPages/payment"
import EmployeePaymentPage from "./pages/EmployeePages/payment"
import { Header } from "./components/Header"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/EmployeePages/payment" element={<><Header /><EmployeePaymentPage /></>} />
        <Route path="/PartnerPages/payment" element={<><Header /><PartnerPaymentPage /></>} />
        {/* Redirection par défaut vers le login */}
        <Route path="*" element={<><Navigate to="/EmployeePages/payment" replace /></>} />
      </Routes>
    </BrowserRouter>
  )
}
