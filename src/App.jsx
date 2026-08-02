import React, { useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';

// Global & Layout components
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import FloatingControls from './components/FloatingControls';
import Footer from './components/Footer';

// Synchronously loaded standard sections
import HeroSection from './components/HeroSection';
import Technologies from './components/Technologies';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import WhyChooseUs from './components/WhyChooseUs';
import ReviewsSection from './components/ReviewsSection';
import AboutSection from './components/AboutSection';
import CTABanner from './components/CTABanner';
import ContactSection from './components/ContactSection';

// Lazy loaded heavy sections for optimal bundle performance
const ThemesShowcase = lazy(() => import('./components/ThemesShowcase'));
const PortfolioSection = lazy(() => import('./components/PortfolioSection'));
const RecentWorkVideos = lazy(() => import('./components/RecentWorkVideos'));

// Section loading placeholder fallback component
const SectionLoader = ({ name }) => (
  <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-3 relative py-20 bg-bg-primary">
    <div className="w-10 h-10 rounded-full border-2 border-accent-red/10 border-t-accent-red animate-spin" />
    <span className="text-[9px] uppercase font-bold tracking-widest text-text-secondary animate-pulse">
      Loading {name} Segment...
    </span>
  </div>
);

// Toggle to show/hide the Portfolio section
const SHOW_PORTFOLIO = false;
// Toggle to show/hide the Themes section
const SHOW_THEMES = false;

function App() {
  // Initialize Lenis smooth scroll inertia
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

    // Refresh scroll positions on links
    const handleAnchorScroll = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target);
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener('click', handleAnchorScroll));

    return () => {
      lenis.destroy();
      links.forEach((link) => link.removeEventListener('click', handleAnchorScroll));
    };
  }, []);

  return (
    <>
      {/* Global Interactive HUD Elements */}
      <PageLoader />
      <CustomCursor />
      <Navbar />
      <FloatingControls />

      {/* Main Structural Layout (Sequence strictly matches user instructions) */}
      <main className="bg-bg-primary text-white overflow-hidden min-h-screen">
        
        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* 2. RECENT WORK VIDEOS SECTION (Lazy Loaded - My Work) */}
        <Suspense fallback={<SectionLoader name="Recent Walkthroughs" />}>
          <RecentWorkVideos />
        </Suspense>

        {/* 3. LOGO WALL TECHNOLOGIES */}
        <Technologies />

        {/* 4. METHODOLOGY PROCESS TIMELINE */}
        <ProcessSection />

        {/* 5. SERVICES / PRICING SECTION */}
        <ServicesSection />

        {/* 6. ABOUT AGENCY PORTRAIT */}
        <AboutSection />

        {/* 7. STATISTICS / WHY CHOOSE US */}
        <WhyChooseUs />

        {/* 8. FLOATING FORM CONTACT SECTION */}
        <ContactSection />

        {/* 9. REVIEWS SECTION PLACEHOLDER */}
        <ReviewsSection />

        {/* 10. CONVERSION-FOCUSED CTA BANNER */}
        <CTABanner />
        
      </main>

      {/* Footer Matrix */}
      <Footer />
    </>
  );
}

export default App;
