import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Swiss Butter</h2>
            <p>Nestled in the heart of Dubai's financial district, swiss butter offers an unparalleled dining experience that combines Swiss hospitality with Arabian charm. Our restaurant overlooks the iconic Burj Khalifa, providing breathtaking views alongside exceptional cuisine.</p>
            <div className="features">
              <div className="feature">
                <h3>Swiss Excellence</h3>
                <p>Culinary expertise from Switzerland</p>
              </div>
              <div className="feature">
                <h3>Premium Location</h3>
                <p>Burj Khalifa view</p>
              </div>
              <div className="feature">
                <h3>Quality Ingredients</h3>
                <p>Fresh, locally sourced produce</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="/images/about.avif" alt="Restaurant Interior" style={{width: '100%', height: 'auto', borderRadius: '10px'}} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;