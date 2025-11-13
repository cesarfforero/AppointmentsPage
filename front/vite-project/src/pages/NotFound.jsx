import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card">
      <h1>Página no encontrada</h1>
      <p>La ruta que intentas acceder no existe.</p>
      <Link to="/login">
        <button className="btn" style={{ marginTop: "1rem" }}>
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}
