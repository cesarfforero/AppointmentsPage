// src/App.jsx
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateAppointment from "./pages/CreateAppointment";
import MyAppointments from "./pages/MyAppointments";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <div className="app-main-inner">
          <Routes>
            {/* Ruta raíz: redirige según autenticación */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/appointments/me" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas: usan ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              <Route path="/appointments/me" element={<MyAppointments />} />
              <Route
                path="/appointments/create"
                element={<CreateAppointment />}
              />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

