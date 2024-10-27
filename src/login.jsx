import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoNoBG from './assets/capyiconNoBG.png';
import fondoImage from './assets/fondo.jpeg';


function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Estado para el spinner
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', 'false');
    sessionStorage.setItem('categorias', "");
    sessionStorage.setItem('username', "");
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      fetch('https://capybara-awards-back.vercel.app/updateLastLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.message === 'Login actualizado correctamente') {
          sessionStorage.setItem('isAuthenticated', 'true');
          sessionStorage.setItem("username", username);
          onLoginSuccess();
          navigate('/votaciones');
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error al actualizar lastLogin:', error);
        setError('Ocurrió un error. Inténtalo de nuevo.');
      });
    }, 500);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoImage})` }}
      >
    <div className="bg-blue-400 bg-opacity-95 p-8 rounded-lg shadow-lg w-full max-w-sm items-center">
    {loading ? (
      <div className="spinner-container">
        <img
          src="https://gifdb.com/images/high/capybara-roasting-marsmallow-animation-qcdhwlnzujo4qoza.webp"
          alt="Cargando..."
          className="loading-gif w-84 h-84 mx-auto"
        />
      </div>
    ) : (
      <>
        <img
          src={logoNoBG}
          alt="Capybara Awards Logo"
          className="w-72 h-72 mx-auto mb-4"
        />
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-100 text-left">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-100 text-left">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={handleKeyPress}
            disabled={loading}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-white text-blue-500 p-2 rounded hover:bg-blue-600 hover:text-white transition"
          disabled={loading}
        >
          Login
        </button>
        {error && (
        <div className="text-center mt-4">
          <p className="text-red-600 ">{error}</p>
          <img
            src="https://i.pinimg.com/originals/44/ce/81/44ce8109895aa2070c7aa70ca1d51504.gif"
            alt="Error gif"
            className="w-52 h-72 mx-auto mt-2"
          />
        </div>
      )}
        <div className="text-white mt-4 text-center">Designed by 🍋</div>
</>
    )}
    </div>

    </div>
  );
}

export default Login;
