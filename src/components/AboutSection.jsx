import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, Compass, Cpu, CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const [activeTechIdx, setActiveTechIdx] = useState(0);
  const techContainerRef = useRef(null);

  const handleTechScroll = () => {
    if (!techContainerRef.current) return;
    const container = techContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.scrollWidth / 4;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < 4) {
      setActiveTechIdx(newIndex);
    }
  };
  const pillars = [
    {
      icon: <Paintbrush className="w-5 h-5 text-accent-red" />,
      title: 'Luxury Aesthetics',
      desc: 'We reject standard web layouts. We build high-end visual experiences featuring custom typography, micro-interactions, and neon rim lighting.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-accent-red" />,
      title: 'Technical Excellence',
      desc: 'Our applications are engineered for instant paints. Using lazy-loaded modules and custom WebGL shaders, we guarantee 60 FPS performance.',
    },
    {
      icon: <Compass className="w-5 h-5 text-accent-red" />,
      title: 'Conversion Driven',
      desc: 'Beautiful code is useless without growth. Every animation, interactive card, and CTA is positioned strategically to drive customer actions.',
    },
  ];

  return (
    <section 
      id="about" 
      className="py-14 md:py-32 bg-bg-secondary relative overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-1/3 left-[-10%] w-[450px] h-[450px] bg-accent-red/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Description & Pillars */}
          <div className="text-left flex flex-col items-start gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text font-display">
              OUR IDENTITY
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
              About CodeLuxe
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl font-sans">
              CodeLuxe is a world-class creative digital agency. We construct immersive, speed-optimized web platforms that help premium brands represent themselves in the modern internet age.
            </p>
            
            {/* Pillars */}
            <div className="flex flex-col gap-7 mt-6 w-full">
              {pillars.map((pillar, index) => (
                <div key={index} className="flex gap-5 items-start">
                  <div className="w-11 h-11 rounded-xl bg-accent-red/5 border border-accent-red/20 flex items-center justify-center shrink-0 mt-0.5">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-base uppercase tracking-wider font-display block mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed max-w-md font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: CodeLuxe Technology Core Visualization */}
          <div className="relative flex justify-center items-center h-[450px] w-full max-w-[550px] mx-auto">
            
            {/* Desktop View: 4 Connected Corner Cards (Unchanged except visuals) */}
            <div className="hidden md:flex relative justify-center items-center w-full h-full">
              {/* Connecting SVG Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 450">
                {/* Top Left Card (90, 60) */}
                <line x1="250" y1="225" x2="90" y2="60" stroke="#FF2B2B" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.3" />
                {/* Top Right Card (410, 60) */}
                <line x1="250" y1="225" x2="410" y2="60" stroke="#FF2B2B" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.3" />
                {/* Bottom Left Card (90, 390) */}
                <line x1="250" y1="225" x2="90" y2="390" stroke="#FF2B2B" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.3" />
                {/* Bottom Right Card (410, 390) */}
                <line x1="250" y1="225" x2="410" y2="390" stroke="#FF2B2B" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.3" />
              </svg>

              {/* Concentric visual rings */}
              <div className="absolute w-60 h-60 border border-white/5 rounded-full animate-spin-slow z-0" />
              <div className="absolute w-[300px] h-[300px] border border-accent-red/10 border-dashed rounded-full animate-spin [animation-duration:35s] z-0" />
              <div className="absolute w-[380px] h-[380px] border border-white/5 rounded-full z-0" />

              {/* Glowing core logo */}
              <div className="w-28 h-28 rounded-full bg-[#050505] border border-accent-red/35 flex flex-col items-center justify-center shadow-[0_0_45px_rgba(255,43,43,0.22)] relative z-10">
                <span className="text-[10px] font-black tracking-widest text-white font-display">CODE</span>
                <span className="text-[9px] font-black text-accent-red tracking-widest font-display mt-0.5">LUXE</span>
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent-red rounded-full animate-ping" />
              </div>

              {/* Top Left Card: PERFORMANCE */}
              <motion.div
                className="absolute top-0 left-0 glass-card p-5 rounded-2xl border border-accent-red/20 text-left w-[185px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffea2b] animate-pulse" />
                  <span className="text-[9px] uppercase font-black text-white font-display tracking-wider">PERFORMANCE</span>
                </div>
                <span className="text-[10px] text-text-secondary font-mono leading-normal font-medium block">
                  Animation FPS: 60<br />
                  Lazy Loading: ENABLED<br />
                  Image Comp: ACTIVE
                </span>
              </motion.div>

              {/* Top Right Card: CODE_OPTIMIZED */}
              <motion.div
                className="absolute top-0 right-0 glass-card p-5 rounded-2xl border border-accent-red/20 text-left w-[185px]"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle className="w-4 h-4 text-[#25d366]" />
                  <span className="text-[9px] uppercase font-black text-white font-display tracking-wider">CODE_OPTIMIZED</span>
                </div>
                <span className="text-[10px] text-text-secondary font-mono leading-normal font-medium block">
                  Vite Build: 409KB<br />
                  Chunks split: OK<br />
                  Bundle limits: PASS
                </span>
              </motion.div>

              {/* Bottom Left Card: 3D ENGINE RUNNING */}
              <motion.div
                className="absolute bottom-0 left-0 glass-card p-5 rounded-2xl border border-accent-red/20 text-left w-[185px]"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-red animate-ping" />
                  <span className="text-[9px] uppercase font-black text-white font-display tracking-wider">3D ENGINE RUNNING</span>
                </div>
                <span className="text-[10px] text-text-secondary font-mono leading-normal font-medium block">
                  R3F mannequin: OK<br />
                  PointLight scale: 1.3<br />
                  Frame integrity: 60FPS
                </span>
              </motion.div>

              {/* Bottom Right Card: SEO READY */}
              <motion.div
                className="absolute bottom-0 right-0 glass-card p-5 rounded-2xl border border-accent-red/20 text-left w-[185px]"
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2bdaff] animate-pulse" />
                  <span className="text-[9px] uppercase font-black text-white font-display tracking-wider">SEO READY</span>
                </div>
                <span className="text-[10px] text-text-secondary font-mono leading-normal font-medium block">
                  Lighthouse: 98+<br />
                  Core Web Vitals: PASS<br />
                  SSR Ready: TRUE
                </span>
              </motion.div>
            </div>

            {/* Mobile View: Swiper Technology Carousel */}
            <div className="block md:hidden w-full relative z-10">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute w-20 h-20 border border-white/5 rounded-full animate-spin-slow" />
                  <div className="absolute w-[96px] h-[96px] border border-accent-red/10 border-dashed rounded-full animate-spin [animation-duration:25s]" />
                  <div className="w-20 h-20 rounded-full bg-[#050505] border border-accent-red/35 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,43,43,0.18)] z-10">
                    <span className="text-[8px] font-black tracking-widest text-white font-display">CODE</span>
                    <span className="text-[7px] font-black text-accent-red tracking-widest font-display mt-0.5">LUXE</span>
                  </div>
                </div>
              </div>

              <div 
                ref={techContainerRef}
                onScroll={handleTechScroll}
                className="w-full overflow-x-auto scrollbar-none flex gap-4 snap-x snap-center px-8 pb-4"
              >
                {/* PERFORMANCE */}
                <div className="snap-center shrink-0 w-[240px] glass-card p-5 rounded-2xl border border-accent-red/20 text-left">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffea2b] animate-pulse" />
                    <span className="text-[9px] uppercase font-black text-white font-display tracking-wider">PERFORMANCE</span>
                  </div>
                  <span className="text-[10px] text-text-secondary font-mono leading-normal font-medium block">
                    Animation FPS: 60<br />
                    Lazy Loading: ENABLED<br />
                    Image Comp: ACTIVE
                  </span>
                </div>

                {/* CODE_OPTIMIZED */}
                <div className="snap-center shrink-0 w-[240px] glass-card p-5 rounded-2xl border border-accent-red/20 text-left">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#25d366]" />
                    <span className="text-[9px] uppercase font-black text-white font-display tracking-wider">CODE_OPTIMIZED</span>
                  </div>
                  <span className="text-[10px] text-text-secondary font-mono leading-normal font-medium block">
                    Vite Build: 409KB<br />
                    Chunks split: OK<br />
                    Bundle limits: PASS
                  </span>
                </div>

                {/* 3D ENGINE RUNNING */}
                <div className="snap-center shrink-0 w-[240px] glass-card p-5 rounded-2xl border border-accent-red/20 text-left">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-red animate-ping" />
                    <span className="text-[9px] uppercase font-black text-white font-display tracking-wider">3D ENGINE RUNNING</span>
                  </div>
                  <span className="text-[10px] text-text-secondary font-mono leading-normal font-medium block">
                    R3F mannequin: OK<br />
                    PointLight scale: 1.3<br />
                    Frame integrity: 60FPS
                  </span>
                </div>

                {/* SEO READY */}
                <div className="snap-center shrink-0 w-[240px] glass-card p-5 rounded-2xl border border-accent-red/20 text-left">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2bdaff] animate-pulse" />
                    <span className="text-[9px] uppercase font-black text-white font-display tracking-wider">SEO READY</span>
                  </div>
                  <span className="text-[10px] text-text-secondary font-mono leading-normal font-medium block">
                    Lighthouse: 98+<br />
                    Core Web Vitals: PASS<br />
                    SSR Ready: TRUE
                  </span>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (techContainerRef.current) {
                        const cardWidth = techContainerRef.current.scrollWidth / 4;
                        techContainerRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                      }
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeTechIdx === idx ? 'bg-accent-red w-6 shadow-[0_0_8px_#FF2B2B]' : 'bg-white/20'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(AboutSection);
