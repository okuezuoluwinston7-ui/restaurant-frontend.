// frontend/src/pages/ContactPage.js
import React from 'react';
// Import a dedicated contact form component if you have one
// import ContactForm from '../components/ContactForm';
import ContactSection from '../components/ContactSection'; // Use existing section

const ContactPage = () => {
  return (
    <div id="contact"> {/* Add id if header link scrolls */}
      <div className="container">
        <ContactSection /> {/* Or use a simpler ContactForm component */}
      </div>
    </div>
  );
};

export default ContactPage;
