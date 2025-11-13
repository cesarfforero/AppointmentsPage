import React from "react";

export default function AppointmentCard({
  appointment,
  onCancel,
  isDeleting = false,
}) {
  const start = new Date(appointment.startsAt || appointment.startAt);
  const end = new Date(appointment.endsAt);

  const durationMinutes = Math.round((end - start) / (1000 * 60));

  const startTime = start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Ej: "martes, 24 feb 2025"
  const dateLabel = start.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const dateLabelPretty =
    dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);

  const handleCancel = () => {
    if (!onCancel) return;
    onCancel(appointment.id);
  };

  return (
    <div
      className={`card card-appointment ${
        isDeleting ? "card-appointment-deleting" : ""
      }`}
    >
      <div className="card-appointment-icon">
        <span role="img" aria-label="VR">
          🕶️
        </span>
      </div>

      <div className="card-appointment-main">
        <div className="card-appointment-date">{dateLabelPretty}</div>

        <div className="card-appointment-title">Sesión VR</div>

        <div className="card-appointment-time">
          {startTime} &mdash; {endTime}
        </div>

        <div className="card-appointment-meta">
          <span>Duración: {durationMinutes} min</span>
          <span className="dot-separator">•</span>
          <span>Arena VR Tropic</span>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-outline-danger card-appointment-cancel"
        onClick={handleCancel}
      >
        Cancelar turno
      </button>
    </div>
  );
}
