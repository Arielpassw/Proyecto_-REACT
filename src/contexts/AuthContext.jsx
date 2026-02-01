import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Detectar sesión activa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //REGISTRO (Firebase)
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // LOGIN USUARIO
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // LOGIN ADMIN (misma auth, rol se maneja aparte)
  const loginAdmin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //LOGOUT
  const logoutUser = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        registerUser,
        loginUser,
        loginAdmin,
        logoutUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
