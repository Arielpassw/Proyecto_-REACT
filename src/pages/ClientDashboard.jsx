import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import '../styles/dashboard.css';

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
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const [newReservation, setNewReservation] = useState({
    fecha: "",
    hora: "",
    personas: 1,
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    } else {
      setProfileName(loggedUser.nombre);
      setProfileEmail(loggedUser.email);
      loadOrders();
      loadReservations();
    }
  }, [loggedUser]);

  // =================== READ ===================
  const loadOrders = async () => {
    const q = query(
      collection(db, "pedidos"),
      where("uid", "==", loggedUser.uid)
    );
    const snapshot = await getDocs(q);
    setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const loadReservations = async () => {
    const q = query(
      collection(db, "reservas"),
      where("uid", "==", loggedUser.uid)
    );
    const snapshot = await getDocs(q);
    setReservations(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  // =================== CREATE ===================
  const handleAddReservation = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "reservas"), {
      ...newReservation,
      uid: loggedUser.uid,
      estado: "pendiente",
      createdAt: new Date(),
    });

    setMessage("Reserva creada correctamente ✅");
    setNewReservation({ fecha: "", hora: "", personas: 1 });
    loadReservations();
    setTimeout(() => setMessage(null), 3000);
  };

  // =================== UPDATE ===================
  const handleUpdateReservation = async (id) => {
    await updateDoc(doc(db, "reservas", id), editingReservation);
    setEditingReservation(null);
    loadReservations();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateUserProfile(profileName, profileEmail);
    await updateDoc(doc(db, "users", loggedUser.uid), {
      nombre: profileName,
      email: profileEmail,
    });
    setEditingProfile(false);
  };

  // =================== DELETE ===================
  const handleDeleteReservation = async (id) => {
    if (window.confirm("¿Eliminar esta reserva?")) {
      await deleteDoc(doc(db, "reservas", id));
      loadReservations();
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <div className="row">
        {/* SIDEBAR */}
        <div className="col-md-3 col-lg-2 bg-black p-4">
          <h4 className="text-warning mb-4">🍔 Papu's Grill</h4>

          {["inicio", "pedidos", "reservas", "perfil"].map(sec => (
            <button
              key={sec}
              className={`btn w-100 mb-2 ${
                activeSection === sec ? "btn-warning" : "btn-outline-light"
              }`}
              onClick={() => setActiveSection(sec)}
            >
              {sec.toUpperCase()}
            </button>
          ))}

          <button
            className="btn btn-danger w-100 mt-4"
            onClick={() => {
              logoutUser();
              navigate("/");
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="col-md-9 col-lg-10 p-5">
          {activeSection === "inicio" && (
            <>
              <h2>Bienvenido, {loggedUser?.nombre} 👋</h2>
              <p className="text-secondary">
                Pedidos: {orders.length} | Reservas: {reservations.length}
              </p>
            </>
          )}

          {/* PEDIDOS */}
          {activeSection === "pedidos" && (
            <>
              <h3>Mis pedidos</h3>
              <table className="table table-dark table-hover mt-3">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Detalle</th>
                    <th>Estado</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td>{o.fecha}</td>
                      <td>{o.detalle}</td>
                      <td>
                        <span className="badge bg-info">{o.estado}</span>
                      </td>
                      <td>${o.total?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* RESERVAS CRUD */}
          {activeSection === "reservas" && (
            <>
              <h3>Reservas</h3>
              {message && <div className="alert alert-success">{message}</div>}

              <form
                className="row g-3 bg-black p-4 rounded"
                onSubmit={handleAddReservation}
              >
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={newReservation.fecha}
                    onChange={e =>
                      setNewReservation({ ...newReservation, fecha: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="time"
                    className="form-control"
                    required
                    value={newReservation.hora}
                    onChange={e =>
                      setNewReservation({ ...newReservation, hora: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    value={newReservation.personas}
                    onChange={e =>
                      setNewReservation({
                        ...newReservation,
                        personas: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-warning w-100">Reservar</button>
                </div>
              </form>

              <div className="row mt-4">
                {reservations.map(r => (
                  <div key={r.id} className="col-md-4">
                    <div className="card bg-secondary text-light mb-3">
                      <div className="card-body">
                        {editingReservation?.id === r.id ? (
                          <>
                            <input
                              className="form-control mb-2"
                              value={editingReservation.fecha}
                              onChange={e =>
                                setEditingReservation({
                                  ...editingReservation,
                                  fecha: e.target.value,
                                })
                              }
                            />
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleUpdateReservation(r.id)}
                            >
                              Guardar
                            </button>
                          </>
                        ) : (
                          <>
                            <h5>{r.fecha}</h5>
                            <p>
                              {r.hora} • {r.personas} personas
                            </p>
                            <span className="badge bg-warning">{r.estado}</span>
                            <div className="mt-2">
                              <button
                                className="btn btn-outline-light btn-sm me-2"
                                onClick={() =>
                                  setEditingReservation({ ...r, id: r.id })
                                }
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteReservation(r.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PERFIL */}
          {activeSection === "perfil" && (
            <>
              <h3>Perfil</h3>
              {!editingProfile ? (
                <>
                  <p>Nombre: {loggedUser.nombre}</p>
                  <p>Email: {loggedUser.email}</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => setEditingProfile(true)}
                  >
                    Editar
                  </button>
                </>
              ) : (
                <form className="bg-black p-4 rounded" onSubmit={handleUpdateProfile}>
                  <input
                    className="form-control mb-2"
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                  />
                  <input
                    className="form-control mb-2"
                    value={profileEmail}
                    onChange={e => setProfileEmail(e.target.value)}
                  />
                  <button className="btn btn-warning me-2">Guardar</button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingProfile(false)}
                  >
                    Cancelar
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

