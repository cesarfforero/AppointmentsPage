import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/appointments/me";

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("El usuario es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria")
    }),
    onSubmit: async (values) => {
      setAuthError(null);
      const ok = await login(values);
      if (ok) {
        navigate(from, { replace: true });
      }
    }
  });

  return (
    <div className="card">
      <div className="heading">
        <h1>Inicia sesión</h1>
        <p>Accede a tus turnos y reserva nuevas partidas de paintball.</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <label className="label" htmlFor="username">
            Usuario
          </label>
          <input
            className="input"
            id="username"
            name="username"
            placeholder="ej. cesar"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="error-text">{formik.errors.username}</div>
          )}
        </div>

        <div className="form-row">
          <label className="label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-text">{formik.errors.password}</div>
          )}
        </div>

        {authError && <div className="error-text">{authError}</div>}

        <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
          <span style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
            ¿No tienes cuenta?{" "}
            <Link to="/register" style={{ color: "#38bdf8" }}>
              Regístrate aquí
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
