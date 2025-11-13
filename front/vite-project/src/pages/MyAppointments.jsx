import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentsContext";
import AppointmentCard from "../components/AppointmentCard";

export default function MyAppointments() {
  const { isAuthenticated } = useAuth();
  const { appointments, loading, apptError, fetchMyAppointments } = useAppointments();

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyAppointments();
    }
  }, [isAuthenticated, fetchMyAppointments]);

  if (!isAuthenticated) {
    return (
      <div className="card">
        <h1>Inicia sesión</h1>
        <p>Debes iniciar sesión para ver tus turnos.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="heading">
        <h1>Mis turnos</h1>
        <p>Consulta las partidas que has agendado.</p>
      </div>

      {loading && <p>Cargando tus turnos...</p>}

      {apptError && <div className="error-text">{apptError}</div>}

      {!loading && !apptError && appointments.length === 0 && (
        <div className="list-empty">
          <p>Aún no tienes turnos creados.</p>
          <p style={{ marginTop: "0.25rem" }}>Crea tu primer turno desde “Crear turno”.</p>
        </div>
      )}

      <div className="appointments-list">
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} />
        ))}
      </div>
    </div>
  );
}
