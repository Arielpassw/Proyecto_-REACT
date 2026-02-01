import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/dashboard.css";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { loggedUser, logoutUser, updateUserProfile } = useAuth();

  const [activeSection, setActiveSection] = useState("inicio");
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const [newReservation, setNewReservation] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    personas: 1,
    sucursal: "Sucursal Principal",
    comentarios: "",
  });

  const [message, setMessage] = useState("");

  /* =====================
     VALIDAR AUTENTICACIÓN
  ====================== */
  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    } else {
      setProfileName(loggedUser.nombre);
      setProfileEmail(loggedUser.email);
      setNewReservation((prev) => ({
        ...prev,
        nombre: loggedUser.nombre,
      }));

      loadOrders();
      loadReservations();
    }
  }, [loggedUser, navigate]);

  /* =====================
     PEDIDOS (READ)
  ====================== */
  const loadOrders = async () => {
    try {
      const q = query(
        collection(db, "pedidos"),
        where("uid", "==", loggedUser.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    }
  };

  /* =====================
     RESERVAS (CREATE / READ)
  ====================== */
  const loadReservations = async () => {
    try {
      const q = query(
        collection(db, "reservas"),
        where("uid", "==", loggedUser.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReservations(data);
    } catch (error) {
      console.error("Error cargando reservas:", error);
    }
  };

  const handleAddReservation = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "reservas"), {
        ...newReservation,
        uid: loggedUser.uid,
        estado: "pendiente",
        createdAt: new Date(),
      });

      setMessage({
        type: "success",
        text: "Reserva creada correctamente",
      });

      loadReservations();

      setNewReservation({
        nombre: loggedUser.nombre,
        fecha: "",
        hora: "",
        personas: 1,
        sucursal: "Sucursal Principal",
        comentarios: "",
      });

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error al crear la reserva",
      });
    }
  };

  /* =====================
     PERFIL (UPDATE)
  ====================== */
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(profileName, profileEmail);

      await updateDoc(doc(db, "users", loggedUser.uid), {
        nombre: profileName,
        email: profileEmail,
      });

      setMessage({
        type: "success",
        text: "Perfil actualizado correctamente",
      });

      setEditingProfile(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error al actualizar perfil",
      });
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  /* =====================
     RENDER
  ====================== */
  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/images/Papu's.png" alt="Papu's Grill" />
          <span>Panel del cliente</span>
        </div>

        <nav>
          {["inicio", "pedidos", "reservas", "perfil"].map((sec) => (
            <button
              key={sec}
              className={activeSection === sec ? "active" : ""}
              onClick={() => setActiveSection(sec)}
            >
              {sec.toUpperCase()}
            </button>
          ))}
        </nav>

        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="dashboard-main">
        {/* INICIO */}
        {activeSection === "inicio" && (
          <section>
            <h2>Bienvenido, {loggedUser?.nombre}</h2>
            <p>Pedidos realizados: {orders.length}</p>
            <p>Reservas activas: {reservations.length}</p>
          </section>
        )}

        {/* PEDIDOS */}
        {activeSection === "pedidos" && (
          <section>
            <h2>Mis pedidos</h2>

            {orders.length === 0 ? (
              <p>No tienes pedidos registrados.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Detalle</th>
                    <th>Estado</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.fecha}</td>
                      <td>{o.detalle}</td>
                      <td>{o.estado}</td>
                      <td>${o.total?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {/* RESERVAS */}
        {activeSection === "reservas" && (
          <section>
            <h2>Mis reservas</h2>

            {message && (
              <div className={`alert ${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleAddReservation}>
              <input
                type="date"
                value={newReservation.fecha}
                onChange={(e) =>
                  setNewReservation({ ...newReservation, fecha: e.target.value })
                }
                required
              />
              <input
                type="time"
                value={newReservation.hora}
                onChange={(e) =>
                  setNewReservation({ ...newReservation, hora: e.target.value })
                }
                required
              />
              <input
                type="number"
                min="1"
                value={newReservation.personas}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    personas: Number(e.target.value),
                  })
                }
                required
              />
              <button type="submit">Crear reserva</button>
            </form>

            {reservations.map((r) => (
              <div key={r.id}>
                {r.fecha} - {r.hora} ({r.personas} personas)
              </div>
            ))}
          </section>
        )}

        {/* PERFIL */}
        {activeSection === "perfil" && (
          <section>
            {!editingProfile ? (
              <>
                <p>Nombre: {loggedUser.nombre}</p>
                <p>Email: {loggedUser.email}</p>
                <button onClick={() => setEditingProfile(true)}>
                  Editar perfil
                </button>
              </>
            ) : (
              <form onSubmit={handleUpdateProfile}>
                <input
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
                <input
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                />
                <button type="submit">Guardar</button>
                <button
                  type="button"
                  onClick={() => setEditingProfile(false)}
                >
                  Cancelar
                </button>
              </form>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;

