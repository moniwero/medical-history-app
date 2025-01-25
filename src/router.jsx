// Konfiguracja ścieżek

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Results from "./pages/Results";
import AddResult from "./pages/AddResult";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/results/:category" element={<Results />} />
        <Route path="/add-result" element={<AddResult />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
