import React, { useRef } from "react";
import { motion } from "framer-motion";
import capiProfile from "../assets/fondo.jpeg";

export default function VotacionesMulti({
  categoria,
  seleccionActual = [],
  onSeleccionChange,
  bloqueada,
  usuario,
}) {
  if (!categoria) return null;

  // devuelve los puntos según la posición en el array
  const getPuntos = (id) => {
    const index = seleccionActual.indexOf(id);
    if (index === -1) return null;
    if (index === 0) return 3;
    if (index === 1) return 2;
    if (index === 2) return 1;
    return null;
  };

  const toggleCandidato = (id) => {
    if (bloqueada) return;

    let nuevaSeleccion = [...seleccionActual];

    // si ya está seleccionado → lo quitamos
    if (nuevaSeleccion.includes(id)) {
      nuevaSeleccion = nuevaSeleccion.filter((x) => x !== id);
    } else {
      // si hay menos de 3, lo añadimos
      if (nuevaSeleccion.length < 3) {
        nuevaSeleccion.push(id);
      }
    }

    onSeleccionChange(nuevaSeleccion);
  };

  // ============================
  //  CONTROL GLOBAL DE MEDIA 🔥
  // ============================
  const currentMediaRef = useRef(null);

  const handleMediaPlay = (event) => {
    // Parar el anterior media
    if (currentMediaRef.current && currentMediaRef.current !== event.target) {
      currentMediaRef.current.pause();
    }

    // Marcar este como el actual
    currentMediaRef.current = event.target;
  };

  // Detectar tipo de archivo por extensión
  const getMediaType = (filename) => {
    if (!filename) return "image";

    const ext = filename.toLowerCase();

    if (ext.endsWith(".mp4") || ext.endsWith(".mov") || ext.endsWith(".webm"))
      return "video";

    if (ext.endsWith(".mp3") || ext.endsWith(".wav") || ext.endsWith(".ogg"))
      return "audio";

    return "image";
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* TÍTULO CATEGORÍA */}
      <h2 className="text-2xl font-bold text-[#ffb347] mb-2 text-center">
        {categoria.tituloCategoria}
      </h2>

      {/* DESCRIPCIÓN CATEGORÍA */}
      <p className="text-sm text-[#d0cfff] mb-6 text-center max-w-xl">
        {categoria.descripcion}
      </p>

      {/* LISTA DE CANDIDATOS */}
      <div className="grid gap-6 w-full max-w-5xl sm:grid-cols-2 md:grid-cols-3 mb-32">
        {categoria.candidatos.map((cand) => {
          const puntos = getPuntos(cand.idCandidato);
          const seleccionado = puntos !== null;

          const mediaType = getMediaType(cand.idImagen);
          const mediaSrc = new URL(`../assets/${cand.idImagen}`, import.meta.url).href;

          return (
            <motion.div
              key={cand.idCandidato}
              whileHover={!bloqueada ? { scale: 1.05, rotateY: 10 } : {}}
              className={`
                relative bg-[#1b0052]/70 border rounded-xl p-4 cursor-pointer 
                shadow-[0_0_20px_#5e00ff] transition-all border-[#5e00ff]

                ${seleccionado ? "shadow-[0_0_35px_#ffb347] border-[#ffb347]" : ""}
                ${bloqueada && !seleccionado ? "opacity-40 blur-[1px]" : ""}
              `}
              onClick={() => toggleCandidato(cand.idCandidato)}
            >
              {/* BADGE PUNTOS */}
              {seleccionado && (
                <div className="absolute top-2 right-2 z-20 bg-gradient-to-r from-[#ffb347] to-[#ffcc33] text-black font-bold text-[10px] px-2 py-1 rounded-full shadow-[0_0_10px_#ffb347]">
                  {puntos} pts
                </div>
              )}

              {/* MEDIA DINÁMICO (imagen, vídeo o audio) */}
              <div className="relative w-full h-40 mb-4 overflow-hidden flex items-center justify-center">
              {mediaType === "image" && (
                  <img
                    src={mediaSrc}
                    alt={cand.nombreCandidato}
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = capiProfile;
                    }}
                  />
                )}

                {mediaType === "video" && (
                  <video
                    className="w-full h-full object-contain rounded-lg"
                    src={mediaSrc}
                    controls
                    onPlay={handleMediaPlay}
                  />
                )}

                {mediaType === "audio" && (
                  <audio
                    controls
                    src={mediaSrc}
                    className="w-full"
                    onPlay={handleMediaPlay}
                  />
                )}
              </div>

              <h3 className="text-xl font-bold text-[#ffb347]">
                {cand.nombreCandidato}
              </h3>

              <p className="text-xs text-[#d0cfff] mt-1">{cand.descripcion}</p>

              <p className="text-xs text-[#7f7fff] italic mt-1">
                {cand.usuarioPropuesto}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
