import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        {/* SECCIÓN IZQUIERDA */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">
            <img src="/images/Papu's.png" alt="Papu's Grill" />
          </div>
          <p className="footer-description">
            Sabor auténtico, carnes a la parrilla y la mejor experiencia gastronómica.
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/papusgrill/" aria-label="Facebook">
              <img src="/images/facebook.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/papus_grill/" aria-label="Instagram">
              <img src="/images/instagram.png" alt="Instagram" />
            </a>
            <a
              href="https://www.tiktok.com/@papus.grill"
              aria-label="TikTok"
              className="tiktok-icon"
            >
              <img src="/images/tiktok.png" alt="TikTok" />
            </a>

          </div>
        </div>

        {/* SECCIÓN ENLACES RÁPIDOS */}
        <div className="footer-section footer-links">
          <h3>Enlaces rápidos</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/about">Nosotros</a></li>
            <li><a href="/menu">Pedidos</a></li>
            <li><a href="https://maps.app.goo.gl/hRPdHMHn9MUfHH6e9">Ubicación</a></li>
          </ul>
        </div>

        {/* SECCIÓN CONTACTO */}
        <div className="footer-section footer-contact">
          <h3>Contáctanos</h3>
          <div className="contact-item">
            <i className="fa-solid fa-phone"></i>
            <p>+593 99 513 9207</p>
          </div>
          <div className="contact-item">
            <i className="fa-solid fa-clock"></i>
            <p>
              Lunes - Viernes: 7:00 am -  8pm<br />
              Sábados: 7:00 am - 10:00 pm
            </p>
          </div>
        </div>
      </div>

      {/* LÍNEA DIVISORIA  */}
      <div className="footer-bottom">
        <p>&copy; 2025 Papu's Grill. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
