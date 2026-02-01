import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const Recover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (!savedUser) {
      setMessage({ type: 'error', text: 'No hay ninguna cuenta registrada.' });
      return;
    }

    if (email !== savedUser.email) {
      setMessage({ type: 'error', text: 'Ese correo no pertenece a ninguna cuenta.' });
      return;
    }

    // Simulación académica
    localStorage.setItem(
      'resetRequest',
      JSON.stringify({
        email: email,
        fecha: new Date().toISOString(),
      })
    );

    setMessage({ type: 'success', text: 'Enlace de recuperación enviado (simulado). Redirigiendo...' });
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <img src="/images/Papu's.png" alt="Papu's Grill" className="auth-logo" />
            <h2>Recuperar Contraseña</h2>
            <p>Ingresa tu correo para recibir un enlace de recuperación</p>
          </div>

          {message && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Correo electrónico</label>
              <div className="input-group">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">
              <i className="fa-solid fa-paper-plane"></i> Enviar Enlace
            </button>
          </form>

          <div className="auth-footer">
            <p>
              <Link to="/login">Volver al login</Link>
            </p>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Papu's Grill. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Recover;
