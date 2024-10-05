import React from 'react';

function ModalCandidatos({ formData, handleInputChange, handleSubmit, closeModal, categoriaId, titulo}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Propón candidato para la categoría "{titulo}"</h2> {/* Muestra el id de la categoría */}
        
        <select
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          className=''
        >
          <option value="" disabled>Selecciona tu candidato</option>
          <option value="Limon">Limon</option>
          <option value="Ana">Ana</option>
          <option value="Fanny">Fanny</option>
          <option value="Judith">Judith</option>
          <option value="Laura">Laura</option>
          <option value="Maria">Maria</option>
          <option value="Raquel">Raquel</option>
          <option value="Carlos">Carlos</option>
          <option value="Adri">Adri</option>
          <option value="Buyi">Buyi</option>
          <option value="Chavi">Chavi</option>
          <option value="Dani">Dani</option>
          <option value="Robert">Robert</option>
          <option value="Rojas">Rojas</option>
          <option value="Otro">Otro</option>
        </select>
        
        {/* Si el valor seleccionado es "Otro", mostramos un campo adicional */}
        {formData.nombre === 'Otro' && (
          <input
            type="text"
            name="otroNombre"
            placeholder="Escribe el candidato"
            value={formData.otroNombre || ''}  // Para evitar un warning en caso de que no exista
            onChange={handleInputChange}
          />
        )}
        
        <input
          type="text"
          name="porque"
          placeholder="¿Por qué?"
          value={formData.porque}
          onChange={handleInputChange}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit} className="logButton">Enviar</button>
          <button onClick={closeModal} className="logButtonClose">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCandidatos;
