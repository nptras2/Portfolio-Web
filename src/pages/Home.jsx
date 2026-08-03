import React, { Suspense, lazy } from 'react';

// Synchronously loaded standard sections
import HeroSection from '../components/HeroSection';
import Technologies from '../components/Technologies';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ReviewsSection from '../components/ReviewsSection';
import AboutSection from '../components/AboutSection';
import CTABanner from '../components/CTABanner';
import ContactSection from '../components/ContactSection';

// Lazy loaded heavy sections for optimal bundle performance
const RecentWorkVideos = lazy(() => import('../components/RecentWorkVideos'));

// Section loading placeholder fallback component
const SectionLoader = ({ name }) => (
  <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-3 relative py-20 bg-bg-primary">
    <div className="w-10 h-10 rounded-full border-2 border-accent-red/10 border-t-accent-red animate-spin" />
    <span className="text-[9px] uppercase font-bold tracking-widest text-text-secondary animate-pulse">
      Loading {name} Segment...
    </span>
  </div>
);

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default React.memo(Home);
