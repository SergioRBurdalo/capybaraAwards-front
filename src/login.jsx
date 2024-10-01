import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // fetch('http://localhost:3000/updateLastLogin', {  // URL local del backend
    fetch('https://capybara-awards-back.vercel.app/updateLastLogin', {  // URL local del backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),  // Enviar también la contraseña
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login actualizado correctamente') {
        onLoginSuccess();
        navigate('/votaciones');
      } else {
        setError(data.message);  // Mostrar cualquier error que venga del backend
      }
    })
    .catch(error => {
      console.error('Error al actualizar lastLogin:', error);
    });
  };

  // Función para detectar la tecla "Enter" y disparar el login
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>

      <div className="login-form">
        <label htmlFor="username">Usuario</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={handleKeyPress}  // Captura de la tecla "Enter"
        />

        <button onClick={handleLogin}>Login</button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
