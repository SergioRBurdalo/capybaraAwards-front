import React from 'react';

function PointConfirmModal({ candidato, puntos, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Confirmar Selección</h2>
        <p className="mb-4">
          Vas a dar <strong>{puntos} puntos</strong> a <strong>{candidato}</strong>.
        </p>
        <p className="mb-4">Este voto no se puede deshacer.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded transition duration-200 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PointConfirmModal;
