import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Zap, Search, ShieldCheck, ChevronDown, ArrowRight, Play } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';

const Hero3D = lazy(() => import('./Hero3D'));

const Loader3D = () => (
  <div className="w-full h-[600px] lg:h-[750px] flex flex-col items-center justify-center gap-4 relative">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-4 border-accent-red/10" />
      <div className="absolute inset-0 rounded-full border-4 border-accent-red border-t-transparent animate-spin" />
      <div className="absolute inset-4 rounded-full border-2 border-accent-red/30 animate-pulse-slow" />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text animate-pulse font-mono">
      Initializing 3D Developer Mesh...
    </span>
  </div>
);

// Toggle to show/hide the Portfolio section
const SHOW_PORTFOLIO = false;
// Toggle to show/hide the Themes section
const SHOW_THEMES = false;

const HeroSection = () => {
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const featureCards = [
    {
      icon: <LayoutGrid className="w-4 h-4 text-accent-red" />,
      title: 'Modern Design',
    },
    {
      icon: <Zap className="w-4 h-4 text-accent-red" />,
      title: 'Fast Performance',
    },
    {
      icon: <Search className="w-4 h-4 text-accent-red" />,
      title: 'SEO Friendly',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-accent-red" />,
      title: '24/7 Support',
    },
  ];

  const baseList = [...featureCards, ...featureCards, ...featureCards];
  const marqueeItems = [...baseList, ...baseList]; // 6 sets total to ensure perfect seamless loop at -50% translate

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 18,
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen lg:h-screen lg:min-h-screen lg:max-h-screen bg-bg-primary pt-6 sm:pt-10 lg:pt-0 pb-12 lg:py-0 overflow-hidden flex flex-col justify-start lg:justify-center cyber-grid"
    >
      {/* Background visual glows - darkened for pure black feel */}
      <div className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] bg-accent-red/[0.02] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-10%] w-[600px] h-[600px] bg-accent-red/[0.02] rounded-full blur-[180px] pointer-events-none" />

      {/* Hero Core Content container: Left 40%, Right 60% (lg:grid-cols-[40%_60%]) */}
      <div className="content-container flex flex-col lg:grid lg:grid-cols-[40%_60%] gap-4 lg:gap-8 items-start lg:items-center relative z-10 w-full h-full pt-4">
        
        {/* Left Side: Copywriting exactly matching reference */}
        <motion.div
          className="text-left flex flex-col items-start gap-3 sm:gap-4 lg:gap-5 lg:pr-4 relative z-20 lg:translate-y-6 w-full pt-16 sm:pt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top red text label */}
          <motion.span 
            variants={itemVariants}
            className="text-[9px] sm:text-xs font-black uppercase tracking-[0.25em] text-accent-red font-display block"
          >
            WE DESIGN. WE CODE. WE DELIVER.
          </motion.span>

          {/* Huge bold headline with gradient highlight */}
          <motion.h1 
            variants={itemVariants}
            className="text-2xl xs:text-[1.75rem] sm:text-5xl lg:text-[3.2rem] xl:text-[3.7rem] font-black font-display text-white leading-[1.05] tracking-tight uppercase"
          >
            WE BUILD <br />
            <span 
              className="text-[#FF2B2B] font-extrabold tracking-tight block mt-1 animate-pulse-slow"
              style={{ textShadow: '0 0 8px rgba(255,43,43,0.5)' }}
            >
              DIGITAL EXPERIENCES
            </span>
            <span className="block text-xs xs:text-sm sm:text-xl lg:text-2xl text-white font-semibold mt-1 sm:mt-2.5 tracking-normal normal-case font-display">
              That Inspire & Convert
            </span>
          </motion.h1>

          {/* Paragraph copy */}
          <motion.p 
            variants={itemVariants}
            className="text-text-secondary text-[10px] xs:text-xs sm:text-sm lg:text-base font-medium leading-relaxed max-w-[340px] xs:max-w-[400px] font-sans"
          >
            Professional websites for your business with modern design, clean code and 3D experiences.
          </motion.p>

          {/* Button CTAs */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection('#services')}
              className="w-full sm:w-auto px-3 sm:px-6 py-3 rounded-full btn-primary text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,43,43,0.3)]"
            >
              View Packages
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection(SHOW_PORTFOLIO ? '#portfolio' : (SHOW_THEMES ? '#themes' : '#services'))}
              className="w-full sm:w-auto px-3 sm:px-6 py-3 rounded-full btn-secondary text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest flex items-center justify-center gap-1.5 sm:gap-2.5 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              See Our Work
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-red/20 transition-colors">
                <Play className="w-2.5 h-2.5 fill-white text-white translate-x-0.5" />
              </div>
            </button>
          </motion.div>

        </motion.div>

        {/* Character & Circle: Rendered relative below text on mobile, relative on desktop grid */}
        <motion.div
          className="relative lg:relative w-full h-[320px] xs:h-[350px] lg:h-[80vh] xl:h-[85vh] lg:max-h-[620px] overflow-visible flex items-center lg:items-end justify-center pointer-events-auto z-10 mt-6 lg:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <Suspense fallback={<Loader3D />}>
            <Hero3D />
          </Suspense>
        </motion.div>
      </div>

      {/* Minimal Feature Badges at the bottom - Desktop only */}
      <div className="absolute bottom-16 sm:bottom-20 lg:bottom-14 left-0 right-0 w-full z-20 flex justify-center lg:justify-start content-container mx-auto px-6">
        {/* Desktop View: Inline minimal row (aligned with content left edge) */}
        <div className="hidden sm:flex items-center gap-8 lg:translate-x-0">
          {featureCards.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-text-secondary hover:text-white transition-colors duration-300"
            >
              <div className="text-accent-red shrink-0 scale-95">
                {feat.icon}
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest font-display whitespace-nowrap">
                {feat.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Floating Bar: Right on desktop, horizontal bottom bar on mobile */}
      <div className="absolute lg:right-6 lg:top-[48%] lg:-translate-y-1/2 left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 bottom-16 lg:bottom-auto z-30 flex lg:flex-col flex-row items-center gap-4 lg:gap-5 p-3 px-6 lg:px-3.5 rounded-2xl border border-accent-red/25 bg-[#0a0a0a]/65 backdrop-blur-xl shadow-[0_0_20px_rgba(255,43,43,0.15)] w-max max-w-[90%] justify-center divide-x lg:divide-x-0 lg:divide-y-0 divide-white/10">
        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="p-2 px-3 lg:px-2.5 rounded-xl hover:bg-accent-red/10 text-text-secondary hover:text-[#25D366] hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.2)] transition-all duration-300">
          <FaWhatsapp className="w-5 h-5" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="pl-4 lg:pl-0 p-2 px-3 lg:px-2.5 rounded-xl hover:bg-accent-red/10 text-text-secondary hover:text-[#E1306C] hover:scale-110 hover:shadow-[0_0_15px_rgba(225,48,108,0.2)] transition-all duration-300">
          <FaInstagram className="w-5 h-5" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="pl-4 lg:pl-0 p-2 px-3 lg:px-2.5 rounded-xl hover:bg-accent-red/10 text-text-secondary hover:text-[#FF0000] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,0,0,0.2)] transition-all duration-300">
          <FaYoutube className="w-5 h-5" />
        </a>
        <a href="mailto:hello@codeluxe.dev" className="pl-4 lg:pl-0 p-2 px-3 lg:px-2.5 rounded-xl hover:bg-accent-red/10 text-text-secondary hover:text-accent-red hover:scale-110 hover:shadow-[0_0_15px_rgba(255,43,43,0.2)] transition-all duration-300">
          <FaEnvelope className="w-5 h-5" />
        </a>
      </div>

      {/* Scroll to discover helper */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-50 hover:opacity-100 transition-opacity z-20"
        onClick={() => scrollToSection('#about')}
      >
        <span className="text-[9px] uppercase font-black tracking-widest text-text-secondary">SCROLL TO DISCOVER</span>
        <ChevronDown className="w-4 h-4 text-accent-red animate-bounce" />
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
