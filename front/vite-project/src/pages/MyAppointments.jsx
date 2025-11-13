import React, { useEffect, useState } from "react";
import { useAppointments } from "../context/AppointmentsContext";
import AppointmentCard from "../components/AppointmentCard";

export default function MyAppointments() {
  const {
    appointments,
    loading,
    apptError,
    successMessage,
    fetchMyAppointments,
    cancelAppointment,
  } = useAppointments();

  const [deletingIds, setDeletingIds] = useState([]);

  useEffect(() => {
    fetchMyAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ordenar turnos por fecha de inicio (más cercano primero)
  const sortedAppointments = [...appointments].sort((a, b) => {
    const aDate = new Date(a.startsAt || a.startAt).getTime();
    const bDate = new Date(b.startsAt || b.startAt).getTime();
    return aDate - bDate;
  });

  const handleCancelWithAnimation = (id) => {
    // Marcamos el turno como "eliminándose" para animación
    setDeletingIds((prev) => [...prev, id]);

    // Esperamos un poco para que la animación corra,
    // y luego sí llamamos al cancelAppointment del contexto
    setTimeout(() => {
      cancelAppointment(id);
      setDeletingIds((prev) => prev.filter((currId) => currId !== id));
    }, 250); // 250ms = mismo tiempo que el CSS
  };

  return (
    <div className="app-main-inner">
      <div className="card">
        <div className="heading">
          <div className="heading-title">
            MIS TURNOS VR
            <span className="heading-title-pill">AGENDA</span>
          </div>
          <p className="heading-subtitle">
            Revisa tus turnos reservados en la arena de realidad virtual. No
            llegues tarde o perderás tu sesión en el atardecer neon.
          </p>
        </div>

        {loading && (
          <div className="info-box">
            Cargando tus turnos de realidad virtual…
          </div>
        )}

        {successMessage && !loading && (
          <div className="success-box">{successMessage}</div>
        )}

        {apptError && !loading && (
          <div className="error-box">{apptError}</div>
        )}

        {!loading && !apptError && sortedAppointments.length === 0 && (
          <div className="info-box">
            Aún no tienes turnos creados. Crea tu primer turno de realidad
            virtual desde el botón &quot;Crear turno&quot; en la parte
            superior.
          </div>
        )}

        {!loading && !apptError && sortedAppointments.length > 0 && (
          <div className="appointments-grid">
            {sortedAppointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                onCancel={handleCancelWithAnimation}
                isDeleting={deletingIds.includes(appt.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
