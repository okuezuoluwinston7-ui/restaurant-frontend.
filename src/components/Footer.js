import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Swiss Butter</h3>
            <p>Exquisite dining experience with Swiss elegance in the heart of Dubai.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>Sheikh Zayed Road, Burj Khalifa<br />Dubai, UAE</p>
            <p>+971 4 358 1213</p>
            <p>swissbutter4@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Swiss Butter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;