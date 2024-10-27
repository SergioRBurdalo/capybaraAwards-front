import { useState, useEffect } from 'react';

function Votaciones() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState(0);
  const [showModal, setShowModal] = useState(true); // Estado para controlar el modal

  useEffect(() => {
    const fetchVotaciones = async () => {
      try {
        const response = await fetch('https://capybara-awards-back.vercel.app/getVotaciones');
        const data = await response.json();

        const categoriasAdaptadas = data.map((categoria) => ({
          nombre: categoria.tituloCategoria,
          descripcion: categoria.descripcion,
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
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll al inicio
    }
  };

  const handlePrevCategoria = () => {
    if (categoriaActual > 0) {
      setCategoriaActual(categoriaActual - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll al inicio
    }
  };

  const handleVotar = (opcion) => {
    alert(`Has votado por: ${opcion.texto}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-blue-300 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a las Votaciones de los Capyvara Awards 2024</h2>
            <p className="text-gray-700 mb-8">
              Aquí tienes un texto de introducción que describe el propósito de la página.
              Este texto puede contener hasta 300 caracteres o la información que necesites 
              para que los usuarios comprendan la importancia de su voto. ¡Comienza a votar ahora!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-600"
            >
              Comenzar a votar
            </button>
          </div>
        </div>
      )}

      {!showModal && categorias.length > 0 && (
        <>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-blue-800">
              {categorias[categoriaActual].nombre}
            </h1>
            <p className="text-gray-700">{categorias[categoriaActual].descripcion}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias[categoriaActual].opciones.map((opcion) => (
              <div
                key={opcion.id}
                className="relative w-full bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <div className="w-auto h-auto mb-2 flex justify-center items-center">
                  <img
                    src={`src/assets/${opcion.imagen}`}
                    alt={opcion.texto}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <p className="text-xl text-center font-semibold">{opcion.texto}</p>
                <p className="text-center mt-2">{opcion.descripcion}</p>
                <button
                  onClick={() => handleVotar(opcion)}
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105 active:bg-blue-700 active:scale-95"
                >
                  Votar
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevCategoria}
              disabled={categoriaActual === 0}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
            >
              &lt; Anterior
            </button>
            <span className="text-m mt-2 font-bold">
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
