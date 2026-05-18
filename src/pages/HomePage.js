import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
// Import other sections you want on the home page
// import MenuSection from '../components/MenuSection'; // Maybe just a preview
import TestimonialsSection from '../components/TestimonialsSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      {/* Maybe just a teaser or link to full menu <MenuSectionPreview /> */}
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
};

export default HomePage;