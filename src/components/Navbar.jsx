import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

// Toggle to show/hide the Portfolio section and nav item
const SHOW_PORTFOLIO = false;
// Toggle to show/hide the Themes section and nav item
const SHOW_THEMES = false;

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Services', href: '#services' },
  ...(SHOW_THEMES ? [{ label: 'Themes', href: '#themes' }] : []),
  ...(SHOW_PORTFOLIO ? [{ label: 'Portfolio', href: '#portfolio' }] : []),
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Cache element references to prevent DOM query overhead on every scroll frame
    const elementCache = {};

    const handleScroll = () => {
      // 1. Scrolled state styling
      setIsScrolled(window.scrollY > 20);

      // 2. Scroll spy calculation
      let currentSection = 'home';
      let minDistance = Infinity;

      navItems.forEach((item) => {
        let el = elementCache[item.href];
        if (!el) {
          el = document.querySelector(item.href);
          if (el) elementCache[item.href] = el;
        }
        
        if (el) {
          const rect = el.getBoundingClientRect();
          const topOffset = rect.top;
          const bottomOffset = rect.bottom;

          // If the section occupies the upper-middle region of the screen
          if (topOffset < window.innerHeight * 0.45 && bottomOffset > 100) {
            const distance = Math.abs(topOffset);
            if (distance < minDistance) {
              minDistance = distance;
              currentSection = item.href.slice(1);
            }
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Periodically sync scroll state to account for lazy-loaded sections loading later
    const intervalId = setInterval(handleScroll, 500);
    const timeoutId = setTimeout(() => clearInterval(intervalId), 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'py-3 lg:py-4 bg-bg-primary/75 backdrop-blur-xl border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.9)]'
            : 'py-4 lg:py-7 bg-transparent border-transparent'
        }`}
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="content-container flex items-center justify-between">
          
          {/* Logo with futuristic cyber bullet */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-2.5 group relative"
          >
            <span className="text-2xl font-black tracking-widest text-white uppercase font-sans">
              CODE<span className="text-accent-red group-hover:text-white transition-colors duration-300">LUXE</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-accent-red animate-cyber-pulse" />
          </a>

          {/* Spacing adjusted nav items for desktop */}
          <nav className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'text-accent-red'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.span
                    className="absolute -bottom-2.5 left-0 right-0 h-[2px] bg-accent-red shadow-[0_0_8px_#FF2B2B]"
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Premium Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-6 py-2.5 rounded-full btn-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-accent-red/20 border border-accent-red/20 hover:border-accent-red/50 hover:shadow-accent-red/40"
            >
              Get in Touch
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Premium Custom Mobile Menu Button (Futuristic Glowing Mouse Icon) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-12 h-12 rounded-2xl border border-accent-red/35 bg-[#0a0a0a]/65 backdrop-blur-xl shadow-[0_0_15px_rgba(255,43,43,0.2)] flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-accent-red/60 hover:shadow-[0_0_20px_rgba(255,43,43,0.45)] group cursor-pointer active:scale-95 z-50"
            aria-label="Toggle menu"
          >
            {/* Ambient inner glow */}
            <span className="absolute inset-0 bg-gradient-to-tr from-accent-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Custom Cyber Mouse Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="z-10 filter drop-shadow-[0_0_4px_rgba(255,43,43,0.6)]">
              {/* Mouse body */}
              <rect x="6" y="2" width="12" height="20" rx="6" stroke="#FF2B2B" strokeWidth="2" />
              {/* Click divider */}
              <line x1="12" y1="2" x2="12" y2="9" stroke="#FF2B2B" strokeWidth="1.5" />
              {/* Scroll wheel (glowing white, animating scroll action) */}
              <motion.rect 
                x="11" 
                y="5" 
                width="2" 
                height="4" 
                rx="1" 
                fill="#FFFFFF" 
                className="shadow-[0_0_8px_#FFF]"
                animate={{ y: [5, 8, 5] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu & Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark blurred background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Menu Drawer */}
            <motion.div
              className="fixed inset-y-0 right-0 w-full sm:w-[380px] bg-bg-primary/95 backdrop-blur-2xl border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.95)] z-40 flex flex-col justify-center items-center lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Scanline overlay for cyber effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
              <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent-red/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="flex flex-col gap-6 text-center z-10 w-full px-8">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`text-xl font-bold uppercase tracking-widest transition-colors py-2 relative block group ${
                      activeSection === item.href.slice(1) 
                        ? 'text-accent-red glow-text' 
                        : 'text-text-secondary hover:text-white'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, ease: 'easeOut' }}
                  >
                    {item.label}
                    {/* Hover indicator line */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent-red group-hover:w-16 transition-all duration-300" />
                  </motion.a>
                ))}
                
                <motion.a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="mt-8 px-8 py-3.5 rounded-full btn-primary text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,43,43,0.4)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05, ease: 'easeOut' }}
                >
                  Let's Build
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Navbar);
