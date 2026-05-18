// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom'; // Add Navigate if needed
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; // Create this component containing Hero, About, etc.
import MenuPage from './pages/MenuPage'; // Create this component for the menu
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ReservationPage from './pages/ReservationPage'; // Create this
import ContactPage from './pages/ContactPage'; // Create this
import GalleryPage from './pages/GalleryPage'; // Create this
import NotFoundPage from './pages/NotFoundPage'; // Create this for 404s
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Header will appear on all pages */}
        <main> {/* Wrap main content to separate from header/footer */}
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<HomePage />} />

            {/* Standalone Pages */}
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/track-order" element={<OrderTrackingPage />} />

            {/* Redirect old "/" with sections to new home page if needed */}
            {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}

            {/* 404 Page - Must be last */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer /> {/* Footer will appear on all pages */}
      </div>
    </Router>
  );
}

export default App;
