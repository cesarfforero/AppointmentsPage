// src/pages/Login.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const validationSchema = Yup.object({
  username: Yup.string().required("El usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

export default function Login() {
  const { login, loading, authError, setAuthError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname && location.state.from.pathname !== "/login"
      ? location.state.from.pathname
      : "/appointments/me";

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/appointments/me", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setAuthError(null);
      const ok = await login(values);
      if (ok) {
        navigate(from, { replace: true });
      }
    },
  });

  return (
    <div className="app-main-inner">
      <div className="card">
        <div className="heading">
          <div className="heading-title">
            Inicia sesión
            <span className="heading-title-pill">VR Session</span>
          </div>
          <p className="heading-subtitle">
            Accede a tus turnos de realidad virtual y reserva nuevas sesiones
            nocturnas en la arena tropical.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="form-grid">
          <div className="form-row">
            <label htmlFor="username" className="label">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="input"
              placeholder="Ej. cjvargas"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="username"
            />
            {formik.touched.username && formik.errors.username && (
              <span className="error-text">{formik.errors.username}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="password" className="label">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="current-password"
            />
            {formik.touched.password && formik.errors.password && (
              <span className="error-text">{formik.errors.password}</span>
            )}
          </div>

          {authError && <div className="error-box">{authError}</div>}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || formik.isSubmitting}
            >
              {loading || formik.isSubmitting ? "Ingresando..." : "Iniciar sesión"}
            </button>

            <div className="form-helper">
              ¿No tienes cuenta?{" "}
              <Link to="/register">Regístrate aquí</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
