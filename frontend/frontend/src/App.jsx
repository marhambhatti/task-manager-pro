import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      {/* <nav>
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>|{" "}
        <Link to="/dashboard">DashBoard</Link>|{" "}
      </nav> */}

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
