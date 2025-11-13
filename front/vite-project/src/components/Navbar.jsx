import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        borderBottom: "1px solid #1f2937",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#020617"
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
        onClick={() => navigate(isAuthenticated ? "/appointments/me" : "/login")}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "999px",
            background: "radial-gradient(circle at 30% 30%, #22c55e, #0f172a)"
          }}
        />
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Paintball Booker</div>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
            Reservas de partidas y canchas
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {!isAuthenticated && (
          <>
            <Link to="/login">
              <button className="btn-secondary" style={{ fontSize: "0.85rem" }}>
                Iniciar sesión
              </button>
            </Link>
            <Link to="/register">
              <button className="btn" style={{ fontSize: "0.85rem" }}>
                Crear cuenta
              </button>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link to="/appointments/me">
              <button className="btn-secondary" style={{ fontSize: "0.85rem" }}>
                Mis turnos
              </button>
            </Link>
            <Link to="/appointments/new">
              <button className="btn-secondary" style={{ fontSize: "0.85rem" }}>
                Crear turno
              </button>
            </Link>
            <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
              {user?.username ? `Hola, ${user.username}` : "Sesión iniciada"}
            </span>
            <button className="btn-danger" onClick={handleLogout} style={{ fontSize: "0.85rem" }}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
