import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loginAdmin, registerUser } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (email === 'admin@papus.com') {
        await loginAdmin(email, password); // ✅ await
        setSuccess('¡Bienvenido Admin!');
        setTimeout(() => navigate('/admin'), 1500);
      } else {
        await loginUser(email, password); // ✅ await
        setSuccess('¡Bienvenido!');
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    }
  };

  // ================= REGISTRO =================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await registerUser(email, password); // 🔥 Firebase Auth
      setSuccess('¡Cuenta creada correctamente! Ahora inicia sesión.');

      setTimeout(() => {
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setFullname('');
        setConfirmPassword('');
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <button 
        onClick={() => navigate('/')} 
        className="btn-home-nav"
        title="Volver a inicio"
      >
        <i className="fa-solid fa-arrow-left"></i> Volver
      </button>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <img src="/images/Papu's.png" alt="Papu's Grill" className="auth-logo" />
            <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
            <p>{isLogin ? 'Inicia sesión para continuar' : 'Regístrate para disfrutar'}</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label>Nombre completo</label>
                <div className="input-group">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Correo electrónico</label>
              <div className="input-group">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-group">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirmar contraseña</label>
                <div className="input-group">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn-submit">
              <i className={`fa-solid ${isLogin ? 'fa-right-to-bracket' : 'fa-user-plus'}`}></i>
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setFullname('');
                  setConfirmPassword('');
                  setError('');
                  setSuccess('');
                }}
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
            {isLogin && (
              <p>
                <Link to="/recover">¿Olvidaste tu contraseña?</Link>
              </p>
            )}
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Papu's Grill. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Login;
