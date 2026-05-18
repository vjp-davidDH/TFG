// ============================================================
// TripCollab — Integración React + Axios
// ============================================================
// Archivo: src/api/tripcollab.js
// Configura una instancia de Axios que adjunta
// automáticamente el JWT en cada petición.
// ============================================================

import axios from "axios";

// ── 1. Instancia base ────────────────────────────────────────
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// ── 2. Interceptor de REQUEST: inyecta el token JWT ──────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tripcollab_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── 3. Interceptor de RESPONSE: manejo global de errores ─────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido → redirigir al login
      localStorage.removeItem("tripcollab_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// export default api;


// ============================================================
// Archivo: src/api/auth.js
// ============================================================

// Registro de nuevo usuario
export async function register(nombre, email, password) {
  const { data } = await api.post("/auth/register", { nombre, email, password });
  return data; // { mensaje: "Usuario registrado correctamente" }
}

// Login → guarda el token en localStorage
export async function login(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("tripcollab_token", data.token);
  return data; // { token, usuario: { id_usuario, nombre } }
}

// Logout → limpia el token
export function logout() {
  localStorage.removeItem("tripcollab_token");
}


// ============================================================
// Archivo: src/api/planes.js
// ============================================================

// Listar todos los planes disponibles
export async function getPlanes() {
  const { data } = await api.get("/planes/");
  return data; // [ { id_plan, nombre, precio_total, destino, ... }, ... ]
}

// Detalle de un plan con alojamientos y transportes
export async function getPlan(id) {
  const { data } = await api.get(`/planes/${id}`);
  return data;
}

// Crear un plan (requiere token)
export async function createPlan(planData) {
  // planData: { nombre, descripcion?, precio_total, id_destino }
  const { data } = await api.post("/planes/", planData);
  return data;
}

// Actualizar un plan
export async function updatePlan(id, planData) {
  const { data } = await api.put(`/planes/${id}`, planData);
  return data;
}

// Eliminar un plan
export async function deletePlan(id) {
  const { data } = await api.delete(`/planes/${id}`);
  return data;
}


// ============================================================
// Archivo: src/api/reservas.js
// ============================================================

// Mis reservas
export async function getMisReservas() {
  const { data } = await api.get("/reservas/");
  return data;
}

// Crear reserva para un plan
export async function createReserva(id_plan) {
  const { data } = await api.post("/reservas/", { id_plan });
  return data;
}

// Cambiar estado de reserva
export async function updateEstadoReserva(id_reserva, estado) {
  const { data } = await api.patch(`/reservas/${id_reserva}/estado`, { estado });
  return data;
}


// ============================================================
// Archivo: src/api/favoritos.js
// ============================================================

export async function getMisFavoritos() {
  const { data } = await api.get("/favoritos/");
  return data;
}

export async function addFavorito(id_plan) {
  const { data } = await api.post("/favoritos/", { id_plan });
  return data;
}

export async function removeFavorito(id_plan) {
  const { data } = await api.delete(`/favoritos/${id_plan}`);
  return data;
}


// ============================================================
// Ejemplo de uso dentro de un componente React
// ============================================================

import React, { useEffect, useState } from "react";
import { getPlanes } from "../api/planes";
import { addFavorito } from "../api/favoritos";

export default function ListaPlanes() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    getPlanes()
      .then(setPlanes)
      .catch((err) => setError(err.response?.data?.error || "Error al cargar planes"))
      .finally(() => setLoading(false));
  }, []);

  const handleFavorito = async (id_plan) => {
    try {
      await addFavorito(id_plan);
      alert("Añadido a favoritos ✈️");
    } catch (err) {
      alert(err.response?.data?.error || "Error al añadir favorito");
    }
  };

  if (loading) return <p>Cargando planes...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

  return (
    <ul>
      {planes.map((plan) => (
        <li key={plan.id_plan}>
          <strong>{plan.nombre}</strong> — {plan.precio_total}€
          <span> ({plan.destino?.ciudad}, {plan.destino?.pais})</span>
          <button onClick={() => handleFavorito(plan.id_plan)}>♥ Favorito</button>
        </li>
      ))}
    </ul>
  );
}
