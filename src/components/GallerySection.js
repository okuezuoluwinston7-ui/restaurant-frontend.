import React from 'react';
import { galleryImages } from '../data/menuData';

const GallerySection = () => {
  return (
    <section className="gallery-section">
      <div className="container">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={image.id} className="gallery-item">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
