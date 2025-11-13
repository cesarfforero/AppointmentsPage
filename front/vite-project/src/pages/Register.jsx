import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loading, authError, setAuthError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si ya está logueado, no tiene sentido estar en /register
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/appointments/me");
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
      birthdate: ""
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string().email("Correo no válido").required("El correo es obligatorio"),
      username: Yup.string().required("El usuario es obligatorio"),
      password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("La contraseña es obligatoria"),
      nDni: Yup.number()
        .typeError("El DNI debe ser un número")
        .integer("Debe ser un número entero")
        .required("El DNI es obligatorio"),
      // birthdate la dejamos opcional, por si en el back no es requerida
      birthdate: Yup.string().nullable()
    }),
    onSubmit: async (values) => {
      setAuthError(null);

      // nDni como número real
      const payload = {
        nombre: values.nombre,
        apellido: values.apellido,
        email: values.email,
        username: values.username,
        password: values.password,
        nDni: Number(values.nDni),
        // solo mandamos birthdate si viene
        ...(values.birthdate ? { birthdate: values.birthdate } : {})
      };

      const ok = await register(payload);
      if (ok) {
        navigate("/login");
      }
    }
  });

  return (
    <div className="card">
      <div className="heading">
        <h1>Crea tu cuenta</h1>
        <p>Regístrate para gestionar tus turnos de paintball.</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {/* Nombre */}
        <div className="form-row">
          <label className="label" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="input"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nombre}
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <div className="error-text">{formik.errors.nombre}</div>
          )}
        </div>

        {/* Apellido */}
        <div className="form-row">
          <label className="label" htmlFor="apellido">
            Apellido
          </label>
          <input
            className="input"
            id="apellido"
            name="apellido"
            placeholder="Tu apellido"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.apellido}
          />
          {formik.touched.apellido && formik.errors.apellido && (
            <div className="error-text">{formik.errors.apellido}</div>
          )}
        </div>

        {/* Email */}
        <div className="form-row">
          <label className="label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="input"
            id="email"
            name="email"
            placeholder="tucorreo@ejemplo.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-text">{formik.errors.email}</div>
          )}
        </div>

        {/* Usuario */}
        <div className="form-row">
          <label className="label" htmlFor="username">
            Usuario
          </label>
          <input
            className="input"
            id="username"
            name="username"
            placeholder="Nombre de usuario"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="error-text">{formik.errors.username}</div>
          )}
        </div>

        {/* Contraseña */}
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

        {/* DNI */}
        <div className="form-row">
          <label className="label" htmlFor="nDni">
            DNI / Documento
          </label>
          <input
            className="input"
            id="nDni"
            name="nDni"
            placeholder="12345678"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nDni}
          />
          {formik.touched.nDni && formik.errors.nDni && (
            <div className="error-text">{formik.errors.nDni}</div>
          )}
        </div>

        {/* Fecha de nacimiento (opcional) */}
        <div className="form-row">
          <label className="label" htmlFor="birthdate">
            Fecha de nacimiento (opcional)
          </label>
          <input
            className="input"
            id="birthdate"
            name="birthdate"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthdate}
          />
          {formik.touched.birthdate && formik.errors.birthdate && (
            <div className="error-text">{formik.errors.birthdate}</div>
          )}
        </div>

        {authError && <div className="error-text">{authError}</div>}

        <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
          <Link to="/login">
            <button type="button" className="btn-secondary">
              Ya tengo cuenta
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

