import React, { useState } from "react";

export default function CategoryForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categories.length >= 5) {
      setError("Solo puedes añadir hasta 5 categorías.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError("Por favor, rellena ambos campos.");
      return;
    }

    const newCategory = { id: Date.now(), title, description };
    setCategories([...categories, newCategory]);
    setTitle("");
    setDescription("");
    setError("");
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
          disabled={!isFormValid || categories.length >= 5}
          className={`w-full py-3 rounded-lg text-lg font-bold text-black bg-gradient-to-r from-[#ffb347] to-[#ffcc33] transition-all duration-200 ${
            !isFormValid || categories.length >= 5
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-[0_0_20px_#ffb347]"
          }`}
        >
          Guardar Categoría
        </button>
      </form>

      {/* LISTA DE CATEGORÍAS */}
      <div className="grid gap-6 w-full max-w-3xl sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#1b0052]/80 border border-[#5e00ff] rounded-xl p-4 shadow-[0_0_20px_#5e00ff] hover:shadow-[0_0_30px_#ffb347] transition-all"
          >
            <h2 className="text-xl font-bold text-[#ffb347] mb-2">
              {cat.title}
            </h2>
            <p className="text-sm text-[#d0cfff]">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
