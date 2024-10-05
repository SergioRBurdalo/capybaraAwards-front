import '../App.css';
import { useState, useEffect } from 'react';
import imagenCategoria from '../assets/carpincho.png';  // Asegúrate de que la ruta sea correcta

function Candidatos() {
  const [categorias, setCategorias] = useState([]);
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
    fetch('https://capybara-awards-back.vercel.app/getCategorias')  // Reemplaza con la URL de tu backend
      .then((response) => response.json())
      .then((data) => setCategorias(data))  // Guardar las categorías obtenidas
      .catch((error) => console.error('Error al obtener las categorías:', error));
  }, []);

  // Obtener un color aleatorio
  const getRandomColor = () => {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  };

  return (
    <div className="container">
      {/* Imagen antes de las categorías */}
      <br />

        <a href="https://www.youtube.com/watch?v=MoD-GSib4wY&ab_channel=Cat_Monch" target="_blank" rel="noopener noreferrer">
            <img src={imagenCategoria} alt="Imagen de categoría" className="imagen-categorias" />
        </a>
        <div className="categorias-grid">
        {categorias.length > 0 ? (
            categorias.map((categoria) => {
            const randomColor = getRandomColor();  // Color aleatorio para el frente

            return (
            <div key={categoria._id} className="categoria-tarjeta">
                <div className="card-front" style={{ backgroundColor: randomColor }}>
                    <h2>{categoria.titulo}</h2>
                </div>
                <div className="card-back" style={{ backgroundColor: randomColor }}>
                  <p>Descripción de {categoria.titulo}</p>  {/* Aquí puedes cambiar por la descripción real */}
                </div>
                </div>
            );
            })
        ) : (
            <p>Cargando categorías...</p>
        )}
      </div>
      <br />
      <br />
      <button onClick={() => alert('Comenzar')} className="logButton">Comenzar</button>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Candidatos;
