import React, { useState } from 'react';

function ModalCandidatos({ formData, handleInputChange, handleSubmit, closeModal, categoriaId, titulo }) {
  const [touchedFields, setTouchedFields] = useState({ nombre: false, porque: false, otroNombre: false });

  // Verificar si el botón de enviar debe estar deshabilitado
  const isSubmitDisabled = () => {
    const nombreValido = formData.nombre && formData.nombre.trim() !== '';
    const porqueValido = formData.porque && formData.porque.trim() !== '';
    return !(nombreValido && porqueValido);
  };

  // Manejar el campo tocado para mostrar errores
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Propón candidato para la categoría "{titulo}"</h2> {/* Muestra el id de la categoría */}
        
        <select
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          onBlur={handleBlur}  // Marca el campo como tocado al perder el foco
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
          <>
            <input
              type="text"
              name="otroNombre"
              placeholder="Escribe el candidato"
              value={formData.otroNombre || ''}  // Para evitar un warning en caso de que no exista
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {touchedFields.otroNombre && !formData.otroNombre && (
              <p className="error-text">El campo de candidato es obligatorio.</p>
            )}
          </>
        )}

        {/* Mostrar mensaje de error si el nombre no ha sido seleccionado */}
        {touchedFields.nombre && !formData.nombre && (
          <p className="error-text">El candidato es obligatorio.</p>
        )}
        
        <input
          type="text"
          name="porque"
          placeholder="¿Por qué?"
          value={formData.porque}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        {/* Mostrar mensaje de error si el campo "porque" está vacío */}
        {touchedFields.porque && !formData.porque && (
          <p className="error-text">Explica el motivo de tu voto.</p>
        )}

        <div className="modal-actions">
          <button 
            onClick={handleSubmit} 
            className="logButton"
            disabled={isSubmitDisabled()}  // Deshabilitar si no están completos
          >
            Enviar
          </button>
          <button onClick={closeModal} className="logButtonClose">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCandidatos;
