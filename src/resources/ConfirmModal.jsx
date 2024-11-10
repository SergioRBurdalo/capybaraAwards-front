import React from 'react';

function ConfirmModal({ candidato, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Confirmar Voto</h2>
        <p>¿Estás seguro de que quieres votar por <strong>{candidato}</strong>?</p>
        <p className="text-red-600 mt-2">Este voto no se podrá deshacer.</p>
        <div className="flex justify-around mt-6">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white py-2 px-4 rounded transition duration-200 hover:bg-green-600"
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white py-2 px-4 rounded transition duration-200 hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
