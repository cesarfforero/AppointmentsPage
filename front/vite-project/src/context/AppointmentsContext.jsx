import React, { createContext, useContext, useState } from "react";
import { API_BASE_URL } from "../config";
import { useAuth } from "./AuthContext";

const AppointmentsContext = createContext(null);

export function AppointmentsProvider({ children }) {
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apptError, setApptError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function fetchMyAppointments() {
    if (!token) return;
    setLoading(true);
    setApptError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "No se pudieron cargar tus turnos");
      }

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setApptError(err.message || "Error al cargar turnos");
    } finally {
      setLoading(false);
    }
  }

  async function createAppointment({ startsAt, endsAt }) {
    if (!token || !user?.id) {
      setApptError("Debes iniciar sesión para crear un turno");
      return false;
    }
    setLoading(true);
    setApptError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/appointments/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.id,
          startsAt,
          endsAt
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (res.status === 409) {
          throw new Error(errData.message || "Ya existe un turno en ese horario");
        }
        throw new Error(errData.message || "No se pudo crear el turno");
      }

      const created = await res.json();
      setAppointments((prev) => [created, ...prev]);
      setSuccessMessage("Turno creado con éxito");
      return true;
    } catch (err) {
      setApptError(err.message || "Error al crear el turno");
      return false;
    } finally {
      setLoading(false);
    }
  }

  const value = {
    appointments,
    loading,
    apptError,
    successMessage,
    fetchMyAppointments,
    createAppointment,
    setAppointments,
    setApptError,
    setSuccessMessage
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) throw new Error("useAppointments debe usarse dentro de AppointmentsProvider");
  return ctx;
}
