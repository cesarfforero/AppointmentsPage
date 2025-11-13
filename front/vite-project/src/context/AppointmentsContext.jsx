/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { useAuth } from "./AuthContext";

const AppointmentsContext = createContext(null);

export function AppointmentsProvider({ children }) {
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apptError, setApptError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Cuando se cierra sesión limpiamos turnos y mensajes
  useEffect(() => {
    if (!token) {
      setAppointments([]);
      setApptError(null);
      setSuccessMessage(null);
    }
  }, [token]);

  async function fetchMyAppointments() {
    if (!token) return;

    setLoading(true);
    setApptError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        let message = "No se pudieron cargar tus turnos";

        try {
          const rawText = await res.text();
          console.error("Respuesta de error /appointments:", rawText);

          try {
            const data = JSON.parse(rawText);
            if (data && data.message) {
              message = data.message;
            }
          } catch {
            if (rawText) message = rawText;
          }
        } catch (error) {
          console.error("Error al leer respuesta de turnos:", error);
        }

        setApptError(message);
        return;
      }

      const data = await res.json();
      const all =Array.isArray(data) ? data : [];
      const mine = all.filter(
        (appt) =>
          appt?.user?.credential?.username === user.username &&
          (appt.status ?? "active") === "active"
      );
      setAppointments(mine);

    }catch (error) {
      console.error("Error de red al cargar turnos:", error);
      setApptError("Error de conexión al cargar tus turnos.");
    } finally {
      setLoading(false);
    }
  }

  async function createAppointment({ startsAt, endsAt }) {
    if (!token) {
      setApptError("Debes iniciar sesión para crear un turno.");
      return false;
    }

    if (!user || !user.id) {
      setApptError(
        "No se pudo determinar el usuario actual. Vuelve a iniciar sesión."
      );
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id, // 🔹 el back espera userId
          startsAt,        // 🔹 nombre correcto con "s"
          endsAt,
        }),
      });

      if (!res.ok) {
        let message = "No se pudo crear el turno";

        try {
          const rawText = await res.text();
          console.error(
            "Respuesta de error /appointments/schedule:",
            rawText
          );

          try {
            const data = JSON.parse(rawText);
            if (data && data.message) {
              message = data.message;
            }
          } catch {
            if (rawText) message = rawText;
          }
        } catch (error) {
          console.error(
            "Error al leer respuesta de creación de turno:",
            error
          );
        }

        setApptError(message);
        return false;
      }

      const created = await res.json();
      setAppointments((prev) => [created, ...prev]);
      setSuccessMessage("Turno creado con éxito.");
      return true;
    } catch (error) {
      console.error("Error de red al crear turno:", error);
      setApptError("Error de conexión al crear el turno.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // 🔥 Cancelar turno
  async function cancelAppointment(id) {
    if (!token) {
      setApptError("Debes iniciar sesión para cancelar un turno.");
      return false;
    }

    setLoading(true);
    setApptError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/appointments/cancel/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        let message = "No se pudo cancelar el turno";

        try {
          const rawText = await res.text();
          console.error("Respuesta de error /appointments/cancel:", rawText);

          try {
            const data = JSON.parse(rawText);
            if (data && data.message) {
              message = data.message;
            }
          } catch {
            if (rawText) message = rawText;
          }
        } catch (error) {
          console.error(
            "Error al leer respuesta de cancelación de turno:",
            error
          );
        }

        setApptError(message);
        return false;
      }

      // Si todo bien, lo sacamos del estado
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      setSuccessMessage("Turno cancelado correctamente.");
      return true;
    } catch (error) {
      console.error("Error de red al cancelar turno:", error);
      setApptError("Error de conexión al cancelar el turno.");
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
    cancelAppointment,
    setApptError,
    setSuccessMessage,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) {
    throw new Error(
      "useAppointments debe usarse dentro de AppointmentsProvider"
    );
  }
  return ctx;
}
