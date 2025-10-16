import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]); // ← Solo del usuario actual
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const usuario = sessionStorage.getItem("username") || "Anónimo";

  // 🔹 Cargar solo las categorías del usuario actual
  useEffect(() => {
    fetch("https://capybara-awards-back.vercel.app/getCategorias")
      // fetch("http://localhost:4001/getCategorias")
      .then((res) => res.json())
      .then((data) => {
        // Filtrar las categorías solo del usuario actual
        const propias = data.filter((cat) => cat.usuario === usuario);
        setCategories(propias);
      })
      .catch((err) => console.error("Error cargando categorías:", err));
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Solo cuenta las categorías del usuario actual
    if (categories.length >= 5) {
      setError("Solo puedes añadir hasta 5 categorías.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError("Por favor, rellena ambos campos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://capybara-awards-back.vercel.app/guardarCategoria",
        // "http://localhost:4001/guardarCategoria",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo: title,
            descripcion: description,
            usuario,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Solo añadimos si pertenece al usuario actual
        if (data.categoria.usuario === usuario) {
          setCategories((prev) => [data.categoria, ...prev]);
        }
        setTitle("");
        setDescription("");
        setError("");
      } else {
        setError(data.message || "Error al guardar la categoría.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("No se pudo conectar con el servidor.");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.setItem("isAuthenticated", "false");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("categorias");
    navigate("/login");
  };

  const isFormValid = title.trim() !== "" && description.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#0a0025] to-[#1a004d] p-6 text-white">
      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#12023a]/80 border border-[#5e00ff] rounded-2xl p-8 w-full max-w-md shadow-[0_0_30px_#5e00ff] backdrop-blur-md mb-10"
      >
        <h1 className="text-3xl font-bold text-center text-[#ffb347] mb-6">
          Añadir Categoría
        </h1>

        <p className="text-sm text-center text-[#a9a9ff] mb-4">
          Has creado {categories.length} de 5 categorías disponibles.
        </p>

        <label className="block text-[#a9a9ff] font-medium mb-2">
          Título de la categoría
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Mejor Video de Cocina"
          className="w-full p-3 rounded-lg bg-[#1b0052] text-white border border-[#5e00ff] focus:ring-2 focus:ring-[#ffb347] mb-4 outline-none"
          required
        />

        <label className="block text-[#a9a9ff] font-medium mb-2">
          Breve descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe brevemente la categoría..."
          className="w-full p-3 rounded-lg bg-[#1b0052] text-white border border-[#5e00ff] focus:ring-2 focus:ring-[#ffb347] mb-6 outline-none"
          rows="3"
          required
        />

        {error && (
          <p className="text-red-400 text-center font-semibold mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!isFormValid || categories.length >= 5 || loading}
          className={`w-full py-3 rounded-lg text-lg font-bold text-black bg-gradient-to-r from-[#ffb347] to-[#ffcc33] transition-all duration-200 ${
            !isFormValid || categories.length >= 5 || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-[0_0_20px_#ffb347]"
          }`}
        >
          {loading ? "Guardando..." : "Guardar Categoría"}
        </button>
      </form>

      {/* LISTA DE CATEGORÍAS PROPIAS */}
      <div className="grid gap-6 w-full max-w-3xl sm:grid-cols-2 md:grid-cols-3 mb-10">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-[#1b0052]/80 border border-[#5e00ff] rounded-xl p-4 shadow-[0_0_20px_#5e00ff] hover:shadow-[0_0_30px_#ffb347] transition-all"
          >
            <h2 className="text-xl font-bold text-[#ffb347] mb-2">
              {cat.titulo}
            </h2>
            <p className="text-sm text-[#d0cfff] mb-2">{cat.descripcion}</p>
            <p className="text-xs text-[#8c8cff]">
              Propuesto por:{" "}
              <span className="text-[#ffb347]">{cat.usuario}</span>
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="w-full flex flex-col items-center justify-center mt-10 mb-4 text-center">
        <button
          onClick={handleLogout}
          className="px-6 py-3 rounded-lg text-black font-bold bg-gradient-to-r from-[#ffb347] to-[#ffcc33] hover:shadow-[0_0_20px_#ffb347] transition-all duration-200 mb-3"
        >
          Salir
        </button>

        <p className="text-xs text-[#a9a9ff] opacity-80">
          © {new Date().getFullYear()} Capybara Awards 🍋 — All rights reserved.
        </p>
      </footer>
    </div>
  );
}
