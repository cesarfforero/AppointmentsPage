import React from "react";

export default function AppointmentCard({ appointment }) {
  const starts = new Date(appointment.startsAt);
  const ends = new Date(appointment.endsAt);

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
            Partida #{appointment.id.slice(0, 8)}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
            {starts.toLocaleString()} → {ends.toLocaleTimeString()}
          </div>
        </div>
        <span
          style={{
            fontSize: "0.75rem",
            padding: "0.2rem 0.6rem",
            borderRadius: "999px",
            border: "1px solid #4b5563",
            textTransform: "uppercase",
            color: appointment.status === "cancelled" ? "#f97373" : "#4ade80"
          }}
        >
          {appointment.status}
        </span>
      </div>
      {appointment.user && (
        <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
          Jugador: <strong>{appointment.user.name || appointment.user.username}</strong>
        </div>
      )}
    </div>
  );
}
