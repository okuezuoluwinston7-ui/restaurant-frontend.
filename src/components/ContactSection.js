import React from 'react';


const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-details">
              <div className="detail">
                <h2>Contact Information</h2>
                <h3>Address</h3>
                <p>Sofitel Downtown<br />Sheikh Zayed Road<br />Burj Khalifa, Dubai<br />United Arab Emirates</p>
              </div>
              <div className="detail">
                <h3>Hours</h3>
                <p>Monday - Sunday<br />12:00 PM - 11:00 PM</p>
              </div>
              <div className="detail">
                <h3>Phone</h3>
                <p>+971 4 358 1213</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
