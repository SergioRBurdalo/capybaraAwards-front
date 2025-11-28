import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VotacionesSingle from "./votacionesSingle.jsx";
import VotacionesMulti from "./votacionesMulti";
import capiProfile from "../assets/fondo.jpeg";

export default function VotacionesPage() {
  const [categorias, setCategorias] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seleccion, setSeleccion] = useState({});
  const [modal, setModal] = useState({ visible: false, mensaje: "" });
  const [bloqueadas, setBloqueadas] = useState({});

  const usuario = sessionStorage.getItem("username") || "Anónimo";

  /* --------------------------------------------------------
      CARGAR CATEGORÍAS Y DETECTAR VOTOS PREVIOS
  --------------------------------------------------------- */
  useEffect(() => {
    fetch("https://capybara-awards-back.vercel.app/votaciones")
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data);

        const bloqueos = {};
        const sel = {};

        data.forEach((cat) => {
          /* ----------------------------------------------
             SINGLE
          ---------------------------------------------- */
          const votoSingle = cat.candidatos.find((c) =>
            c.votadoPor?.includes(usuario)
          );

          if (votoSingle) {
            bloqueos[cat._id] = true;
            sel[cat._id] = votoSingle.idCandidato;
          }

          /* ----------------------------------------------
             MULTI — detectar votosMulti y ordenarlos 3–2–1
          ---------------------------------------------- */
          const votosUsuario = [];

          cat.candidatos.forEach((c) => {
            if (Array.isArray(c.votosMulti)) {
              const v = c.votosMulti.find((x) => x.usuario === usuario);
              if (v) {
                votosUsuario.push({
                  candidatoId: c.idCandidato,
                  puntos: v.puntos,
                });
              }
            }
          });

          if (votosUsuario.length > 0) {
            // Ordenar → 3, 2, 1
            votosUsuario.sort((a, b) => b.puntos - a.puntos);

            // Guardar solo los IDs en orden correcto
            sel[cat._id] = votosUsuario.map((v) => v.candidatoId);

            bloqueos[cat._id] = true;
          }
        });

        setBloqueadas(bloqueos);
        setSeleccion(sel);
      })
      .catch((err) => console.error("Error cargando votaciones:", err));
  }, []);

  const categoria = categorias[currentIndex];

  /* --------------------------------------------------------
      SCROLL TOP AL CAMBIAR DE CATEGORÍA
  --------------------------------------------------------- */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  /* --------------------------------------------------------
      SELECCIONAR DESDE HIJOS (single o multi)
  --------------------------------------------------------- */
  const handleSeleccion = (data) => {
    if (bloqueadas[categoria._id]) {
      setModal({ visible: true, mensaje: "Ya has votado en esta categoría." });
      return;
    }

    setSeleccion({
      ...seleccion,
      [categoria._id]: data,
    });
  };

  /* --------------------------------------------------------
      BOTÓN VOTAR
  --------------------------------------------------------- */
  const votar = async () => {
    if (!categoria) return;

    const seleccionActual = seleccion[categoria._id];

    if (
      !seleccionActual ||
      (categoria.multichoise && seleccionActual.length === 0)
    ) {
      return setModal({
        visible: true,
        mensaje: "⚠️ Selecciona al menos un candidato antes de votar.",
      });
    }

    try {
      const endpoint = categoria.multichoise
        ? "https://capybara-awards-back.vercel.app/votarMulti"
        // ? "http://localhost:4001/votarMulti"
        : "https://capybara-awards-back.vercel.app/votarSingle";
        // : "http://localhost:4001/votarSingle";

      const body = categoria.multichoise
        ? {
            categoriaId: categoria._id,
            candidatoIds: seleccionActual,
            usuario,
          }
        : {
            categoriaId: categoria._id,
            candidatoId: seleccionActual,
            usuario,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        return setModal({
          visible: true,
          mensaje: data.message || "Error enviando el voto.",
        });
      }

      setBloqueadas({
        ...bloqueadas,
        [categoria._id]: true,
      });

      setModal({
        visible: true,
        mensaje: "🦫✨ ¡Voto registrado correctamente!",
      });
    } catch (err) {
      setModal({
        visible: true,
        mensaje: "❌ Error de conexión con el servidor.",
      });
    }
  };

  /* --------------------------------------------------------
      NAVEGACIÓN
  --------------------------------------------------------- */
  const siguiente = () => {
    if (currentIndex < categorias.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const anterior = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  /* --------------------------------------------------------
      RENDER
  --------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0025] to-[#1a004d] text-white p-6 flex flex-col items-center relative">

      {/* ------------------------- MODAL ------------------------- */}
      <AnimatePresence>
        {modal.visible && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#12023a]/90 border border-[#ffb347] rounded-2xl p-6 shadow-[0_0_30px_#ffb347] max-w-sm w-full text-center"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-[#ffb347] mb-4">Atención</h2>
              <p className="text-[#d0cfff] mb-6">{modal.mensaje}</p>

              <button
                onClick={() => setModal({ visible: false, mensaje: "" })}
                className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-[#ffb347] to-[#ffcc33] text-black hover:shadow-[0_0_20px_#ffb347] transition-all"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#ffb347] mb-4 text-center">
        Votaciones Capybara Awards 2025
      </h1>

      {/* BOTÓN SALIR */}
      <button
        onClick={() => {
          sessionStorage.removeItem("username");
          window.location.href = "/login";
        }}
        className="px-6 py-3 mb-6 rounded-lg text-black font-bold bg-gradient-to-r from-[#ffb347] to-[#ffcc33] hover:shadow-[0_0_20px_#ffb347] transition-all duration-200"
      >
        Salir
      </button>

      {/* ------------------------- CONTENIDO ------------------------- */}
      <AnimatePresence mode="wait">
        {categoria && (
          <motion.div
            key={categoria._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="w-full flex flex-col items-center"
          >
            {categoria.multichoise ? (
              <VotacionesMulti
                categoria={categoria}
                seleccionActual={seleccion[categoria._id] || []}
                bloqueada={bloqueadas[categoria._id]}
                onSeleccionChange={handleSeleccion}
              />
            ) : (
              <VotacionesSingle
                categoria={categoria}
                usuario={usuario}
                seleccionActual={seleccion[categoria._id]}
                onSeleccionChange={handleSeleccion}
                bloqueada={bloqueadas[categoria._id]}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------- FOOTER ------------------------- */}
      {categoria && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0025]/80 p-4 backdrop-blur-md flex justify-center gap-6 border-t border-[#5e00ff]">
          <button
            onClick={anterior}
            disabled={currentIndex === 0}
            className={`px-5 py-3 rounded-lg font-bold bg-[#3b1c77] text-[#ffb347] transition-all ${
              currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#5e00ff]/60"
            }`}
          >
            Anterior
          </button>

          <button
            onClick={votar}
            disabled={bloqueadas[categoria._id]}
            className={`px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-[#ffb347] to-[#ffcc33] text-black transition-all ${
              bloqueadas[categoria._id]
                ? "opacity-40 cursor-not-allowed"
                : "hover:shadow-[0_0_25px_#ffb347]"
            }`}
          >
            Votar
          </button>

          <button
            onClick={siguiente}
            disabled={currentIndex >= categorias.length - 1}
            className={`px-5 py-3 rounded-lg font-bold bg-gradient-to-r from-[#ffb347] to-[#ffcc33] text-black transition-all ${
              currentIndex >= categorias.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:shadow-[0_0_25px_#ffb347]"
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
