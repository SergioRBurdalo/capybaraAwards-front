import '../App.css';
import { useState, useEffect } from 'react';
import imagenCategoria from '../assets/carpincho.png';
import ModalCandidatos from './modalCandidatos';  // Importa el nuevo componente

function Candidatos() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaColors, setCategoriaColors] = useState({});
  const [flipped, setFlipped] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState(null); 
  const [selectedCategoriaTitulo, setSelectedCategoriaTitulo] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', porque: '', otroNombre: '' });

  const pastelColors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D4C4FB', '#FFCBA4',
    '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FF9AA2', '#FFB7B2', '#FFDAC1',
    '#E2F0CB', '#B4A7D6', '#F9CB9C', '#F6A192', '#FFD1D1', '#FDE2E2', '#A2D2FF',
    '#CAF0F8', '#ADE8F4', '#BDE0FE', '#A7BED3', '#C6E2E9', '#F5F7B2', '#F3C8C8',
    '#FFCCCB', '#FFEBBB', '#D6A2E8', '#FFD166', '#FFD700', '#C0C0C0', '#D1C4E9',
    '#C8E6C9', '#F8BBD0', '#F48FB1', '#FFCC80', '#FFAB91', '#B39DDB', '#90CAF9',
    '#E0F7FA', '#C5CAE9', '#F4E1D2', '#F3D6D5', '#E0BBE4', '#D5C6E0', '#D0E6A5'
  ];

  // Hacer la llamada GET al backend para obtener las categorías
  useEffect(() => {
    // fetch('https://capybara-awards-back.vercel.app/getCategorias')  // Reemplaza con la URL de tu backend
    fetch('http://localhost:4001/getCategorias')  // Reemplaza con la URL de tu backend
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
        sessionStorage.setItem('categorias', JSON.stringify(data));  // Guardar en sessionStorage
        generateRandomColors(data);  // Genera colores aleatorios para las categorías
      })
      .catch((error) => console.error('Error al obtener las categorías:', error));
  }, []);

  const generateRandomColors = (categorias) => {
    const colors = {};
    categorias.forEach((categoria) => {
      colors[categoria._id] = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    });
    setCategoriaColors(colors);
  };

  const handleFlip = (index) => {
    setFlipped((prevState) => ({
      ...prevState,
      [index]: !prevState[index],  // Cambia el estado de la tarjeta específica
    }));
  };

  const openModal = (id, titulo) => {
    setSelectedCategoriaId(id);
    setSelectedCategoriaTitulo(titulo);  // Almacenar el id de la categoría seleccionada
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Restablecer formData cuando el modal se cierra
    setFormData({ nombre: '', porque: '', otroNombre: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {

  // Preparar los datos para enviarlos al backend
  const payload = {
    categoriaId: selectedCategoriaId,
    candidato: formData.nombre,
    nombreOtro: formData.nombre === 'Otro' ? formData.otroNombre : '',  // Solo si es "Otro".
    usuario: sessionStorage.getItem('username'),  // Aquí puedes cambiar el usuario por uno real si lo tienes.
  };

  // Enviar los datos al backend mediante una solicitud POST
  fetch('http://localhost:4001/guardarCandidato', {  // Cambia la URL por tu endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  .then(response => response.json())
  .then((data) => {
    alert('Voto enviado correctamente');
    closeModal();  // Cerrar el modal después de enviar
  })
  .catch((error) => {
    console.error('Error al enviar el voto:', error);
    alert('Hubo un error al enviar el voto');
  });
};

  return (
    <div className="container">
      <br />

      <a href="https://www.youtube.com/watch?v=MoD-GSib4wY&ab_channel=Cat_Monch" target="_blank" rel="noopener noreferrer">
        <img src={imagenCategoria} alt="Imagen de categoría" className="imagen-categorias" />
      </a>

      <div className="categorias-grid">
        {categorias.length > 0 ? (
            categorias.map((categoria, index) => (
            <div
                key={categoria._id}
                className={`categoria-tarjeta ${flipped[index] ? 'flipped' : ''}`}
                onClick={() => handleFlip(index)}
            >
                <div className="card-front" style={{ backgroundColor: categoriaColors[categoria._id] }}>
                {/* Muestra el número de la categoría seguido del título */}
                <h2>{index + 1}.<br/> {categoria.titulo}</h2>
                </div>
                <div className="card-back" style={{ backgroundColor: categoriaColors[categoria._id] }}>
                <p>{categoria.descripcion}</p>
                <button onClick={() => openModal(categoria._id, categoria.titulo)} className="logButton">Proponer Candidato</button>
                </div>
            </div>
            ))
        ) : (
          <p>Cargando categorías...</p>
        )}
      </div>

      {showModal && (
        <ModalCandidatos
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          categoriaId={selectedCategoriaId}
          titulo={selectedCategoriaTitulo}  // Pasar el id de la categoría al modal
        />
      )}

      <br />
      <div className='powerby'>Designed by 🍋</div>
      <br /><br /><br />
      <br />
    </div>
  );
}

export default Candidatos;
