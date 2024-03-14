import React from 'react';

const PhotoGallery = ({ imagePath }) => {
  return (
    <div className="photo-gallery">
      <img src={process.env.PUBLIC_URL + imagePath} alt="Gallery" />
    </div>
  );
};

export default PhotoGallery;
