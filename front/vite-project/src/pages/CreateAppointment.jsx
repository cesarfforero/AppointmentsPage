import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentsContext";

export default function CreateAppointment() {
  const { isAuthenticated } = useAuth();
  const { createAppointment, loading, apptError, successMessage, setApptError, setSuccessMessage } =
    useAppointments();

  if (!isAuthenticated) {
    return (
      <div className="card">
        <h1>Inicia sesión</h1>
        <p>Debes iniciar sesión para crear un turno.</p>
      </div>
    );
  }

  const formik = useFormik({
    initialValues: {
      date: "",
      startTime: "",
      durationMinutes: 60
    },
    validationSchema: Yup.object({
      date: Yup.string().required("La fecha es obligatoria"),
      startTime: Yup.string().required("La hora de inicio es obligatoria"),
      durationMinutes: Yup.number()
        .min(15, "Mínimo 15 minutos")
        .max(240, "Máximo 240 minutos")
        .required("La duración es obligatoria")
    }),
    onSubmit: async (values) => {
      setApptError(null);
      setSuccessMessage(null);

      const { date, startTime, durationMinutes } = values;
      const startsAt = new Date(`${date}T${startTime}:00`);
      if (isNaN(startsAt.getTime())) {
        setApptError("Fecha u hora inválidas");
        return;
      }
      const endsAt = new Date(startsAt.getTime() + durationMinutes * 60 * 1000);

      await createAppointment({
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString()
      });
    }
  });

  return (
    <div className="card">
      <div className="heading">
        <h1>Crear turno</h1>
        <p>Reserva una partida de paintball en el horario que prefieras.</p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <label className="label" htmlFor="date">
            Fecha
          </label>
          <input
            className="input"
            id="date"
            type="date"
            {...formik.getFieldProps("date")}
          />
          {formik.touched.date && formik.errors.date && (
            <div className="error-text">{formik.errors.date}</div>
          )}
        </div>

        <div className="form-row">
          <label className="label" htmlFor="startTime">
            Hora de inicio
          </label>
          <input
            className="input"
            id="startTime"
            type="time"
            {...formik.getFieldProps("startTime")}
          />
          {formik.touched.startTime && formik.errors.startTime && (
            <div className="error-text">{formik.errors.startTime}</div>
          )}
        </div>

        <div className="form-row">
          <label className="label" htmlFor="durationMinutes">
            Duración (minutos)
          </label>
          <input
            className="input"
            id="durationMinutes"
            type="number"
            min={15}
            max={240}
            {...formik.getFieldProps("durationMinutes")}
          />
          {formik.touched.durationMinutes && formik.errors.durationMinutes && (
            <div className="error-text">{formik.errors.durationMinutes}</div>
          )}
        </div>

        {apptError && <div className="error-text">{apptError}</div>}
        {successMessage && <div className="success-text">{successMessage}</div>}

        <div style={{ marginTop: "1rem" }}>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear turno"}
          </button>
        </div>
      </form>
    </div>
  );
}
