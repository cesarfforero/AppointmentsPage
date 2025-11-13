// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="app-main-inner">
      <div className="card">
        <div className="heading">
          <div className="heading-title">
            404
            <span className="heading-title-pill">Sin sesión</span>
          </div>
          <p className="heading-subtitle">
            Parece que intentaste entrar a una dimensión VR que no existe.
          </p>
        </div>
        <p className="centered-text">
          Vuelve a{" "}
          <Link to="/login">iniciar sesión</Link> o revisa tus{" "}
          <Link to="/appointments/me">turnos VR</Link>.
        </p>
      </div>
    </div>
  );
}
