import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, ArrowRight } from 'lucide-react';

const categories = ['All', 'Web3', 'E-Commerce', 'Business', 'Creative', '3D Websites'];

const projectsData = [
  {
    id: 1,
    title: 'Aura NFT Marketplace',
    category: 'Web3',
    desc: 'Decentralized digital artwork platform featuring smooth transactions and wallet integrations.',
    color: 'from-[#FF2B2B]/20 to-transparent',
    link: '#contact',
    tech: ['React', 'Solidity', 'Tailwind'],
  },
  {
    id: 2,
    title: 'Apex Premium E-Store',
    category: 'E-Commerce',
    desc: 'High-end designer watch boutique featuring fast micro-interactions and smooth checkout flows.',
    color: 'from-[#FF2B2B]/10 to-[#B30000]/5',
    link: '#contact',
    tech: ['Next.js', 'Stripe', 'Node.js'],
  },
  {
    id: 3,
    title: 'Neural Analytics SaaS',
    category: 'Business',
    desc: 'Enterprise business intelligence dashboard highlighting automated reports and custom metrics.',
    color: 'from-[#B30000]/15 to-transparent',
    link: '#contact',
    tech: ['Vite', 'Recharts', 'Supabase'],
  },
  {
    id: 4,
    title: 'Nebula Creative Studio',
    category: 'Creative',
    desc: 'Immersive storytelling layout crafted for award-winning digital creative agencies.',
    color: 'from-accent-red/10 to-accent-red/20',
    link: '#contact',
    tech: ['Framer Motion', 'React'],
  },
  {
    id: 5,
    title: 'Chronos 3D Landing Page',
    category: '3D Websites',
    desc: 'Procedural 3D clock face website designed to hook users with interactive rotation models.',
    color: 'from-accent-red/20 to-transparent',
    link: '#contact',
    tech: ['Three.js', 'R3F', 'Drei'],
  },
  {
    id: 6,
    title: 'Vortex Immersive Web',
    category: '3D Websites',
    desc: 'Futuristic WebGL particle portal interface designed to showcase luxury product lines.',
    color: 'from-[#FF2B2B]/25 to-[#B30000]/10',
    link: '#contact',
    tech: ['Three.js', 'React', 'GSAP-free'],
  }
];

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="portfolio" 
      className="py-14 md:py-32 bg-bg-primary relative overflow-hidden"
    >
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-accent-red/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text block mb-3 font-display"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            AGENCY SHOWCASE
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our Portfolio
          </motion.h2>
          <motion.p 
            className="text-text-secondary text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed font-sans"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Take a look at some of our digital architectures. We prioritize high-speed loading times and custom visuals.
          </motion.p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
                activeFilter === cat
                  ? 'bg-accent-red border-accent-red text-white shadow-lg shadow-accent-red/20'
                  : 'bg-white/2 border-white/5 text-text-secondary hover:text-white hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-[32px] border border-white/5 p-6 flex flex-col justify-between group interactive-card hover:border-accent-red/35"
              >
                {/* Visual Frame */}
                <div className={`w-full h-52 rounded-2xl bg-gradient-to-br ${project.color} border border-white/5 relative overflow-hidden flex items-center justify-center p-6 mb-6 shadow-inner`}>
                  <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,43,43,0.06)_0%,transparent_75%] pointer-events-none" />
                  <div className="absolute inset-0 cyber-grid opacity-35" />
                  
                  <Layers className="w-12 h-12 text-accent-red/40 group-hover:scale-110 group-hover:text-accent-red transition-all duration-500" />
                  
                  <div className="absolute top-3.5 left-3.5 bg-black/60 px-3.5 py-1 rounded-full text-[9px] font-black text-accent-red tracking-widest uppercase border border-accent-red/10 font-display">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="text-left mb-6">
                  <h3 className="text-xl font-black text-white uppercase tracking-wide font-display group-hover:text-accent-red transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-xs mt-2.5 leading-relaxed font-sans">
                    {project.desc}
                  </p>
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mt-4.5">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/2 rounded-lg text-[9px] text-text-secondary font-mono font-bold tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Launch Button CTA */}
                <button
                  onClick={scrollToContact}
                  className="w-full py-4 rounded-xl border border-white/10 group-hover:border-accent-red bg-white/2 group-hover:bg-accent-red/10 text-white font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
                >
                  Live Demo Launch
                  <ExternalLink className="w-4 h-4 text-text-secondary group-hover:text-white transition-colors" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(PortfolioSection);
