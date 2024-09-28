import './App.css';
import votaciones from '../votaciones_fake.json';  // Importamos el JSON de votaciones
import { useState, useEffect } from 'react';

function Votaciones() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState(0);

  useEffect(() => {
    // Cargar los datos del JSON
    setCategorias(votaciones.categorias);
  }, []);

  const handleNextCategoria = () => {
    if (categoriaActual < categorias.length - 1) {
      setCategoriaActual(categoriaActual + 1);
    }
  };

  const handlePrevCategoria = () => {
    if (categoriaActual > 0) {
      setCategoriaActual(categoriaActual - 1);
    }
  };

  return (
    <div className="container">
      {categorias.length > 0 && (
        <>
          <h1>{categorias[categoriaActual].nombre}</h1>

          <div className="opciones-grid">
            {categorias[categoriaActual].opciones.map((opcion) => (
              <div key={opcion.id} className="opcion">
                <div className="imagen-container">
                  <img src={opcion.imagen} alt={opcion.texto} className="imagen" />
                </div>
                <p className="titulo">{opcion.texto}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button className="prev" onClick={handlePrevCategoria} disabled={categoriaActual === 0}>
              &lt;
            </button>
            <span className="categoria-info">
              Categoría {categoriaActual + 1}/{categorias.length}
            </span>
            <button className="next" onClick={handleNextCategoria} disabled={categoriaActual === categorias.length - 1}>
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Votaciones;
