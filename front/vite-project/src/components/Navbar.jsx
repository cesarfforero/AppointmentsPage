// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleBrandClick = () => {
    if (isAuthenticated) {
      navigate("/appointments/me");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div
          className="navbar-brand"
          onClick={handleBrandClick}
        >
          <div className="navbar-logo">🌴</div>
          <div className="navbar-title-wrap">
            <span className="navbar-title">VR TROPIC ARENA</span>
            <span className="navbar-subtitle">Turnos de realidad virtual</span>
          </div>
        </div>

        <div className="navbar-spacer" />

        <nav className="navbar-links">
          {!isAuthenticated && (
            <>
              <Link to="/login">
                <button className="btn btn-secondary" type="button">
                  Iniciar sesión
                </button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary" type="button">
                  Crear cuenta
                </button>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <span className="navbar-username">
                Hola, {user?.username || "player"}
              </span>
              <Link to="/appointments/me">
                <button className="btn btn-secondary" type="button">
                  Mis turnos
                </button>
              </Link>
              <Link to="/appointments/create">
                <button className="btn btn-primary" type="button">
                  Crear turno
                </button>
              </Link>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
