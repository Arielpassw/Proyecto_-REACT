import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/admin.css";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { loggedUser, logoutUser } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [productoEditando, setProductoEditando] = useState(null);
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "sopas",
    imagen: "",
  });

  // ---------------- FUNCIONES DE CARGA ----------------
  const loadProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  const loadReservas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reservas"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(data);
    } catch (error) {
      console.error("Error cargando reservas:", error);
    }
  };

  // ---------------- FUNCIONES DE PRODUCTOS ----------------
  const handleCreateProducto = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "productos"), {
        ...nuevoProducto,
        precio: Number(nuevoProducto.precio),
        disponible: true,
      });

      setNuevoProducto({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "sopas",
        imagen: "",
      });

      loadProductos();
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const handleDeleteProducto = async (id) => {
    const confirmacion = window.confirm("¿Eliminar este producto?");
    if (!confirmacion) return;

    try {
      await deleteDoc(doc(db, "productos", id));
      loadProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // ---------------- USEEFFECT PRINCIPAL ----------------
  useEffect(() => {
    if (!loggedUser || loggedUser.email !== "admin@papus.com") {
      navigate("/login");
    } else {
      // Cargar pedidos simulados
      const savedOrders = [
        {
          id: 1,
          cliente: "Juan Pérez",
          pedido: "Hamburguesa + papas",
          total: 11.0,
          estado: "Entregado",
        },
        {
          id: 2,
          cliente: "Ana Godoy",
          pedido: "Parrillada familiar",
          total: 32.5,
          estado: "En proceso",
        },
        {
          id: 3,
          cliente: "Carlos López",
          pedido: "Lomo fino grill",
          total: 18.75,
          estado: "En proceso",
        },
      ];
      setOrders(savedOrders);

      // Cargar productos y reservas
      loadProductos();
      loadReservas();

      // Cargar reseñas desde localStorage
      const savedReviews =
        JSON.parse(localStorage.getItem("reseñasPapu")) || [];
      setReviews(savedReviews);
    }
  }, [loggedUser, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  // ---------------- RENDER ----------------
  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src="/images/Papu's.png" alt="Logo Papu's" />
          <h3>Administrador</h3>
        </div>

        <ul className="admin-menu">
          <li className={activeSection === "dashboard" ? "active" : ""}>
            <button onClick={() => setActiveSection("dashboard")}>
              <i className="fa-solid fa-chart-line"></i> Dashboard
            </button>
          </li>
          <li className={activeSection === "pedidos" ? "active" : ""}>
            <button onClick={() => setActiveSection("pedidos")}>
              <i className="fa-solid fa-burger"></i> Pedidos
            </button>
          </li>
          <li className={activeSection === "reservas" ? "active" : ""}>
            <button onClick={() => setActiveSection("reservas")}>
              <i className="fa-solid fa-calendar-check"></i> Reservas
            </button>
          </li>
          <li className={activeSection === "resenas" ? "active" : ""}>
            <button onClick={() => setActiveSection("resenas")}>
              <i className="fa-solid fa-star"></i> Reseñas
            </button>
          </li>
          <li className={activeSection === "productos" ? "active" : ""}>
            <button onClick={() => setActiveSection("productos")}>
              <i className="fa-solid fa-box"></i> Productos
            </button>
          </li>
        </ul>

        <button className="admin-logout" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="admin-contenido">
        <header className="admin-header">
          <h1>Panel de Administración</h1>
          <p>Bienvenido, {loggedUser?.email || "Administrador"}</p>
        </header>

        {/* DASHBOARD */}
        {activeSection === "dashboard" && (
          <section className="admin-section">
            <div className="cards-grid">
              <div className="card">
                <i className="fa-solid fa-burger"></i>
                <h3>Pedidos Hoy</h3>
                <p className="card-number">{orders.length}</p>
              </div>

              <div className="card">
                <i className="fa-solid fa-calendar-check"></i>
                <h3>Reservas Hoy</h3>
                <p className="card-number">{reservations.length}</p>
              </div>

              <div className="card">
                <i className="fa-solid fa-users"></i>
                <h3>Clientes Activos</h3>
                <p className="card-number">5</p>
              </div>

              <div className="card">
                <i className="fa-solid fa-star"></i>
                <h3>Nuevas Reseñas</h3>
                <p className="card-number">{reviews.length}</p>
              </div>
            </div>

            <div className="tabla-section">
              <h2>Últimos Pedidos</h2>
              <table className="tabla-admin">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Pedido</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.cliente}</td>
                      <td>{order.pedido}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span
                          className={`estado ${order.estado === "Entregado" ? "entregado" : "proceso"}`}
                        >
                          {order.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* PEDIDOS */}
        {activeSection === "pedidos" && (
          <section className="admin-section">
            <h2>Gestión de Pedidos</h2>
            <div className="tabla-section">
              <table className="tabla-admin">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Pedido</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.cliente}</td>
                      <td>{order.pedido}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span
                          className={`estado ${order.estado === "Entregado" ? "entregado" : "proceso"}`}
                        >
                          {order.estado}
                        </span>
                      </td>
                      <td>
                        <button className="btn-accion">Editar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* RESERVAS */}
        {activeSection === "reservas" && (
          <section className="admin-section">
            <h2>Gestión de Reservas</h2>
            {reservations.length === 0 ? (
              <p>No hay reservas registradas.</p>
            ) : (
              <div className="reservas-admin">
                {reservations.map((res, index) => (
                  <div key={index} className="reserva-admin-card">
                    <div className="reserva-admin-header">
                      <h3>Reserva #{index + 1}</h3>
                      <span className="reserva-admin-date">
                        {res.fecha} - {res.hora}
                      </span>
                    </div>
                    <div className="reserva-admin-content">
                      <p>
                        <strong>Cliente:</strong> {res.nombre}
                      </p>
                      <p>
                        <strong>Personas:</strong> {res.personas}
                      </p>
                      <p>
                        <strong>Sucursal:</strong> {res.sucursal}
                      </p>
                      {res.comentarios && (
                        <p>
                          <strong>Comentarios:</strong> {res.comentarios}
                        </p>
                      )}
                    </div>
                    <button className="btn-accion">Confirmar</button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* RESEÑAS */}
        {activeSection === "resenas" && (
          <section className="admin-section">
            <h2>Reseñas de Clientes</h2>
            {reviews.length === 0 ? (
              <p>No hay reseñas registradas.</p>
            ) : (
              <div className="resenas-admin">
                {reviews.map((review, index) => (
                  <div key={index} className="resena-admin-card">
                    <div className="resena-admin-header">
                      <h4>{review.nombre}</h4>
                      <span className="resena-admin-stars">
                        {"★".repeat(review.calificacion)}
                        {"☆".repeat(5 - review.calificacion)}
                      </span>
                    </div>
                    <p className="resena-admin-comment">{review.comentario}</p>
                    <span className="resena-admin-date">
                      {new Date(review.fecha).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* PRODUCTOS */}
        {activeSection === "productos" && (
          <section className="admin-section">
            <h2>Gestión de Productos</h2>

            <form onSubmit={handleCreateProducto} className="form-admin">
              <input
                placeholder="Nombre"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                required
              />
              <input
                placeholder="Descripción"
                value={nuevoProducto.descripcion}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    descripcion: e.target.value,
                  })
                }
                required
              />
              <input
                type="number"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                }
                required
              />
              <select
                value={nuevoProducto.categoria}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    categoria: e.target.value,
                  })
                }
              >
                <option value="sopas">Sopas</option>
                <option value="fuertes">Platos Fuertes</option>
                <option value="parrilla">Parrilla</option>
                <option value="rapida">Comida Rápida</option>
              </select>

              <input
                placeholder="URL Imagen"
                value={nuevoProducto.imagen}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })
                }
              />
              <div className="producto-admin-actions">
                <button type="submit">Agregar producto</button>
              </div>
            </form>

            <h3 className="admin-subtitle">Productos registrados</h3>

            <div className="productos-admin-grid">
              {productos.map((p) => (
                <div key={p.id} className="producto-admin-card">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    onError={(e) => (e.target.src = "/images/default.jpg")}
                  />

                  <div className="producto-admin-info">
                    <h4>{p.nombre}</h4>
                    <p className="producto-admin-desc">{p.descripcion}</p>
                    <span className="producto-admin-precio">${p.precio}</span>
                    <span className="producto-admin-cat">{p.categoria}</span>
                  </div>

                  <div className="producto-admin-actions">
                    <button onClick={() => setProductoEditando(p)}>
                      Editar
                    </button>
                    <button
                      className="danger"
                      onClick={() => handleDeleteProducto(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDITAR PRODUCTO */}
        {productoEditando && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              await updateDoc(doc(db, "productos", productoEditando.id), {
                nombre: productoEditando.nombre,
                descripcion: productoEditando.descripcion,
                precio: Number(productoEditando.precio),
                categoria: productoEditando.categoria,
                imagen: productoEditando.imagen,
              });

              setProductoEditando(null);
              loadProductos();
            }}
            className="form-admin"
          >
            <h3>Editar producto</h3>

            {productoEditando.imagen && (
              <div className="preview-imagen">
                <img
                  src={productoEditando.imagen}
                  alt={productoEditando.nombre}
                />
              </div>
            )}

            <input
              placeholder="Nombre"
              value={productoEditando.nombre}
              onChange={(e) =>
                setProductoEditando({
                  ...productoEditando,
                  nombre: e.target.value,
                })
              }
            />

            <input
              placeholder="Descripción"
              value={productoEditando.descripcion}
              onChange={(e) =>
                setProductoEditando({
                  ...productoEditando,
                  descripcion: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Precio"
              value={productoEditando.precio}
              onChange={(e) =>
                setProductoEditando({
                  ...productoEditando,
                  precio: e.target.value,
                })
              }
            />

            <select
              value={productoEditando.categoria}
              onChange={(e) =>
                setProductoEditando({
                  ...productoEditando,
                  categoria: e.target.value,
                })
              }
            >
              <option value="sopas">Sopas</option>
              <option value="fuertes">Platos Fuertes</option>
              <option value="parrilla">Parrilla</option>
              <option value="rapida">Comida Rápida</option>
            </select>

            <input
              placeholder="URL de la imagen"
              value={productoEditando.imagen}
              onChange={(e) =>
                setProductoEditando({
                  ...productoEditando,
                  imagen: e.target.value,
                })
              }
            />

            <div className="form-admin-actions">
              <button type="submit">Guardar cambios</button>
              <button type="button" onClick={() => setProductoEditando(null)}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
