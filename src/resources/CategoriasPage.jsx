import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [selected, setSelected] = useState(null);
  const [candidato, setCandidato] = useState("");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const usuario = sessionStorage.getItem("username") || "Anónimo";

  useEffect(() => {
    fetch("http://localhost:4001/getCategorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!candidato.trim() || !motivo.trim()) return;

    setLoading(true);
    setMensaje("");

    try {
      const res = await fetch("http://localhost:4001/agregarCandidato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoriaId: selected._id,
          candidato,
          motivo,
          usuario,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("✅ Candidato añadido correctamente");
        setCandidato("");
        setMotivo("");
        setTimeout(() => {
          setSelected(null);
          setMensaje("");
        }, 1500);
      } else {
        setMensaje(data.message || "Error al guardar el candidato.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMensaje("❌ No se pudo conectar con el servidor.");
    }

    setLoading(false);
  };

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    window.location.href = "/login"; // redirige al login
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0025] to-[#1a004d] text-white p-6 flex flex-col items-center justify-between">
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-[#ffb347] mb-10 text-center">
        Categorías Capybara Awards 2025
      </h1>

      {/* GRID DE CATEGORÍAS */}
      <div className="grid gap-6 w-full max-w-5xl sm:grid-cols-2 md:grid-cols-3">
        {categorias.map((cat) => (
          <motion.div
            key={cat._id}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px #ffb347",
              rotateY: 10,
            }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-[#1b0052]/80 border border-[#5e00ff] rounded-xl p-5 cursor-pointer shadow-[0_0_20px_#5e00ff] transition-all"
            onClick={() => setSelected(cat)}
          >
            <h2 className="text-xl font-bold text-[#ffb347] mb-2">
              {cat.nombre || cat.titulo}
            </h2>
            <p className="text-sm text-[#d0cfff]">
              {cat.descripcion || "Sin descripción"}
            </p>
          </motion.div>
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

      {/* MODAL PORTAL 3D */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 perspective-[2000px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalPortal3D
              selected={selected}
              candidato={candidato}
              motivo={motivo}
              loading={loading}
              mensaje={mensaje}
              setCandidato={setCandidato}
              setMotivo={setMotivo}
              setSelected={setSelected}
              handleVote={handleVote}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------------------------------
   MODAL PORTAL 3D: entrada cinematográfica mejorada
---------------------------------------------------- */
function ModalPortal3D({
  selected,
  candidato,
  motivo,
  loading,
  mensaje,
  setCandidato,
  setMotivo,
  setSelected,
  handleVote,
}) {
  const randomPosition = React.useMemo(() => {
    const positions = [
      { top: "-60px", left: "50%", translate: "-50%, 0" },
      { top: "50%", left: "-80px", translate: "0, -50%" },
      { top: "50%", right: "-80px", translate: "0, -50%" },
      { bottom: "-60px", left: "50%", translate: "-50%, 0" },
      { top: "-40px", right: "-40px", translate: "0, 0" },
      { bottom: "-40px", left: "-40px", translate: "0, 0" },
    ];
    return positions[Math.floor(Math.random() * positions.length)];
  }, [selected]);

  return (
    <motion.div
      className="relative bg-[#12023a]/90 border border-[#5e00ff] rounded-2xl overflow-hidden p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl shadow-[0_0_60px_#5e00ff]"
      initial={{ rotateY: 120, scale: 0.4, opacity: 0 }}
      animate={{
        rotateY: 0,
        scale: 1,
        opacity: 1,
        transition: { type: 'spring', stiffness: 120, damping: 12 },
      }}
      exit={{
        rotateY: -90,
        scale: 0.6,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* ⚡ EFECTO NEÓN PULSANTE */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 20px #5e00ff",
            "0 0 40px #ffb347",
            "0 0 60px #ffcc33",
            "0 0 30px #5e00ff",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      />

      {/* 🔆 HALO EXTERIOR CON MOVIMIENTO SUAVE */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#ffb347] to-[#ffcc33] opacity-80 blur-xl"
        style={{
          top: randomPosition.top,
          bottom: randomPosition.bottom,
          left: randomPosition.left,
          right: randomPosition.right,
          transform: `translate(${randomPosition.translate})`,
        }}
        animate={{
          y: [0, -15, 0, 15, 0],
          x: [0, 10, 0, -10, 0],
          scale: [1, 1.05, 1, 0.95, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      />

      {/* ✨ PARTÍCULAS EXPLOSIVAS AL ABRIR */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#ffcc33]"
          initial={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
          }}
          transition={{ duration: 1.6, delay: i * 0.1 }}
        />
      ))}

      {/* CONTENIDO */}
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#ffb347] mb-4 mt-4">
          {selected.nombre || selected.titulo}
        </h2>
        <p className="text-sm sm:text-base text-[#c2bfff] mb-6 text-center">
          {selected.descripcion}
        </p>

        <form onSubmit={handleVote} className="space-y-4">
          <div>
            <label className="block text-[#a9a9ff] mb-2 font-medium">
              Nombre del candidato
            </label>
            <input
              type="text"
              value={candidato}
              onChange={(e) => setCandidato(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1b0052] text-white border border-[#5e00ff] focus:ring-2 focus:ring-[#ffb347] outline-none"
              placeholder="Ej. 🍋🍋🍋🍋"
              required
            />
          </div>

          <div>
            <label className="block text-[#a9a9ff] mb-2 font-medium">
              Motivo de la nominación
            </label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1b0052] text-white border border-[#5e00ff] focus:ring-2 focus:ring-[#ffb347] outline-none resize-none"
              placeholder="¿Por qué merece ganar?"
              rows="3"
              required
            />
          </div>

          {mensaje && (
            <motion.p
              className="text-center font-semibold text-[#ffb347]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {mensaje}
            </motion.p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="flex-1 py-3 rounded-lg bg-[#3b1c77] text-[#ffb347] font-bold hover:bg-[#5e00ff]/70 transition-all"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-bold text-black bg-gradient-to-r from-[#ffb347] to-[#ffcc33] transition-all duration-200 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-[0_0_25px_#ffb347]"
              }`}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
