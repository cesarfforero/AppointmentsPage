// src/pages/Register.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo válido")
    .required("El correo es obligatorio"),
  username: Yup.string().required("El usuario es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  nDni: Yup.number()
    .typeError("El documento debe ser numérico")
    .integer("El documento debe ser un número entero")
    .required("El documento es obligatorio"),
  birthdate: Yup.string().nullable(),
});

export default function Register() {
  const { register, loading, authError, setAuthError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/appointments/me", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      username: "",
      password: "",
      nDni: "",
      birthdate: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setAuthError(null);
      const payload = {
        ...values,
        nDni: Number(values.nDni),
        birthdate: values.birthdate || null,
      };
      const ok = await register(payload);
      if (ok) {
        navigate("/login", { replace: true });
      }
    },
  });

  return (
    <div className="app-main-inner">
      <div className="card">
        <div className="heading">
          <div className="heading-title">
            Crea tu cuenta
            <span className="heading-title-pill">New Player</span>
          </div>
          <p className="heading-subtitle">
            Regístrate para reservar turnos de realidad virtual en nuestra arena
            tropical inspirada en los neones de la ciudad.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="form-grid">
          <div className="form-row">
            <label htmlFor="nombre" className="label">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="input"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <span className="error-text">{formik.errors.nombre}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="apellido" className="label">
              Apellido
            </label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              className="input"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.apellido && formik.errors.apellido && (
              <span className="error-text">{formik.errors.apellido}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="email" className="label">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="email"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="error-text">{formik.errors.email}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="username" className="label">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="input"
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="new-password"
            />
            {formik.touched.password && formik.errors.password && (
              <span className="error-text">{formik.errors.password}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="nDni" className="label">
              Documento (nDni)
            </label>
            <input
              id="nDni"
              name="nDni"
              type="text"
              className="input"
              value={formik.values.nDni}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nDni && formik.errors.nDni && (
              <span className="error-text">{formik.errors.nDni}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="birthdate" className="label">
              Fecha de nacimiento (opcional)
            </label>
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              className="input"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.birthdate && formik.errors.birthdate && (
              <span className="error-text">{formik.errors.birthdate}</span>
            )}
          </div>

          {authError && <div className="error-box">{authError}</div>}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || formik.isSubmitting}
            >
              {loading || formik.isSubmitting
                ? "Creando cuenta..."
                : "Crear cuenta"}
            </button>

            <div className="form-helper">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login">Inicia sesión</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
