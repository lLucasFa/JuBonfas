import React, { useState } from 'react';
import './GalleryPage.css'; // Importe o arquivo de estilos CSS
import { Link } from 'react-router-dom';
import image1 from '../img/image1.jpg'; // Importe a imagem

const GalleryPage = () => {
  // Defina o estado para suas imagens
  const [images, setImages] = useState([
    { id: 1, src: image1, alt: 'Image 1' }, // Use a imagem importada diretamente
    // Adicione mais imagens conforme necessário
  ]);

  // Função para remover uma imagem da galeria
  const removeImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };

  return (
    <div className="gallery-container">
      <h1>Galeria</h1>
      <div className="image-grid">
        {images.map(image => (
          <div key={image.id} className="image-wrapper">
            <img src={image.src} alt={image.alt} />
            {/* <button onClick={() => removeImage(image.id)}>Remover</button> */}
          </div>
        ))}
      </div>
      <Link to="/">Voltar para a Página Inicial</Link>
    </div>
  );
};

export default GalleryPage;
