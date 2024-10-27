import { useState, useEffect } from 'react';
import './Votaciones.css';

function Votaciones() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState(0);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    const fetchVotaciones = async () => {
      try {
        const response = await fetch('http://localhost:4001/getVotaciones');
        const data = await response.json();

        const categoriasAdaptadas = data.map((categoria) => ({
          nombre: categoria.tituloCategoria,
          opciones: categoria.candidatos.map((candidato) => ({
            id: candidato.idCandidato,
            texto: candidato.nombreCandidato,
            imagen: candidato.idImagen || 'default-image.png',
            descripcion: candidato.descripcion,
          })),
        }));

        setCategorias(categoriasAdaptadas);
      } catch (error) {
        console.error('Error al cargar las votaciones:', error);
      }
    };

    fetchVotaciones();
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

  const toggleFlip = (id) => {
    setFlipped((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleVotar = (opcion) => {
    alert(`Has votado por: ${opcion.texto}`);
  };

  return (
    <div className="container mx-auto p-4">
      {categorias.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            {categorias[categoriaActual].nombre}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias[categoriaActual].opciones.map((opcion) => (
              <div
                key={opcion.id}
                className={`card relative w-full h-64 cursor-pointer ${
                  flipped[opcion.id] ? 'flip' : ''
                }`}
                onClick={() => toggleFlip(opcion.id)}
              >
                <div className="card-inner">
                  {/* Parte frontal */}
                  <div className="card-front bg-white p-4 rounded-lg shadow-md">
                  <div className="w-full h-full mb-4">
                    <img
                      src={`src/assets/${opcion.imagen}`}
                      alt={opcion.texto}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                    <p className="text-center font-semibold">{opcion.texto}</p>
                  </div>

                  {/* Parte trasera */}
                  <div className="card-back bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <p className="text-center p-4">{opcion.descripcion}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVotar(opcion);
                      }}
                      className="bg-blue-500 text-white py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105 active:bg-blue-700 active:scale-95"
                    >
                      Votar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevCategoria}
              disabled={categoriaActual === 0}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
            >
              &lt; Anterior
            </button>
            <span className="text-lg font-bold">
              Categoría {categoriaActual + 1}/{categorias.length}
            </span>
            <button
              onClick={handleNextCategoria}
              disabled={categoriaActual === categorias.length - 1}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
            >
              Siguiente &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Votaciones;
