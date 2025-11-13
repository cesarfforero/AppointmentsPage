/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_BASE_URL } from "../config";

const AuthContext = createContext(null);

// Decodifica un JWT (solo para leer el payload en el front)
function decodeJwt(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error al decodificar JWT:", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, username, ... }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Restaurar sesión desde localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const isAuthenticated = Boolean(token && user);

  async function login({ username, password }) {
    setLoading(true);
    setAuthError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Credenciales inválidas");
      }

      const data = await res.json();
      console.log("Login exitoso. Respuesta backend:", data);

      const accessToken = data.accessToken || data.token;
      if (!accessToken) {
        throw new Error("No se recibió accessToken del servidor.");
      }

      // 🧠 Sacar el id del usuario desde el JWT
      const payload = decodeJwt(accessToken);
      console.log("Payload decodificado del JWT:", payload);

      const inferredId =
        payload?.userId || payload?.id || payload?.sub || data.userId;

      const loggedUser =
        data.user ||
        {
          username: data.username || username,
          id: inferredId,
        };

      if (!loggedUser.id) {
        console.warn(
          "Login: no se pudo determinar el id de usuario. user.id será undefined."
        );
      }

      setToken(accessToken);
      setUser(loggedUser);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      return true;
    } catch (err) {
      console.error("Error en login:", err);
      setAuthError(err.message || "Error de autenticación");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(payload) {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "No se pudo registrar");
      }

      return true;
    } catch (err) {
      console.error("Error en register:", err);
      setAuthError(err.message || "Error en el registro");
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    authError,
    login,
    register,
    logout,
    setAuthError,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
