import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <input
        type="checkbox"
        id="menu-toggle"
        checked={menuOpen}
        onChange={toggleMenu}
        style={{ display: 'none' }}
      />
      <label htmlFor="menu-toggle" className="menu-icon" onClick={toggleMenu}>
        <i className="fa-solid fa-bars"></i>
      </label>

      <div className="header-left">
        <div className="logo">
          <Link to="/">
            <img src="/images/Papu's.png" alt="Papu's Logo" width="180" height="80" />
          </Link>
        </div>
      </div>

      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>Nosotros</Link>
          </li>
          <li>
            <Link to="/menu" onClick={() => setMenuOpen(false)}>Pedidos</Link>
          </li>
          <li>
            <Link to="/reviews" onClick={() => setMenuOpen(false)}>Reseñas</Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Registro</Link>
          </li>
        </ul>
      </nav>

      <div className="boton_regresar">
        <Link to="/">
          <i className="fa-solid fa-house"></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
