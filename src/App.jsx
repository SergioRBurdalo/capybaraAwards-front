import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';  // Importamos el componente Login
import Votaciones from './resources/votaciones';  // Importamos la página de votaciones
import './App.css';

function App() {
  // Al cargar, comprobamos si el usuario está autenticado en sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    // Cambiar el fondo del body según el estado de autenticación
    if (isAuthenticated) {
      // Si está autenticado, aplicar imagen de fondo
      document.body.style.backgroundImage = "url('./assets/fondo.jpeg')";
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    } else {
      // Si no está autenticado, dejar el fondo predeterminado (por ejemplo, color azul)
      document.body.style.backgroundImage = '';
      document.body.style.backgroundColor = '#1E90FF';  // Color azul
    }

    // Cleanup: quitar estilos cuando se desmonte el componente
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundColor = '';
    };
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');  // Guardamos el estado en sessionStorage
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={<Login onLoginSuccess={handleLoginSuccess} />} 
      />
      <Route 
        path="/votaciones" 
        element={isAuthenticated ? <Votaciones /> : <Navigate to="/login" />} 
      />
      <Route 
        path="*" 
        element={isAuthenticated ? <Votaciones /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}

export default App;
