import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Smartphone, Monitor, CheckCircle, ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';

const themesData = [
  {
    id: 1,
    title: 'AetherFlow',
    category: 'Creative Portfolio',
    desc: 'Deep black aesthetic with organic liquid red gradients and luxury typography designed for agencies and high-end designers.',
    features: ['Custom liquid blob animations', 'Fluid layout transitions', 'Premium dark luxury design system', 'Interactive case studies'],
    color: 'from-[#FF2B2B]/20 to-[#B30000]/5',
    borderColor: 'rgba(255, 43, 43, 0.3)',
    renderPreview: () => (
      <div className="w-full h-full bg-bg-secondary relative overflow-hidden p-6 flex flex-col justify-between select-none">
        <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-accent-red/20 blur-2xl animate-pulse" />
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <span className="text-[10px] font-black uppercase text-white font-sans tracking-widest">AETHER</span>
          <span className="text-[8px] font-bold text-accent-red tracking-widest">STUDIO</span>
        </div>
        <div className="my-auto text-left gap-2 flex flex-col">
          <h4 className="text-base font-black uppercase text-white tracking-wide leading-tight font-display">
            We Craft <br /><span className="text-accent-red">Artistic</span> Code.
          </h4>
          <p className="text-[10px] text-text-secondary leading-relaxed font-sans">Premium luxury aesthetics for forward-thinking creative portfolios.</p>
        </div>
        <div className="flex gap-2">
          <div className="w-16 h-5 rounded-full bg-accent-red/20 border border-accent-red/35 flex items-center justify-center text-[8px] text-white font-bold font-sans">PROJECTS</div>
          <div className="w-16 h-5 rounded-full bg-white/5 flex items-center justify-center text-[8px] text-white font-bold font-sans">ABOUT</div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'QuantumDash',
    category: 'High-Tech SaaS Dashboard',
    desc: 'Cyberpunk analytic display with neon grids, clean charts, and glowing widgets designed for next-gen data tools and software.',
    features: ['Real-time interactive SVG line graphs', 'Futuristic grid overlay system', 'Highly optimized modular widgets', 'Cyberpunk dark mode UI'],
    color: 'from-[#FF2B2B]/20 to-transparent',
    borderColor: 'rgba(255, 43, 43, 0.2)',
    renderPreview: () => (
      <div className="w-full h-full bg-bg-secondary relative overflow-hidden p-5 flex flex-col justify-between cyber-grid select-none">
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-[10px] font-black text-accent-red font-mono tracking-wider">&gt;_ QUANTUM</span>
          <span className="text-[8px] text-[#25d366] font-mono font-bold">STATUS: ACTIVE</span>
        </div>
        {/* Mock Chart */}
        <div className="my-auto flex flex-col gap-1 text-left">
          <span className="text-[9px] uppercase tracking-widest text-text-secondary font-display font-semibold">SYSTEM OVERVIEW</span>
          <span className="text-lg font-black text-white leading-none">4.2 TB/s</span>
          <svg className="w-full h-14 stroke-accent-red stroke-[1.8] fill-none mt-1.5">
            <path d="M0 45 Q 25 15, 50 35 T 100 15 T 150 40 T 200 20 T 240 45" />
            <path d="M0 45 Q 25 15, 50 35 T 100 15 T 150 40 T 200 20 T 240 45" className="opacity-30 blur-[2px]" />
          </svg>
        </div>
        <div className="flex items-center justify-between text-[8px] text-text-secondary font-mono border-t border-white/5 pt-2">
          <span>LATENCY: 12ms</span>
          <span>UPTIME: 99.9%</span>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'CyberVibe',
    category: 'Web3 & Cryptography',
    desc: 'Immersive interface featuring floating isometric grids, custom shaders, and cryptographic layouts for block chains, dApps, and NFTs.',
    features: ['3D rotating glowing token widget', 'Holographic asset preview', 'Web3 wallet connector layouts', 'Responsive cryptography cards'],
    color: 'from-accent-red/25 to-[#B30000]/10',
    borderColor: 'rgba(255, 43, 43, 0.4)',
    renderPreview: () => (
      <div className="w-full h-full bg-[#050505] relative overflow-hidden p-6 flex flex-col justify-between select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-red/10 rounded-full blur-2xl" />
        <div className="flex justify-between items-center">
          <div className="w-5 h-5 rounded-lg bg-accent-red/25 border border-accent-red flex items-center justify-center text-[10px] text-white font-bold font-mono">𝛗</div>
          <span className="text-[9px] font-extrabold text-white bg-white/5 px-3 py-1 rounded-full border border-white/10 font-display">CONNECT WALLET</span>
        </div>
        {/* Isometric Box */}
        <div className="my-auto flex flex-col items-center gap-2">
          <div className="w-11 h-11 border border-accent-red rotate-[45deg] flex items-center justify-center relative animate-spin-slow">
            <div className="absolute w-7 h-7 border border-accent-red/40" />
            <div className="w-3.5 h-3.5 bg-accent-red" />
          </div>
          <span className="text-[10px] text-white font-mono tracking-widest font-bold uppercase">META_TOKEN</span>
        </div>
        <div className="text-center text-[8px] text-text-secondary font-mono">
          0x1F7A...C849 • NETWORK: MAINNET
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: 'VortexCommerce',
    category: 'Luxury E-Commerce',
    desc: 'Ultra-modern e-commerce showcase featuring minimal product focus, glowing cart slide-overs, and premium filters for luxurious brands.',
    features: ['Luxury animated checkout drawers', 'Minimalist grid structure', 'Premium search and filtering widgets', 'Fast cart micro-interactions'],
    color: 'from-[#FF2B2B]/20 to-transparent',
    borderColor: 'rgba(255, 43, 43, 0.25)',
    renderPreview: () => (
      <div className="w-full h-full bg-bg-secondary relative overflow-hidden p-6 flex flex-col justify-between select-none">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-black uppercase tracking-widest text-white font-display">VORTEX</span>
          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] text-white cursor-pointer hover:border-accent-red">🛒</div>
        </div>
        {/* Product card */}
        <div className="my-auto p-4 rounded-2xl bg-white/2 border border-white/5 flex gap-3.5 items-center text-left">
          <div className="w-11 h-11 bg-accent-red/10 border border-accent-red/20 rounded-xl flex items-center justify-center font-black text-accent-red text-xs font-display">VX</div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-extrabold text-white uppercase font-display">Aero-Chrono Watch</span>
            <span className="text-[9px] text-accent-red font-mono font-bold">₹45,000</span>
          </div>
        </div>
        <div className="w-full py-2.5 rounded-xl bg-accent-red hover:bg-accent-dark text-[9px] text-white font-black tracking-widest text-center uppercase font-display">
          ADD TO CART
        </div>
      </div>
    )
  }
];

const ThemeCard = ({ theme, onClick }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Increased rotation angles to make 3D tilt more noticeable (up to 15 degrees)
    const rotateX = ((y / rect.height) - 0.5) * -16;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(theme)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.15s ease-out, border-color 0.4s, box-shadow 0.4s',
        borderColor: theme.borderColor,
      }}
      className="w-[300px] sm:w-[370px] h-[400px] sm:h-[480px] rounded-[32px] border bg-white/2 backdrop-blur-md p-6 flex flex-col justify-between group cursor-pointer hover:bg-white/4 relative overflow-hidden transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.color} opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none`} />

      {/* Embedded Visual Webpage component */}
      <div className="w-full h-[55%] rounded-2xl overflow-hidden border border-white/5 relative bg-black shadow-inner">
        {theme.renderPreview()}
        {/* Fullscreen hover overlay icon */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 z-10">
          <div className="w-12 h-12 rounded-full bg-accent-red text-white flex items-center justify-center shadow-lg shadow-accent-red/30 scale-75 group-hover:scale-100 transition-all duration-300">
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="text-left mt-5 z-10">
        <span className="text-[10px] uppercase font-black tracking-widest text-accent-red block mb-1.5 font-display">
          {theme.category}
        </span>
        <h3 className="text-xl font-black uppercase text-white tracking-wide font-display group-hover:text-accent-red transition-colors duration-300">
          {theme.title}
        </h3>
        <p className="text-text-secondary text-xs mt-2.5 line-clamp-2 leading-relaxed font-sans">
          {theme.desc}
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex justify-between items-center z-10 pt-4 border-t border-white/5">
        <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary font-display">
          Premium Design
        </span>
        <span className="text-[10px] uppercase font-black tracking-widest text-accent-red flex items-center gap-1.5 group-hover:translate-x-1 transition-transform font-display">
          Explore Detail
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};

const ThemesShowcase = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [previewViewport, setPreviewViewport] = useState('desktop');

  return (
    <section 
      id="themes" 
      className="py-14 md:py-32 bg-bg-secondary border-b border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-accent-red/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container mb-20 text-center relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text block mb-3 font-display">
          EXCLUSIVE RELEASES
        </span>
        <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
          Explore Our Premium Themes
        </h2>
        <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed font-sans">
          Stunning pre-designed layouts featuring ultra-smooth mechanics. Click any theme to explore its layout features.
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="w-full relative px-6 z-10">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView="auto"
          loop={true}
          speed={3200}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="swiper-container"
        >
          {themesData.map((theme) => (
            <SwiperSlide key={theme.id} style={{ width: 'auto' }}>
              <ThemeCard theme={theme} onClick={setSelectedTheme} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Fullscreen Preview Modal Drawer */}
      <AnimatePresence>
        {selectedTheme && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Body */}
            <motion.div
              className="bg-bg-primary border border-white/10 rounded-[36px] w-full max-w-6xl h-[88vh] flex flex-col justify-between overflow-hidden shadow-2xl relative"
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            >
              {/* Modal Header */}
              <div className="p-6 sm:px-8 border-b border-white/5 flex justify-between items-center bg-bg-secondary">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-black text-accent-red tracking-widest font-display">{selectedTheme.category}</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display">{selectedTheme.title}</h3>
                </div>
                
                {/* Viewport controls & close */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex bg-white/5 rounded-xl p-1.5 border border-white/5">
                    <button
                      onClick={() => setPreviewViewport('desktop')}
                      className={`p-2.5 rounded-lg transition-colors cursor-pointer ${previewViewport === 'desktop' ? 'bg-accent-red text-white' : 'text-text-secondary hover:text-white'}`}
                      aria-label="Desktop Preview"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewViewport('mobile')}
                      className={`p-2.5 rounded-lg transition-colors cursor-pointer ${previewViewport === 'mobile' ? 'bg-accent-red text-white' : 'text-text-secondary hover:text-white'}`}
                      aria-label="Mobile Preview"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedTheme(null)}
                    className="p-3 border border-white/10 hover:border-accent-red rounded-full text-text-secondary hover:text-white transition-all bg-white/2 cursor-pointer hover:scale-105 active:scale-95"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal content body */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-y-auto">
                
                {/* Visual Viewport Screen Preview */}
                <div className="lg:col-span-2 bg-[#030305] p-6 sm:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 relative">
                  <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,43,43,0.02)_0%,transparent_60%] pointer-events-none" />
                  
                  {/* Screen frame */}
                  <motion.div
                    layout
                    className={`border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative bg-[#0b0b0f] transition-all duration-500 flex flex-col justify-between ${
                      previewViewport === 'mobile' ? 'w-[325px] h-[520px]' : 'w-full h-full min-h-[350px] max-h-[520px]'
                    }`}
                  >
                    {/* Bezel */}
                    <div className="w-full h-6.5 bg-[#000000] border-b border-white/5 px-4 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-accent-red/50" />
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                    </div>
                    {/* Rendered Preview Screen Component */}
                    <div className="flex-1 overflow-hidden relative">
                      {selectedTheme.renderPreview()}
                    </div>
                  </motion.div>
                </div>

                {/* Details Sidebar */}
                <div className="p-8 sm:p-10 text-left flex flex-col justify-between bg-bg-secondary">
                  <div>
                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 pb-2.5 border-b border-white/5 font-display">
                      Theme Overview
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans">
                      {selectedTheme.desc}
                    </p>

                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 pb-2.5 border-b border-white/5 font-display">
                      Integrated Features
                    </h4>
                    <ul className="flex flex-col gap-3.5">
                      {selectedTheme.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-[#25d366] shrink-0" />
                          <span className="text-text-secondary text-xs sm:text-sm font-semibold font-sans">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm font-bold font-sans">
                      <span className="text-text-secondary">Release State:</span>
                      <span className="text-[#25d366] font-mono font-black uppercase tracking-wider">DEPLOY_READY</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTheme(null);
                        const el = document.querySelector('#contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-4 rounded-xl btn-primary text-xs font-black uppercase tracking-widest shadow-lg shadow-accent-red/25 hover:shadow-accent-red/45 transition-all duration-300"
                    >
                      Inquire About Layout
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(ThemesShowcase);
