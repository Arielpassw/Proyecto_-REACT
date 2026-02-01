import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Bloquea el scroll del cuerpo cuando el menú móvil está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/images/Papu's.png" alt="Papu's Logo" />
        </Link>
      </div>

      {/* Icono de hamburguesa que cambia a X */}
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </div>

      {/* Navegación */}
      <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={closeMenu}>
              Pedidos
            </Link>
          </li>
          <li>
            <Link to="/reviews" onClick={closeMenu}>
              Reseñas
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={closeMenu}>
              Registro
            </Link>
          </li>
        </ul>
      </nav>

      {/* Overlay opcional para cerrar al hacer clic fuera */}
      {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
