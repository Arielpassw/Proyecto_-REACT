import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/menu.css';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('sopas');

  const menuItems = {
    sopas: [
      {
        id: 1,
        name: 'Encebollado',
        price: 5.0,
        description: 'Tradicional sopa ecuatoriana con atún fresco, yuca y cebolla curtida.',
        image: '/images/Encebollado.jpg',
      },
      {
        id: 2,
        name: 'Viche de Mariscos',
        price: 6.5,
        description: 'Deliciosa sopa espesa con camarón, pescado y maní.',
        image: '/images/viche.jpg',
      },
      {
        id: 3,
        name: 'Locro de Papa',
        price: 4.5,
        description: 'Crema espesa de papa con queso y aguacate.',
        image: '/images/locro.jpg',
      },
      {
        id: 4,
        name: 'Yahuarlocro',
        price: 5.5,
        description: 'Potente sopa tradicional con vísceras, papa y aguacate.',
        image: '/images/yahuarlocro.jpg',
      },
    ],
    fuertes: [
      {
        id: 5,
        name: 'Seco de Pollo',
        price: 6.0,
        description: 'Jugoso pollo en salsa criolla acompañado de arroz y maduro frito.',
        image: '/images/secopollo.jpg',
      },
      {
        id: 6,
        name: 'Encocado de Pescado',
        price: 7.5,
        description: 'Filete de pescado bañado en salsa de coco con pimiento y especias.',
        image: '/images/encocado.jpg',
      },
      {
        id: 7,
        name: 'Corvina Frita',
        price: 8.0,
        description: 'Pescado crujiente acompañado de arroz, ensalada y patacones.',
        image: '/images/corvina.jpg',
      },
      {
        id: 8,
        name: 'Seco de Carne',
        price: 6.5,
        description: 'Carne guisada lentamente con cerveza, acompañada de arroz y aguacate.',
        image: '/images/secocarne.jpg',
      },
    ],
    parrilla: [
      {
        id: 9,
        name: 'Lomo Fino Mantequilla',
        price: 12.0,
        description: 'Lomo de carne premium asado a la parrilla con salsa de champiñones.',
        image: '/images/lomofino.jpg',
      },
      {
        id: 10,
        name: 'Asado a la Parrilla',
        price: 14.5,
        description: 'Costillas de res asadas lentamente con hierbas aromáticas.',
        image: '/images/costillas.jpg',
      },
      {
        id: 11,
        name: 'Churrasco',
        price: 11.0,
        description: 'Tira de asado grillada con salsa criolla y papas.',
        image: '/images/churrasco.jpg',
      },
      {
        id: 12,
        name: 'Pinchos Variados',
        price: 9.5,
        description: 'Selección de pinchos con carne, verduras y champiñones.',
        image: '/images/Pinchos Variados.jpg',
      },
    ],
  };

  const categories = [
    { id: 'sopas', name: 'Sopas' },
    { id: 'fuertes', name: 'Platos Fuertes' },
    { id: 'parrilla', name: 'Especialidades a la Parrilla' },
  ];

  return (
    <div className="menu-page">
      {/* HEADER */}
      <div className="menu-header">
        <h1>Nuestro Menú</h1>
        <p>Descubre nuestras deliciosas opciones</p>
      </div>

      {/* CATEGORÍAS */}
      <div className="menu-categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ITEMS */}
      <div className="container">
        <div className="menu-items">
          {menuItems[selectedCategory].map((item) => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-image">
                <img src={item.image} alt={item.name} onError={(e) => { e.target.src = '/images/default.jpg'; }} />
              </div>
              <div className="menu-item-content">
                <h3>{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                  <span className="menu-item-price">${item.price.toFixed(2)}</span>
                  <Link to="/login" className="btn-add">
                    <i className="fa-solid fa-cart-plus"></i> Agregar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Menu;
