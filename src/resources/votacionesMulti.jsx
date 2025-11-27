// VotacionesMulti.jsx
import React from "react";

export default function VotacionesMulti({
  categoria,
  currentIndex,
  categoriasLength,
  setCurrentIndex
}) {
  return (
    <div className="text-white p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">
        {categoria.tituloCategoria} (MULTICHOICE)
      </h1>

      <p className="opacity-60">🛠 Aún no implementado</p>
    </div>
  );
}
