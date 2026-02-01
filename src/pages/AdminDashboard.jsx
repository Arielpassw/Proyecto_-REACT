import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { loggedAdmin, logoutAdmin } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!loggedAdmin) {
      navigate('/login');
    } else {
      // Cargar datos
      const savedOrders = [
        { id: 1, cliente: 'Juan Pérez', pedido: 'Hamburguesa + papas', total: 11.0, estado: 'Entregado' },
        { id: 2, cliente: 'Ana Godoy', pedido: 'Parrillada familiar', total: 32.5, estado: 'En proceso' },
        { id: 3, cliente: 'Carlos López', pedido: 'Lomo fino grill', total: 18.75, estado: 'En proceso' },
      ];
      setOrders(savedOrders);

      const savedReservations = JSON.parse(localStorage.getItem('reservasPapu')) || [];
      setReservations(savedReservations);

      const savedReviews = JSON.parse(localStorage.getItem('reseñasPapu')) || [];
      setReviews(savedReviews);
    }
  }, [loggedAdmin, navigate]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src="/images/Papu's.png" alt="Logo Papu's" />
          <h3>Administrador</h3>
        </div>

        <ul className="admin-menu">
          <li className={activeSection === 'dashboard' ? 'active' : ''}>
            <button onClick={() => setActiveSection('dashboard')}>
              <i className="fa-solid fa-chart-line"></i> Dashboard
            </button>
          </li>
          <li className={activeSection === 'pedidos' ? 'active' : ''}>
            <button onClick={() => setActiveSection('pedidos')}>
              <i className="fa-solid fa-burger"></i> Pedidos
            </button>
          </li>
          <li className={activeSection === 'reservas' ? 'active' : ''}>
            <button onClick={() => setActiveSection('reservas')}>
              <i className="fa-solid fa-calendar-check"></i> Reservas
            </button>
          </li>
          <li className={activeSection === 'resenas' ? 'active' : ''}>
            <button onClick={() => setActiveSection('resenas')}>
              <i className="fa-solid fa-star"></i> Reseñas
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
          <p>Bienvenido, {loggedAdmin?.nombre || 'Administrador'}</p>
        </header>

        {/* DASHBOARD */}
        {activeSection === 'dashboard' && (
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
                        <span className={`estado ${order.estado === 'Entregado' ? 'entregado' : 'proceso'}`}>
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
        {activeSection === 'pedidos' && (
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
                        <span className={`estado ${order.estado === 'Entregado' ? 'entregado' : 'proceso'}`}>
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
        {activeSection === 'reservas' && (
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
                      <span className="reserva-admin-date">{res.fecha} - {res.hora}</span>
                    </div>
                    <div className="reserva-admin-content">
                      <p><strong>Cliente:</strong> {res.nombre}</p>
                      <p><strong>Personas:</strong> {res.personas}</p>
                      <p><strong>Sucursal:</strong> {res.sucursal}</p>
                      {res.comentarios && <p><strong>Comentarios:</strong> {res.comentarios}</p>}
                    </div>
                    <button className="btn-accion">Confirmar</button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* RESEÑAS */}
        {activeSection === 'resenas' && (
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
                      <span className="resena-admin-stars">{'★'.repeat(review.calificacion)}{'☆'.repeat(5 - review.calificacion)}</span>
                    </div>
                    <p className="resena-admin-comment">{review.comentario}</p>
                    <span className="resena-admin-date">
                      {new Date(review.fecha).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
