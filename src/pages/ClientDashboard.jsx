import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/dashboard.css';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { loggedUser, logoutUser, updateUserProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('inicio');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(loggedUser?.nombre || '');
  const [profileEmail, setProfileEmail] = useState(loggedUser?.email || '');
  const [newReservation, setNewReservation] = useState({
    nombre: loggedUser?.nombre || '',
    fecha: '',
    hora: '',
    personas: 1,
    sucursal: 'Sucursal Principal',
    comentarios: '',
  });
  const [message, setMessage] = useState('');

  // Validar autenticación
  useEffect(() => {
    if (!loggedUser) {
      navigate('/login');
    } else {
      // Cargar datos
      const savedOrders = [
        {
          id: 1,
          fecha: '2024-10-20',
          detalle: 'Parrillada familiar + 2 bebidas',
          estado: 'Entregado',
          total: 32.5,
        },
        {
          id: 2,
          fecha: '2024-11-02',
          detalle: 'Hamburguesa Papu\'s + papas',
          estado: 'Entregado',
          total: 11.0,
        },
        {
          id: 3,
          fecha: '2024-11-15',
          detalle: 'Lomo fino grill + bebida',
          estado: 'En proceso',
          total: 18.75,
        },
      ];
      setOrders(savedOrders);

      const savedReservations = JSON.parse(localStorage.getItem('reservasPapu')) || [];
      setReservations(savedReservations);
    }
  }, [loggedUser, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!profileName.trim() || !profileEmail.trim()) {
      setMessage({ type: 'error', text: 'Los campos no pueden estar vacíos.' });
      return;
    }

    updateUserProfile(profileName, profileEmail);
    setMessage({ type: 'success', text: 'Datos actualizados correctamente.' });
    setEditingProfile(false);

    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddReservation = (e) => {
    e.preventDefault();

    if (!newReservation.nombre || !newReservation.fecha || !newReservation.hora || newReservation.personas <= 0) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos obligatorios.' });
      return;
    }

    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
    localStorage.setItem('reservasPapu', JSON.stringify(updatedReservations));

    setMessage({ type: 'success', text: `¡Reserva registrada para el ${newReservation.fecha} a las ${newReservation.hora}!` });
    setNewReservation({
      nombre: loggedUser?.nombre || '',
      fecha: '',
      hora: '',
      personas: 1,
      sucursal: 'Sucursal Principal',
      comentarios: '',
    });

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/images/Papu's.png" alt="Papu's Grill" className="logo-sidebar" />
          <span className="sidebar-subtitle">Panel del cliente</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}
            onClick={() => setActiveSection('inicio')}
          >
            <i className="fa-solid fa-house"></i>
            <span>Inicio</span>
          </button>

          <button
            className={`nav-link ${activeSection === 'pedidos' ? 'active' : ''}`}
            onClick={() => setActiveSection('pedidos')}
          >
            <i className="fa-solid fa-burger"></i>
            <span>Mis pedidos</span>
          </button>

          <button
            className={`nav-link ${activeSection === 'reservas' ? 'active' : ''}`}
            onClick={() => setActiveSection('reservas')}
          >
            <i className="fa-solid fa-calendar-check"></i>
            <span>Mis reservas</span>
          </button>

          <button
            className={`nav-link ${activeSection === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveSection('perfil')}
          >
            <i className="fa-solid fa-user"></i>
            <span>Mi perfil</span>
          </button>
        </nav>

        <button className="btn-logout" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Cerrar sesión</span>
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="dashboard-main">
        {/* BARRA SUPERIOR */}
        <header className="topbar">
          <h1 id="tituloSeccion">
            {activeSection === 'inicio' ? 'Inicio' : 
             activeSection === 'pedidos' ? 'Mis pedidos' :
             activeSection === 'reservas' ? 'Mis reservas' :
             'Mi perfil'}
          </h1>

          <div className="user-chip">
            <i className="fa-solid fa-user"></i>
            <div className="user-chip-textos">
              <span className="user-name">{loggedUser?.nombre || 'Cliente'}</span>
              <span className="user-role">Cliente</span>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <main className="dashboard-content">
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <section className="seccion activa">
              <div className="panel bienvenida-panel">
                <div className="bienvenida-texto">
                  <h2>Bienvenido a tu panel, <span>{loggedUser?.nombre || 'Cliente'}</span></h2>
                  <p>
                    Desde aquí puedes revisar tus pedidos, ver tus reservas y actualizar tus datos
                    personales de forma rápida y sencilla.
                  </p>
                  <p className="texto-destacado">
                    Gracias por elegir <strong>Papu's Grill</strong>. ¡Nos encanta verte de vuelta!
                  </p>
                </div>
                <div className="bienvenida-imagen">
                  <img src="/images/papusfondo.jpg" alt="Papu's Grill" onError={(e) => { e.target.src = '/images/default.jpg'; }} />
                </div>
              </div>

              <div className="stats-grid">
                <article className="stat-card">
                  <div className="stat-icon icon-pedidos">
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <h3>Pedidos Realizados</h3>
                  <p className="stat-number">{orders.length}</p>
                </article>

                <article className="stat-card">
                  <div className="stat-icon icon-reservas">
                    <i className="fa-solid fa-calendar-check"></i>
                  </div>
                  <h3>Reservas Activas</h3>
                  <p className="stat-number">{reservations.length}</p>
                </article>
              </div>
            </section>
          )}

          {/* SECCIÓN PEDIDOS */}
          {activeSection === 'pedidos' && (
            <section className="seccion activa">
              <div className="panel">
                <h3>Mis Pedidos</h3>
                {orders.length === 0 ? (
                  <p>No tienes pedidos registrados.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="tabla-dashboard">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Fecha</th>
                          <th>Detalle</th>
                          <th>Estado</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.fecha}</td>
                            <td>{order.detalle}</td>
                            <td>
                              <span className={`badge-estado ${order.estado === 'Entregado' ? 'badge-entregado' : 'badge-en-proceso'}`}>
                                {order.estado}
                              </span>
                            </td>
                            <td>${order.total.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* SECCIÓN RESERVAS */}
          {activeSection === 'reservas' && (
            <section className="seccion activa">
              <div className="panel">
                <h3>Mis Reservas</h3>

                {message && (
                  <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleAddReservation} className="formulario-reserva">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        value={newReservation.nombre}
                        onChange={(e) =>
                          setNewReservation({ ...newReservation, nombre: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Fecha</label>
                      <input
                        type="date"
                        value={newReservation.fecha}
                        onChange={(e) =>
                          setNewReservation({ ...newReservation, fecha: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Hora</label>
                      <input
                        type="time"
                        value={newReservation.hora}
                        onChange={(e) =>
                          setNewReservation({ ...newReservation, hora: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Número de personas</label>
                      <input
                        type="number"
                        min="1"
                        value={newReservation.personas}
                        onChange={(e) =>
                          setNewReservation({ ...newReservation, personas: parseInt(e.target.value) })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Sucursal</label>
                    <select
                      value={newReservation.sucursal}
                      onChange={(e) =>
                        setNewReservation({ ...newReservation, sucursal: e.target.value })
                      }
                    >
                      <option>Sucursal Principal</option>
                      <option>Sucursal Norte</option>
                      <option>Sucursal Sur</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Comentarios</label>
                    <textarea
                      value={newReservation.comentarios}
                      onChange={(e) =>
                        setNewReservation({ ...newReservation, comentarios: e.target.value })
                      }
                      placeholder="Comentarios especiales..."
                      rows="4"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-submit">
                    <i className="fa-solid fa-calendar-plus"></i> Crear Reserva
                  </button>
                </form>

                <h3 style={{ marginTop: '40px' }}>Reservas Registradas</h3>
                {reservations.length === 0 ? (
                  <p>Aún no tienes reservas registradas.</p>
                ) : (
                  <div className="reservas-list">
                    {reservations.map((res, index) => (
                      <div key={index} className="reserva-card">
                        <div className="reserva-header">
                          <span className="reserva-title">Reserva #{index + 1}</span>
                          <span className="reserva-datetime">{res.fecha} • {res.hora}</span>
                        </div>
                        <div className="reserva-content">
                          <p><strong>Nombre:</strong> {res.nombre}</p>
                          <p><strong>Personas:</strong> {res.personas} • <strong>Sucursal:</strong> {res.sucursal}</p>
                          {res.comentarios && <p><strong>Comentario:</strong> {res.comentarios}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* SECCIÓN PERFIL */}
          {activeSection === 'perfil' && (
            <section className="seccion activa">
              <div className="panel perfil-panel">
                <div className="perfil-info">
                  <h3>Información Básica</h3>
                  <p><strong>Nombre:</strong> <span id="perfilNombre">{loggedUser?.nombre}</span></p>
                  <p><strong>Correo:</strong> <span id="perfilCorreo">{loggedUser?.email}</span></p>
                </div>

                {!editingProfile ? (
                  <button
                    className="btn-edit"
                    onClick={() => setEditingProfile(true)}
                  >
                    <i className="fa-solid fa-edit"></i> Editar Perfil
                  </button>
                ) : (
                  <form onSubmit={handleUpdateProfile} className="formulario-perfil">
                    {message && (
                      <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        {message.text}
                      </div>
                    )}

                    <div className="form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Correo</label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="button-group">
                      <button type="submit" className="btn-save">
                        <i className="fa-solid fa-check"></i> Guardar
                      </button>
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => {
                          setEditingProfile(false);
                          setProfileName(loggedUser?.nombre);
                          setProfileEmail(loggedUser?.email);
                        }}
                      >
                        <i className="fa-solid fa-times"></i> Cancelar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
