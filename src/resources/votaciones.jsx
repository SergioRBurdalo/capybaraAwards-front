import { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';
import PointConfirmModal from './PointConfirmModal'; // Nuevo modal para puntos

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
import candidatoCarlosSergio from '../assets/candidato-carlos_sergio.jpg';
import candidatoAdriRobert from '../assets/candidato-adri_rober.jpg';
import candidatoCarlosAdri from '../assets/candidato-carlos_adri.jpg';
import candidatoRaquelAdriLaura from '../assets/candidato-raquel_adri_laura.jpg';
import capiWeb from '../assets/Capiweb.png';
import sonido from '../assets/sonido.png';

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
  'candidato-carlos_sergio.jpg': candidatoCarlosSergio,
  'candidato-adri_rober.jpg': candidatoAdriRobert,
  'candidato-carlos_adri.jpg': candidatoCarlosAdri,
  'candidato-raquel_adri_laura.jpg': candidatoRaquelAdriLaura,
  'Capiweb.png': capiWeb,
  'sonido.png': sonido,
};



function Votaciones() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [votados, setVotados] = useState({});
  const [categoriaVotada, setCategoriaVotada] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [pointConfirmModalVisible, setPointConfirmModalVisible] = useState(false);
  const [selectedCandidato, setSelectedCandidato] = useState(null);
  const [puntosSeleccionados, setPuntosSeleccionados] = useState([]); // Para orden de preferencia en multichoise
  const [botonesNavegacionHabilitados, setBotonesNavegacionHabilitados] = useState(true);

  useEffect(() => {
    const fetchVotaciones = async () => {
      try {
        const response = await fetch('https://capybara-awards-back.vercel.app/getVotaciones');
        const data = await response.json();
        const nombreUsuario = sessionStorage.getItem('username');

        const categoriasAdaptadas = data
          .filter((categoria) => !categoria.hidden)
          .map((categoria) => {
            const votoUsuario = categoria.votaciones.find((voto) => voto.nombreUsuario === nombreUsuario);

            const opciones = categoria.candidatos.map((candidato) => {
              // Determina el color según los votos multichoise
              let color = 'bg-white';
              if (categoria.multichoise && votoUsuario) {
                if (votoUsuario.tresPuntos === candidato.nombreCandidato) color = 'bg-yellow-300';
                else if (votoUsuario.dosPuntos === candidato.nombreCandidato) color = 'bg-gray-400';
                else if (votoUsuario.unPunto === candidato.nombreCandidato) color = 'bg-orange-500';
              } else if (votoUsuario && votoUsuario.nombreCandidato === candidato.nombreCandidato) {
                color = 'bg-green-200';
              }

              return {
                id: candidato.idCandidato,
                texto: candidato.nombreCandidato,
                imagen: getAsset(candidato.idImagen),
                descripcion: candidato.descripcion,
                audio: candidato.idAudio ? getAsset(candidato.idAudio) : null,
                usuarioPropuesto: candidato.usuarioPropuesto, // Agregar usuarioPropuesto
                isVoted: !!votoUsuario,
                color: color,
              };
            });

            return {
              idCategoria: categoria.idCategoria,
              nombre: categoria.tituloCategoria,
              descripcion: categoria.descripcion,
              multichoise: categoria.multichoise,
              opciones: opciones,
            };
          });

        setCategorias(categoriasAdaptadas);
        verificarBotonesNavegacion(categoriasAdaptadas[categoriaActual]);

      } catch (error) {
        console.error('Error al cargar las votaciones:', error);
      }
    };

    fetchVotaciones();
  }, [categoriaActual]);

  const getAsset = (idImagen) => {
    return assets[idImagen] || 'default-image.png';
  };

  const verificarBotonesNavegacion = (categoria) => {
    if (categoria.multichoise && categoria.opciones.filter(op => op.color !== 'bg-white').length < 3) {
      setBotonesNavegacionHabilitados(false);
    } else {
      setBotonesNavegacionHabilitados(true);
    }
  };

  const handleNextCategoria = () => {
    if (categoriaActual < categorias.length - 1) {
      setCategoriaActual(categoriaActual + 1);
      setCategoriaVotada(null);
      setPuntosSeleccionados([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevCategoria = () => {
    if (categoriaActual > 0) {
      setCategoriaActual(categoriaActual - 1);
      setCategoriaVotada(null);
      setPuntosSeleccionados([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleVotar = (opcion) => {
    const categoria = categorias[categoriaActual];
    setSelectedCandidato(opcion);

    if (categoria.multichoise) {
      setPointConfirmModalVisible(true);
    } else {
      setConfirmModalVisible(true);
    }
  };

  const confirmVoto = async () => {
    const nombreUsuario = sessionStorage.getItem('username');
    const idCategoria = categorias[categoriaActual].idCategoria;

    try {
      const response = await fetch('https://capybara-awards-back.vercel.app/guardarVoto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCategoria,
          nombreCandidato: selectedCandidato.texto,
          nombreUsuario,
        }),
      });

      if (response.ok) {
        const categoriasActualizadas = categorias.map((categoria, index) => {
          if (index === categoriaActual) {
            return {
              ...categoria,
              opciones: categoria.opciones.map((opcion) =>
                opcion.texto === selectedCandidato.texto
                  ? { ...opcion, color: 'bg-green-200', isVoted: true }
                  : opcion
              ),
            };
          }
          return categoria;
        });

        setCategorias(categoriasActualizadas);
        setVotados((prevVotados) => ({ ...prevVotados, [selectedCandidato.id]: true }));
        setCategoriaVotada(categoriaActual);
        setConfirmModalVisible(false);
      }
    } catch (error) {
      console.error('Error al registrar el voto:', error);
      alert('Hubo un problema al registrar tu voto. Por favor, intenta de nuevo.');
      setConfirmModalVisible(false);
    }
  };

  const confirmPuntosVoto = async () => {
    const nombreUsuario = sessionStorage.getItem('username');
    const idCategoria = categorias[categoriaActual].idCategoria;
    const tipoPunto = `${3 - puntosSeleccionados.length}Puntos`;

    try {
      await fetch('https://capybara-awards-back.vercel.app/guardarVotoPuntuado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCategoria,
          nombreUsuario,
          fechaVotacion: new Date().toISOString(),
          puntos: selectedCandidato.texto,
          tipoPunto,
        }),
      });

      const categoriasActualizadas = categorias.map((categoria, index) => {
        if (index === categoriaActual) {
          const newColor =
            tipoPunto === '3Puntos' ? 'bg-yellow-300' : tipoPunto === '2Puntos' ? 'bg-gray-400' : 'bg-orange-500';

          const opcionesActualizadas = categoria.opciones.map((opcion) =>
            opcion.texto === selectedCandidato.texto ? { ...opcion, color: newColor, isVoted: true } : opcion
          );

          return {
            ...categoria,
            opciones: opcionesActualizadas,
          };
        }
        return categoria;
      });

      setCategorias(categoriasActualizadas);
      setPuntosSeleccionados((prev) => [...prev, selectedCandidato]);
      setPointConfirmModalVisible(false);

      if (puntosSeleccionados.length + 1 === 3) {
        verificarBotonesNavegacion(categoriasActualizadas[categoriaActual]);
      }
    } catch (error) {
      console.error('Error al registrar el voto:', error);
      alert('Hubo un problema al registrar tu voto. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      {confirmModalVisible && (
        <ConfirmModal
          candidato={selectedCandidato?.texto}
          onConfirm={confirmVoto}
          onCancel={() => setConfirmModalVisible(false)}
        />
      )}

      {pointConfirmModalVisible && (
        <PointConfirmModal
          candidato={selectedCandidato?.texto}
          puntos={3 - puntosSeleccionados.length}
          onConfirm={confirmPuntosVoto}
          onCancel={() => setPointConfirmModalVisible(false)}
        />
      )}

      {modalVisible && (
        <div className="fixed inset-0 bg-blue-300 flex items-center justify-center z-50 mr-2">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a las Votaciones de los Capybara Awards 2024</h2>
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
                className={`relative w-full rounded-lg shadow-md p-4 flex flex-col items-center ${opcion.color}`}
              >
                <div className="w-auto h-auto mb-2 flex justify-center items-center">
                  <img src={opcion.imagen} alt={opcion.texto} className="w-full h-full object-cover rounded" />
                </div>
                <p className="text-xl text-center font-semibold">{opcion.texto}</p>
                {opcion.usuarioPropuesto && opcion.usuarioPropuesto !== "" && (
                  <p className="text-sm text-center text-gray-500 mt-1">Propuesto por: {opcion.usuarioPropuesto}</p>
                )}
                <p className="text-center mt-2">{opcion.descripcion}</p>

                {opcion.audio && (
                  <button
                    onClick={() => {
                      const audio = new Audio(opcion.audio);
                      audio.play();
                    }}
                    className="bg-gray-200 text-gray-700 py-1 px-3 rounded mt-2"
                  >
                    ▶️ Reproducir Audio
                  </button>
                )}

                {!(categoriaVotada === categoriaActual) && !opcion.isVoted && !votados[opcion.id] && (
                  <button
                    onClick={() => handleVotar(opcion)}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105 active:bg-blue-700 active:scale-95"
                  >
                    {categorias[categoriaActual].multichoise ? `Seleccionar` : `Votar`}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevCategoria}
              disabled={!botonesNavegacionHabilitados || categoriaActual === 0}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
            >
              &lt; Anterior
            </button>
            <span className="text-m mt-2 font-bold">
              Categoría {categoriaActual + 1}/{categorias.length}
            </span>
            <button
              onClick={handleNextCategoria}
              disabled={!botonesNavegacionHabilitados || categoriaActual === categorias.length - 1}
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