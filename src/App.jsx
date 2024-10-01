import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';  // Importamos el componente Login
import Votaciones from './votaciones';  // Importamos la página de votaciones
import './App.css';

function App() {
  // Al cargar, comprobamos si el usuario está autenticado en sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('isAuthenticated') === 'true'
  );

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
