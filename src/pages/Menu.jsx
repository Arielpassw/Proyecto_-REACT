import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/menu.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("sopas");

  const categories = [
    { id: "sopas", name: "Sopas" },
    { id: "fuertes", name: "Platos Fuertes" },
    { id: "parrilla", name: "Parrilla" },
  ];

  useEffect(() => {
    const loadProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
    };

    loadProductos();
  }, []);

  const productosFiltrados = productos.filter(
    (p) => p.categoria === selectedCategory,
  );

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
            className={`category-btn ${
              selectedCategory === cat.id ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ITEMS */}
      <div className="container">
        <div className="menu-items">
          {productosFiltrados.length === 0 ? (
            <p>No hay productos en esta categoría.</p>
          ) : (
            productosFiltrados.map((item) => (
              <div key={item.id} className="menu-item">
                <div className="menu-item-image">
                  <img
                    src={item.imagen || "/images/default.jpg"}
                    alt={item.nombre}
                    onError={(e) => {
                      e.target.src = "/images/default.jpg";
                    }}
                  />
                </div>

                <div className="menu-item-content">
                  <h3>{item.nombre}</h3>
                  <p className="menu-item-description">{item.descripcion}</p>

                  <div className="menu-item-footer">
                    <span className="menu-item-price">
                      ${item.precio.toFixed(2)}
                    </span>

                    <Link to="/login" className="btn-add">
                      <i className="fa-solid fa-cart-plus"></i> Agregar
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;
