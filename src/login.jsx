import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoNoBG from "./assets/capyiconNoBG.png";
import capyFooter from "./assets/capyfooter.png"; // tu imagen decorativa

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", "false");
    sessionStorage.setItem("categorias", "");
    sessionStorage.setItem("username", "");
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      fetch("https://capybara-awards-back.vercel.app/updateLastLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          if (data.message === "Login actualizado correctamente") {
            sessionStorage.setItem("isAuthenticated", "true");
            sessionStorage.setItem("username", username);
            onLoginSuccess();
            navigate("/candidatos");
          } else {
            setError(data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error al actualizar lastLogin:", error);
          setError("Ocurrió un error. Inténtalo de nuevo.");
        });
    }, 500);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#0a0025] to-[#1a004d] text-white overflow-hidden">
      {/* LOGIN CARD */}
      <div className="z-10 bg-[#12023a]/85 border border-[#5e00ff] rounded-2xl shadow-[0_0_40px_#5e00ff] backdrop-blur-md p-8 w-full max-w-sm text-white">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://i.pinimg.com/originals/a1/0e/71/a10e71e4e4245d2952ad40850d0124b3.gif"
              alt="Cargando..."
              className="w-64 h-64 mb-6"
            />
            <p className="text-[#ffb347] text-lg animate-pulse">
              Iniciando sesión...
            </p>
          </div>
        ) : (
          <>
            <img
              src={logoNoBG}
              alt="Capybara Awards Logo"
              className="w-52 h-52 mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-center text-[#ffb347] mb-6">
              Capybara Awards Login
            </h1>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-[#a9a9ff] font-medium mb-2"
              >
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full p-3 rounded-lg bg-[#1b0052] text-white border border-[#5e00ff] focus:ring-2 focus:ring-[#ffb347] outline-none"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-[#a9a9ff] font-medium mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={handleKeyPress}
                disabled={loading}
                className="w-full p-3 rounded-lg bg-[#1b0052] text-white border border-[#5e00ff] focus:ring-2 focus:ring-[#ffb347] outline-none"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !username.trim() || !password.trim()}
              className={`w-full py-3 rounded-lg text-lg font-bold text-black bg-gradient-to-r from-[#ffb347] to-[#ffcc33] transition-all duration-200 ${
                !username.trim() || !password.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-[0_0_20px_#ffb347]"
              }`}
            >
              Login
            </button>

            {error && (
              <div className="text-center mt-6">
                <p className="text-red-400 font-semibold">{error}</p>
                <img
                  src="https://i.pinimg.com/originals/44/ce/81/44ce8109895aa2070c7aa70ca1d51504.gif"
                  alt="Error gif"
                  className="w-52 h-72 mx-auto mt-3"
                />
              </div>
            )}

            <div className="text-[#a9a9ff] mt-8 text-center text-sm">
              Designed by 🍋
            </div>
          </>
        )}
      </div>

      {/* TOP DECORACIÓN (fade más corto y sutil) */}
      <div
        className="absolute top-0 left-0 w-full h-32 opacity-90"
        style={{
          backgroundImage: `url(${capyFooter})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "contain",
          backgroundPosition: "top",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* FOOTER DECORACIÓN (fade completo) */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 opacity-90"
        style={{
          backgroundImage: `url(${capyFooter})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      />
    </div>
  );
}

export default Login;
