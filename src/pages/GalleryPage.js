import React, { useState, useEffect, useMemo } from 'react';

const GalleryPage = () => {
  // State to hold the list of images
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useMemo to ensure staticImagePaths is calculated only once
  const staticImagePaths = useMemo(() => [
    '/images/salmon.avif',
    '/images/arancin.avif',
    '/images/cocktail.jpg',
    '/images/bar1.avif',
    '/images/food1.avif',
    '/images/interior1.avif',
    '/images/hero-bg.avif',
    '/images/wagyu.avif',
    // Add more image paths here as needed
  ], []); // Empty dependency array for useMemo means calculate once

  useEffect(() => {
    // Simulate fetching images (replace with actual API call if needed)
    // Or just use the static list defined above
    try {
      // Example API call (uncomment and adapt if fetching from backend):
      /*
      const fetchImages = async () => {
        const response = await fetch('/api/media/gallery-images'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        const data = await response.json();
        setImages(data.images); // Assuming API returns { images: [...] }
      };
      fetchImages();
      */

      // For now, use the static list defined above
      setImages(staticImagePaths);
    } catch (err) {
      setError(err.message);
      console.error("Gallery loading error:", err);
    } finally {
      setLoading(false);
    }
  }, [staticImagePaths]); // Include the memoized staticImagePaths as a dependency

  if (loading) {
    return <div className="gallery-page">Loading gallery...</div>;
  }

  if (error) {
    return <div className="gallery-page">Error loading gallery: {error}</div>;
  }

  return (
    <div className="gallery-page">
      <div className="container">
        <h1>Photo Gallery</h1>
        {images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((src, index) => (
              <div key={index} className="gallery-item">
                <img
                  src={src}
                  alt={`Gallery item ${index + 1}`} // Provide better alt text if possible
                  loading="lazy" // Improve performance for images below the fold
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No images available in the gallery.</p>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;