import { useState, useEffect } from 'react';

// Importación de todos los archivos
import candidatoAdri from '../assets/candidato-adri.jpg';
import candidatoAlexguti from '../assets/candidato-alexguti.jpg';
import candidatoAna from '../assets/candidato-ana.jpg';
import candidatoBuyi from '../assets/candidato-buyi.jpg';
import candidatoCarlos from '../assets/candidato-carlos.jpg';
import candidatoChavi from '../assets/candidato-chavi.jpg';
import candidatoDanino from '../assets/candidato-danino.jpg';
import candidatoFany from '../assets/candidato-fany.jpg';
import candidatoJudith from '../assets/candidato-judith.jpg';
import candidatoLaura from '../assets/candidato-laura.jpg';
import candidatoLazaro from '../assets/candidato-lazaro.jpg';
import candidatoMaria from '../assets/candidato-maria.jpg';
import candidatoRaquel from '../assets/candidato-raquel.jpg';
import candidatoRobert from '../assets/candidato-robert.jpg';
import candidatoRobertcuchara from '../assets/candidato-robertcuchara.jpg';
import candidatoRojas from '../assets/candidato-rojas.jpg';
import candidatoSergio from '../assets/candidato-sergio.jpg';
import candidatoVila from '../assets/candidato-vila.jpg';
import buyiOgg from '../assets/buyi.ogg';
import juditOgg from '../assets/judit.ogg';
import capiProfile from '../assets/capi_profile.jpeg';
import capyawardIco from '../assets/capyaward-ico.png';
import capyiconNoBG from '../assets/capyiconNoBG.png';
import carpinchoPng from '../assets/carpincho.png';
import fondoJpeg from '../assets/fondo.jpeg';
import limpiezaTardeo from '../assets/limpieza_tardeo.jpeg';
import neveraPng from '../assets/nevera.png';
import parkingVino from '../assets/parking_vino.jpeg';
import porroMentiras from '../assets/porro_mentiras.png';
import reactSvg from '../assets/react.svg';
import shrekPng from '../assets/shrek.png';

// Mapeo de archivos con el nombre exacto del archivo como clave
const assets = {
  'candidato-adri.jpg': candidatoAdri,
  'candidato-alexguti.jpg': candidatoAlexguti,
  'candidato-ana.jpg': candidatoAna,
  'candidato-buyi.jpg': candidatoBuyi,
  'candidato-carlos.jpg': candidatoCarlos,
  'candidato-chavi.jpg': candidatoChavi,
  'candidato-danino.jpg': candidatoDanino,
  'candidato-fany.jpg': candidatoFany,
  'candidato-judith.jpg': candidatoJudith,
  'candidato-laura.jpg': candidatoLaura,
  'candidato-lazaro.jpg': candidatoLazaro,
  'candidato-maria.jpg': candidatoMaria,
  'candidato-raquel.jpg': candidatoRaquel,
  'candidato-robert.jpg': candidatoRobert,
  'candidato-robertcuchara.jpg': candidatoRobertcuchara,
  'candidato-rojas.jpg': candidatoRojas,
  'candidato-sergio.jpg': candidatoSergio,
  'candidato-vila.jpg': candidatoVila,
  'buyi.ogg': buyiOgg,
  'judit.ogg': juditOgg,
  'capi_profile.jpeg': capiProfile,
  'capyaward-ico.png': capyawardIco,
  'capyiconNoBG.png': capyiconNoBG,
  'carpincho.png': carpinchoPng,
  'fondo.jpeg': fondoJpeg,
  'limpieza_tardeo.jpeg': limpiezaTardeo,
  'nevera.png': neveraPng,
  'parking_vino.jpeg': parkingVino,
  'porro_mentiras.png': porroMentiras,
  'react.svg': reactSvg,
  'shrek.png': shrekPng,
};

function Votaciones() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState(0);
  const [modalVisible, setModalVisible] = useState(true); // Controla la visibilidad del modal

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
            imagen: getAsset(candidato.idImagen),
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

  const getAsset = (idImagen) => {
    return assets[idImagen] || 'default-image.png';
  };

  const handleNextCategoria = () => {
    if (categoriaActual < categorias.length - 1) {
      setCategoriaActual(categoriaActual + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevCategoria = () => {
    if (categoriaActual > 0) {
      setCategoriaActual(categoriaActual - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleVotar = (opcion) => {
    alert(`Has votado por: ${opcion.texto}`);
  };

  return (
    <div className="container mx-auto p-4 relative">
      {modalVisible && (
        <div className="fixed inset-0 bg-blue-300  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a las Votaciones</h2>
            <p className="mb-4">Este es el evento en el que podrás votar por tus candidatos favoritos. Haz clic en "Comenzar a votar" para iniciar.</p>
            <button
              onClick={() => setModalVisible(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-600"
            >
              Comenzar a votar
            </button>
          </div>
        </div>
      )}

      {categorias.length > 0 && (
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
                    src={opcion.imagen}
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
