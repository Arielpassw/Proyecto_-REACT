import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import '../styles/reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar reseñas al montar
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reseñasPapu')) || [];
    setReviews(savedReviews);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones
    if (name.trim() === '') {
      setError('Por favor ingresa tu nombre.');
      return;
    }

    if (comment.trim().length < 5) {
      setError('El comentario debe tener al menos 5 caracteres.');
      return;
    }

    // Crear nueva reseña
    const newReview = {
      nombre: name,
      comentario: comment,
      calificacion: parseInt(rating),
      fecha: new Date().toISOString(),
    };

    // Agregar a lista y guardar
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('reseñasPapu', JSON.stringify(updatedReviews));

    setSuccess('¡Gracias por tu reseña!');
    setName('');
    setComment('');
    setRating(5);

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => setSuccess(''), 3000);
  };

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="reviews-page">
      {/* HEADER */}
      <div className="reviews-header">
        <h1>Opiniones de Nuestros Clientes</h1>
        <p>Nos encanta saber qué piensan de nosotros</p>
      </div>

      <div className="container">
        {/* RESEÑAS MOSTRADAS */}
        <section className="reviews-section">
          <h2>Últimas reseñas</h2>

          {reviews.length === 0 ? (
            <div className="no-reviews">
              <p>Aún no hay reseñas. ¡Sé el primero en dejar una!</p>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <h4>{review.nombre}</h4>
                    <span className="review-rating">{renderStars(review.calificacion)}</span>
                  </div>
                  <p className="review-comment">{review.comentario}</p>
                  <span className="review-date">
                    {new Date(review.fecha).toLocaleDateString('es-ES')}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* RESEÑAS DE EJEMPLO */}
          <div className="featured-reviews">
            <h3>Reseñas destacadas</h3>
            <div className="reviews-grid">
              <div className="review-card featured">
                <div className="review-header">
                  <h4>María López</h4>
                  <span className="review-rating">★★★★★</span>
                </div>
                <p className="review-comment">
                  Excelente servicio, los productos llegaron rápido y en perfectas condiciones.
                </p>
              </div>

              <div className="review-card featured">
                <div className="review-header">
                  <h4>Carlos García</h4>
                  <span className="review-rating">★★★★☆</span>
                </div>
                <p className="review-comment">
                  Muy buena atención, aunque podría mejorar la presentación del empaque.
                </p>
              </div>

              <div className="review-card featured">
                <div className="review-header">
                  <h4>Ana Torres</h4>
                  <span className="review-rating">★★★★★</span>
                </div>
                <p className="review-comment">
                  Me encantó todo, sin duda volveré a comprar. ¡Súper recomendado!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FORMULARIO */}
        <section className="form-section">
          <h2>Deja tu opinión</h2>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Calificación</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="5">★★★★★ - Excelente</option>
                <option value="4">★★★★☆ - Muy Bueno</option>
                <option value="3">★★★☆☆ - Bueno</option>
                <option value="2">★★☆☆☆ - Regular</option>
                <option value="1">★☆☆☆☆ - Malo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Comentario</label>
              <textarea
                id="comment"
                placeholder="Cuéntanos tu experiencia..."
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">
              <i className="fa-solid fa-paper-plane"></i> Enviar Reseña
            </button>
          </form>
        </section>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Reviews;
