import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import '../styles/home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/images/papusfondo.jpg',
    '/images/promo.jpg',
    '/images/promo_cumple.jpg',
    '/images/promo_cumple2.jpg',
    '/images/lomo_fino2.jpg',
    '/images/Hamburguesa.jpg',
    '/images/Promociones.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-page">
      {/* CAROUSEL */}
      <div className="carousel-container">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={slide} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* INDICADORES */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>

        {/* CONTROLES */}
        <button
          className="carousel-control prev"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="carousel-control next"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <section className="welcome-section">
        <div className="container">
          <h1>Bienvenido a Papu's Grill</h1>
          <p>
            La mejor experiencia gastronómica con carnes a la parrilla de primera
            calidad. Sabor auténtico que te hará volver.
          </p>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <i className="fa-solid fa-fire"></i>
              <h3>Carnes a la Parrilla</h3>
              <p>Carnes premium asadas a la perfección en nuestro horno artesanal.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-truck"></i>
              <h3>Entrega Rápida</h3>
              <p>Pedidos entregados calientes a tu puerta en tiempo récord.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-smile"></i>
              <h3>Atención Excelente</h3>
              <p>Nuestro equipo está disponible para brindarte la mejor experiencia.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-star"></i>
              <h3>Garantía de Calidad</h3>
              <p>Utilizamos ingredientes frescos y de primera categoría.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
