import React, { useState } from 'react';
import { testimonials } from '../data/menuData';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-carousel">
          <button className="carousel-btn prev" onClick={prevTestimonial}>‹</button>
          <div className="testimonial-card" style={{ width: "65%", minHeight: "16rem" }}>
            <div className="stars">
              {'★'.repeat(testimonials[currentIndex].rating)}
              {'☆'.repeat(5 - testimonials[currentIndex].rating)}
            </div>
            <p className="testimonial-comment">"{testimonials[currentIndex].comment}"</p>
            <p className="testimonial-author">- {testimonials[currentIndex].name}</p>
            <p className="testimonial-date">{testimonials[currentIndex].date}</p>
          </div>
          <button className="carousel-btn next" onClick={nextTestimonial}>›</button>
        </div>
        <div className="testimonial-indicators" >
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;