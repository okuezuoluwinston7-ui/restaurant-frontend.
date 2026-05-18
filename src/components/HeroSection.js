// src/components/HeroSection.js
import React, { useState, useEffect } from 'react';
// Removed unused import: import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { bg: '/images/hero-bg.avif', title: 'Exquisite Dining Experience', subtitle: 'Where Swiss elegance meets Dubai\'s skyline' },
    { bg: '/images/interior1.avif', title: 'Premium Location', subtitle: 'Overlooking the iconic Burj Khalifa' },
    { bg: '/images/wagyu.avif', title: 'Signature Cuisine', subtitle: 'Authentic Swiss-inspired dishes' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  

  // Function to scroll to the Menu section
  

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${slides[currentSlide].bg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].subtitle}</p>
          <div className="hero-stats">
            <div className="stat">
              <span>AED 100-150</span>
              <p>Per Person</p>
            </div>
            <div className="stat">
              <span>12:00 PM</span>
              <p>Opening Time</p>
            </div>
            <div className="stat">
              <span>4.8★</span>
              <p>Rating</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;