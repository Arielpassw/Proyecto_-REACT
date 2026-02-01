import React from 'react';
import Footer from '../components/Footer';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-page">
      {/* HEADER */}
      <div className="about-header">
        <h1>Sobre Nosotros</h1>
        <p>Conoce la historia de Papu's Grill</p>
      </div>

      <div className="container">
        {/* SECCIÓN PRINCIPAL */}
        <section className="about-section">
          <div className="about-content">
            <h2>¿Quiénes Somos?</h2>
            <p>
              En <strong>Papu's Grill</strong>, nos apasiona ofrecer la mejor experiencia gastronómica
              con carnes premium a la parrilla. Desde nuestra fundación, nos hemos comprometido con la
              calidad, el servicio excepcional y la satisfacción de nuestros clientes.
            </p>
            <p>
              Cada plato es preparado con ingredientes frescos y de primera categoría, asados a la
              perfección en nuestros hornos artesanales. Nuestro equipo está dedicado a hacer de cada
              visita una experiencia inolvidable.
            </p>
          </div>

          <div className="about-image">
            <img src="/images/nosotros.jpg" alt="Papu's Grill" onError={(e) => { e.target.src = '/images/default.jpg'; }} />
          </div>
        </section>

        {/* VALORES */}
        <section className="values-section">
          <h2>Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <i className="fa-solid fa-heart"></i>
              <h3>Pasión</h3>
              <p>Cocinamos con pasión y dedicación en cada plato que servimos.</p>
            </div>

            <div className="value-card">
              <i className="fa-solid fa-check-circle"></i>
              <h3>Calidad</h3>
              <p>Solo utilizamos ingredientes premium y técnicas tradicionales.</p>
            </div>

            <div className="value-card">
              <i className="fa-solid fa-handshake"></i>
              <h3>Compromiso</h3>
              <p>Nos comprometemos a ofrecerte lo mejor en cada servicio.</p>
            </div>

            <div className="value-card">
              <i className="fa-solid fa-smile"></i>
              <h3>Atención</h3>
              <p>Tu satisfacción es nuestra prioridad número uno.</p>
            </div>
          </div>
        </section>

        {/* EQUIPO */}
        <section className="team-section">
          <h2>Nuestro Equipo</h2>
          <p className="team-intro">
            Somos un equipo dedicado de profesionales apasionados por la gastronomía.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-icon">
                <img src="/images/Chef.avif" alt="Chef Papu" />
              </div>
              <h3>Chef Papu</h3>
              <p>Chef Ejecutivo</p>
            </div>

            <div className="team-member">
              <div className="member-icon">
                <img src="/images/Gerente de Operaciones.jpg" alt="María García" />
              </div>
              <h3>María García</h3>
              <p>Gerente de Operaciones</p>
            </div>

            <div className="team-member">
              <div className="member-icon">
                <img src="/images/Chef Grill Maestro.avif" alt="Carlos López" />
              </div>
              <h3>Carlos López</h3>
              <p>Chef Grill Maestro</p>
            </div>

            <div className="team-member">
              <div className="member-icon">
                <img src="/images/Jefa de Atención al Cliente.jpg" alt="Ana Torres" />
              </div>
              <h3>Ana Torres</h3>
              <p>Jefa de Atención al Cliente</p>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section className="contact-section">
          <h2>Contacto</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <i className="fa-solid fa-map-marker-alt"></i>
              <h3>Ubicación</h3>
              <p> Jerónimo Carrión <br />Quito, Ecuador</p>
            </div>
      
            <div className="contact-card">
              <i className="fa-solid fa-phone"></i>
              <h3>Teléfono</h3>
              <p>+593 2 1234567<br />+593 99 1234567</p>
            </div>

            <div className="contact-card">
              <i className="fa-solid fa-envelope"></i>
              <h3>Email</h3>
              <p>info@papusgrill.com<br />reservas@papusgrill.com</p>
            </div>

            <div className="contact-card">
              <i className="fa-solid fa-clock"></i>
              <h3>Horarios</h3>
              <p>Lunes a Viernes: 7am - 8pm<br />Sábados: 7am - 10pm</p>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default About;
