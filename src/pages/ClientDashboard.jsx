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
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { loggedUser, logoutUser, updateUserProfile } = useAuth();

  const [activeSection, setActiveSection] = useState("inicio");
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const [newReservation, setNewReservation] = useState({
    fecha: "",
    hora: "",
    personas: 1,
  });

  const [message, setMessage] = useState(null);

  /* =====================
     CARGA INICIAL
  ====================== */
  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
      return;
    }

    setProfileName(loggedUser.nombre);
    setProfileEmail(loggedUser.email);

    loadOrders();
    loadReservations();
  }, [loggedUser]);

  /* =====================
     PEDIDOS (READ)
  ====================== */
  const loadOrders = async () => {
    const q = query(
      collection(db, "pedidos"),
      where("uid", "==", loggedUser.uid)
    );
    const snapshot = await getDocs(q);
    setOrders(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  /* =====================
     RESERVAS (CRUD)
  ====================== */
  const loadReservations = async () => {
    const q = query(
      collection(db, "reservas"),
      where("uid", "==", loggedUser.uid)
    );
    const snapshot = await getDocs(q);
    setReservations(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const handleAddReservation = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "reservas"), {
      ...newReservation,
      uid: loggedUser.uid,
      estado: "pendiente",
      createdAt: new Date(),
    });

    setMessage("Reserva creada correctamente");
    setNewReservation({ fecha: "", hora: "", personas: 1 });
    loadReservations();

    setTimeout(() => setMessage(null), 3000);
  };

  const handleUpdateReservation = async (id) => {
    await updateDoc(doc(db, "reservas", id), {
      fecha: editingReservation.fecha,
      hora: editingReservation.hora,
      personas: editingReservation.personas,
    });

    setEditingReservation(null);
    loadReservations();
  };

  const handleDeleteReservation = async (id) => {
    if (!window.confirm("¿Eliminar esta reserva?")) return;
    await deleteDoc(doc(db, "reservas", id));
    loadReservations();
  };

  /* =====================
     PERFIL
  ====================== */
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    await updateUserProfile(profileName, profileEmail);
    await updateDoc(doc(db, "users", loggedUser.uid), {
      nombre: profileName,
      email: profileEmail,
    });

    setEditingProfile(false);
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Papu's Grill</h2>

        {["inicio", "pedidos", "reservas", "perfil"].map((sec) => (
          <button
            key={sec}
            className={activeSection === sec ? "active" : ""}
            onClick={() => setActiveSection(sec)}
          >
            {sec.toUpperCase()}
          </button>
        ))}

        <button className="logout" onClick={() => {
          logoutUser();
          navigate("/");
        }}>
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="dashboard-main">
        {activeSection === "inicio" && (
          <>
            <h2>Bienvenido, {loggedUser?.nombre}</h2>
            <p>Pedidos: {orders.length}</p>
            <p>Reservas: {reservations.length}</p>
          </>
        )}

        {activeSection === "pedidos" && (
          <>
            <h2>Mis pedidos</h2>
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
                    <td>${o.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeSection === "reservas" && (
          <>
            <h2>Reservas</h2>

            {message && <div className="alert">{message}</div>}

            <form onSubmit={handleAddReservation} className="form">
              <input
                type="date"
                required
                value={newReservation.fecha}
                onChange={(e) =>
                  setNewReservation({ ...newReservation, fecha: e.target.value })
                }
              />
              <input
                type="time"
                required
                value={newReservation.hora}
                onChange={(e) =>
                  setNewReservation({ ...newReservation, hora: e.target.value })
                }
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
              />
              <button type="submit">Crear reserva</button>
            </form>

            <div className="cards">
              {reservations.map((r) => (
                <div className="card" key={r.id}>
                  {editingReservation?.id === r.id ? (
                    <>
                      <input
                        type="date"
                        value={editingReservation.fecha}
                        onChange={(e) =>
                          setEditingReservation({
                            ...editingReservation,
                            fecha: e.target.value,
                          })
                        }
                      />
                      <input
                        type="time"
                        value={editingReservation.hora}
                        onChange={(e) =>
                          setEditingReservation({
                            ...editingReservation,
                            hora: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        value={editingReservation.personas}
                        onChange={(e) =>
                          setEditingReservation({
                            ...editingReservation,
                            personas: Number(e.target.value),
                          })
                        }
                      />
                      <button onClick={() => handleUpdateReservation(r.id)}>
                        Guardar
                      </button>
                      <button onClick={() => setEditingReservation(null)}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{r.fecha}</p>
                      <p>{r.hora}</p>
                      <p>{r.personas} personas</p>
                      <button onClick={() => setEditingReservation(r)}>
                        Editar
                      </button>
                      <button onClick={() => handleDeleteReservation(r.id)}>
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === "perfil" && (
          <>
            {!editingProfile ? (
              <>
                <p>Nombre: {loggedUser.nombre}</p>
                <p>Email: {loggedUser.email}</p>
                <button onClick={() => setEditingProfile(true)}>
                  Editar perfil
                </button>
              </>
            ) : (
              <form onSubmit={handleUpdateProfile} className="form">
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
          </>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;

