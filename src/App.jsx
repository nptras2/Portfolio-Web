import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Global & Layout components
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import FloatingControls from './components/FloatingControls';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';

// Custom router utility to manage scroll behavior on page changes and hashes
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // Navigated to a new page (no hash target) -> scroll instantly to top
      window.scrollTo(0, 0);
    } else {
      // Navigated with a hash target -> scroll smoothly to the element
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 150); // Small delay to let components render
      }
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  // Initialize Lenis smooth scroll globally
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollManager />
      
      {/* Global Interactive HUD Elements */}
      <PageLoader />
      <CustomCursor />
      <Navbar />
      <FloatingControls />

      {/* Main Routing Container */}
      <main className="bg-bg-primary text-white overflow-hidden min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </main>

      {/* Shared Footer */}
      <Footer />
    </Router>
  );
}

export default App;
