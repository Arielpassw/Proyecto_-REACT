import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Login from './pages/Login';
import Recover from './pages/Recover';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas con Header */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />

          <Route
            path="/menu"
            element={
              <>
                <Header />
                <Menu />
              </>
            }
          />

          <Route
            path="/reviews"
            element={
              <>
                <Header />
                <Reviews />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <Header />
                <About />
              </>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/recover" element={<Recover />} />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Redirección de rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
