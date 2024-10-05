import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoNoBG from './assets/capyiconNoBG.png';


function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Estado para el spinner
  const navigate = useNavigate();
  

  const handleLogin = () => {
    setLoading(true);  // Mostrar el GIF de carga
    setError('');  // Limpiar errores previos

    // Forzar un retraso de 4 segundos antes de continuar con la lógica de login
    setTimeout(() => {
      fetch('https://capybara-awards-back.vercel.app/updateLastLogin', {  // URL del backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),  // Enviar también la contraseña
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);  // Ocultar el GIF de carga
        if (data.message === 'Login actualizado correctamente') {
          onLoginSuccess();
          navigate('/votaciones');
        } else {
          setError(data.message);  // Mostrar cualquier error que venga del backend
        }
      })
      .catch(error => {
        setLoading(false);  // Ocultar el GIF de carga en caso de error
        console.error('Error al actualizar lastLogin:', error);
        setError('Ocurrió un error. Inténtalo de nuevo.');
      });
    }, 2500);  // Retraso de 4 segundos
  };

  // Función para detectar la tecla "Enter" y disparar el login
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <div className="spinner-container">
          <img 
            src="https://gifdb.com/images/high/capybara-roasting-marsmallow-animation-qcdhwlnzujo4qoza.webp" 
            alt="Cargando..." 
            className="loading-gif" 
          />
        </div>
      ) : (
        <>
          <div className="login-form">
            <img
            src={logoNoBG}
            alt="logoNoBG"
            className="capyLog"
          />
            <div className="input-container">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading} // Deshabilitar mientras carga
              />
            </div>

            <div className="input-container">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={handleKeyPress} // Captura de la tecla "Enter"
                disabled={loading} // Deshabilitar mientras carga
              />
            </div>

            <button className="logButton" onClick={handleLogin}>Login</button>
          </div>
          {/* Mostrar el mensaje de error y el GIF cuando hay un error */}
      {error && (
        <div className="error-container">
          <p className="error">{error}</p>
          <img
            src="https://i.pinimg.com/originals/44/ce/81/44ce8109895aa2070c7aa70ca1d51504.gif"
            alt="Error gif"
            className="error-gif"
          />
        </div>
      )}
          <div className='powerby'>Designed by 🍋</div>

        </>
      )}

      
    </div>
  );
}

export default Login;
