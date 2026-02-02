import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import "../styles/dashboard.css";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState("inicio");
  const [reservas, setReservas] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    personas: "",
    estado: "En proceso",
  });

  const obtenerReservas = async () => {
    const snap = await getDocs(collection(db, "reservas"));
    setReservas(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioActivo = auth.currentUser;

    // Preparamos el objeto con los datos del form + datos del sistema
    const datosReserva = {
      ...form,
      nombre: usuarioActivo?.displayName || usuarioActivo?.email || "Cliente",
      sucursal: "Sucursal Principal", // Dato quemado que pediste
      clienteId: usuarioActivo?.uid,
    };

    try {
      if (editId) {
        await updateDoc(doc(db, "reservas", editId), datosReserva);
        setEditId(null);
      } else {
        await addDoc(collection(db, "reservas"), datosReserva);
      }

      // Limpiamos el formulario con los valores base
      setForm({ fecha: "", hora: "", personas: "", estado: "En proceso" });
      obtenerReservas();
      alert("¡Reserva procesada!");
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleEdit = (r) => {
    setEditId(r.id);
    setForm({
      fecha: r.fecha,
      hora: r.hora,
      personas: r.personas,
      estado: r.estado,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta reserva?")) {
      await deleteDoc(doc(db, "reservas", id));
      obtenerReservas();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <h2>Papu's</h2>
            <p className="sidebar-subtitle">Panel Cliente</p>
          </div>
          <div className="sidebar-nav">
            <button
              className={`nav-link ${seccion === "inicio" ? "active" : ""}`}
              onClick={() => setSeccion("inicio")}
            >
              Inicio
            </button>
            <button
              className={`nav-link ${seccion === "reservas" ? "active" : ""}`}
              onClick={() => setSeccion("reservas")}
            >
              Reservas
            </button>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <h1>Dashboard</h1>
          <div className="user-chip">
            <i className="bx bx-user"></i>
            <div className="user-chip-textos">
              <span className="user-name">
                {auth.currentUser?.email.split("@")[0]}
              </span>
              <span className="user-role">Cliente</span>
            </div>
          </div>
        </header>

        <section className="dashboard-content">
          <div className={`seccion ${seccion === "inicio" ? "activa" : ""}`}>
            <div className="panel bienvenida-panel">
              <div className="bienvenida-texto">
                <h2>
                  Bienvenido a <span>Papu's</span>
                </h2>
                <p>Gestiona tus reservas de forma fácil.</p>
              </div>
            </div>
          </div>

          <div className={`seccion ${seccion === "reservas" ? "activa" : ""}`}>
            <div className="panel">
              <h3>{editId ? "Editar reserva" : "Nueva reserva"}</h3>
              <form className="formulario-reserva" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha</label>
                    <input
                      type="date"
                      value={form.fecha}
                      onChange={(e) =>
                        setForm({ ...form, fecha: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Hora</label>
                    <input
                      type="time"
                      value={form.hora}
                      onChange={(e) =>
                        setForm({ ...form, hora: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Personas</label>
                    <input
                      type="number"
                      min="1"
                      value={form.personas}
                      onChange={(e) =>
                        setForm({ ...form, personas: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <select
                      value={form.estado}
                      onChange={(e) =>
                        setForm({ ...form, estado: e.target.value })
                      }
                    >
                      <option>En proceso</option>
                      <option>Entregado</option>
                    </select>
                  </div>
                </div>
                <button className="btn-submit">
                  {editId ? "Actualizar" : "Guardar"}
                </button>
              </form>

              <div className="table-responsive">
                <table className="tabla-dashboard">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Personas</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map((r) => (
                      <tr key={r.id}>
                        <td>{r.fecha}</td>
                        <td>{r.hora}</td>
                        <td>{r.personas}</td>
                        <td>
                          <span
                            className={`badge-estado ${r.estado === "Entregado" ? "badge-entregado" : "badge-en-proceso"}`}
                          >
                            {r.estado}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(r)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-cancel"
                            onClick={() => handleDelete(r.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientDashboard;
