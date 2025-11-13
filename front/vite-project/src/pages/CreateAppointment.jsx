// src/pages/CreateAppointment.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentsContext";

const validationSchema = Yup.object({
  date: Yup.string().required("La fecha es obligatoria"),
  startTime: Yup.string().required("La hora de inicio es obligatoria"),
  durationMinutes: Yup.number()
    .typeError("La duración debe ser un número")
    .integer("La duración debe ser un número entero")
    .min(15, "La duración mínima es de 15 minutos")
    .max(240, "La duración máxima es de 240 minutos")
    .required("La duración es obligatoria"),
});

export default function CreateAppointment() {
  const { isAuthenticated } = useAuth();
  const {
    createAppointment,
    loading,
    apptError,
    successMessage,
    setApptError,
    setSuccessMessage,
  } = useAppointments();

  const formik = useFormik({
    initialValues: {
      date: "",
      startTime: "",
      durationMinutes: 60,
    },
    validationSchema,
    onSubmit: async (values) => {
      setApptError(null);
      setSuccessMessage(null);

      const { date, startTime, durationMinutes } = values;
      const start = new Date(`${date}T${startTime}:00`);
      if (Number.isNaN(start.getTime())) {
        setApptError("Fecha u hora inválidas. Revisa los campos.");
        return;
      }

      const durationMs = Number(durationMinutes) * 60 * 1000;
      const end = new Date(start.getTime() + durationMs);

      const ok = await createAppointment({
        startsAt: start.toISOString(),
        endsAt: end.toISOString(),
      });

      if (ok) {
        formik.resetForm();
      }
    },
  });

  return (
    <div className="app-main-inner">
      <div className="card">
        <div className="heading">
          <div className="heading-title">
            Crear turno VR
            <span className="heading-title-pill">Neon session</span>
          </div>
          <p className="heading-subtitle">
            Reserva tu turno en la arena de realidad virtual. Elige fecha, hora
            y duración para vivir una experiencia estilo GTA en un atardecer
            tropical.
          </p>
        </div>

        {!isAuthenticated && (
          <p className="centered-text">
            Debes iniciar sesión para crear turnos de realidad virtual. Usa el
            botón &quot;Iniciar sesión&quot; en la barra superior para entrar
            con tu cuenta.
          </p>
        )}

        {isAuthenticated && (
          <form onSubmit={formik.handleSubmit} className="form-grid">
            <div className="form-row">
              <label htmlFor="date" className="label">
                Fecha
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="input"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date && (
                <span className="error-text">{formik.errors.date}</span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="startTime" className="label">
                Hora de inicio
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                className="input"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.startTime && formik.errors.startTime && (
                <span className="error-text">{formik.errors.startTime}</span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="durationMinutes" className="label">
                Duración (minutos)
              </label>
              <input
                id="durationMinutes"
                name="durationMinutes"
                type="number"
                className="input"
                min={15}
                max={240}
                value={formik.values.durationMinutes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.durationMinutes &&
                formik.errors.durationMinutes && (
                  <span className="error-text">
                    {formik.errors.durationMinutes}
                  </span>
                )}
            </div>

            {apptError && <div className="error-box">{apptError}</div>}
            {successMessage && (
              <div className="success-box">{successMessage}</div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || formik.isSubmitting}
              >
                {loading || formik.isSubmitting
                  ? "Creando turno..."
                  : "Crear turno"}
              </button>
              <div className="form-helper">
                Consejo: evita solapar horarios para no perder tu sesión VR.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

