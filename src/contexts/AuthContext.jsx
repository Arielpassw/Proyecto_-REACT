import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loggedAdmin, setLoggedAdmin] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    const savedAdmin = localStorage.getItem("loggedAdmin");
    
    if (savedUser) {
      setLoggedUser(JSON.parse(savedUser));
    }
    if (savedAdmin) {
      setLoggedAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const registerUser = (nombre, email, password) => {
    const newUser = { nombre, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    return newUser;
  };

  const loginUser = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    
    if (!savedUser) {
      throw new Error("No existe ningún usuario registrado.");
    }

    if (email === savedUser.email && password === savedUser.password) {
      setLoggedUser(savedUser);
      localStorage.setItem("loggedUser", JSON.stringify(savedUser));
      return savedUser;
    } else {
      throw new Error("Correo o contraseña incorrectos.");
    }
  };

  const loginAdmin = (email, password) => {
    if (email === "admin@papus.com" && password === "12345") {
      const adminUser = {
        nombre: "Administrador Papu's",
        rol: "admin"
      };
      setLoggedAdmin(adminUser);
      localStorage.setItem("loggedAdmin", JSON.stringify(adminUser));
      return adminUser;
    } else {
      throw new Error("Credenciales de administrador incorrectas.");
    }
  };

  const logoutUser = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
  };

  const logoutAdmin = () => {
    setLoggedAdmin(null);
    localStorage.removeItem("loggedAdmin");
  };

  const updateUserProfile = (nombre, email) => {
    const updatedUser = { ...loggedUser, nombre, email };
    setLoggedUser(updatedUser);
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        loggedAdmin,
        registerUser,
        loginUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
