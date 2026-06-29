import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiSupabase, SiFramer, SiThreedotjs, SiVite } from 'react-icons/si';

const techData = [
  { name: 'React', icon: <FaReact className="w-10 h-10 text-[#61DAFB]" />, desc: 'Component Interface' },
  { name: 'Vite', icon: <SiVite className="w-10 h-10 text-[#646CFF]" />, desc: 'Build Tooling' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-10 h-10 text-[#06B6D4]" />, desc: 'Modern Styling' },
  { name: 'Three.js', icon: <SiThreedotjs className="w-10 h-10 text-white" />, desc: '3D Graphics' },
  { name: 'Node.js', icon: <FaNodeJs className="w-10 h-10 text-[#339933]" />, desc: 'Backend Services' },
  { name: 'MongoDB', icon: <SiMongodb className="w-10 h-10 text-[#47A248]" />, desc: 'Flexible DB' },
  { name: 'Supabase', icon: <SiSupabase className="w-10 h-10 text-[#3ECF8E]" />, desc: 'BaaS Engine' },
  { name: 'Framer Motion', icon: <SiFramer className="w-10 h-10 text-[#F50057]" />, desc: 'FPS Animations' },
];

const Technologies = () => {
  const marqueeData = [...techData, ...techData];

  return (
    <section 
      id="technologies" 
      className="py-14 md:py-32 bg-bg-secondary relative overflow-hidden border-y border-white/5"
    >
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,43,43,0.03)_0%,transparent_75%] pointer-events-none" />

      <div className="content-container mb-20 relative z-10 text-center">
        <motion.span 
          className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text block mb-3 font-display"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          POWERED BY NEXT-GEN TECH
        </motion.span>
        <motion.h2 
          className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our Technology Stack
        </motion.h2>
        <motion.p 
          className="text-text-secondary text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed font-sans"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We use state-of-the-art frameworks and services to guarantee world-class speed, security, and rendering quality.
        </motion.p>
      </div>

      {/* Infinite Scrolling Logo Wall */}
      <div className="w-full relative flex overflow-x-hidden z-10 py-4">
        {/* Shadow masks */}
        <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-bg-secondary via-bg-secondary/70 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-bg-secondary via-bg-secondary/70 to-transparent z-20 pointer-events-none" />

        {/* Scrolling wrapper */}
        <motion.div
          className="flex gap-8 pr-8 whitespace-nowrap"
          animate={{ x: [0, -1984] }} // Length adjustments based on card dimensions (220 width + 32 gap = 252 width per card. 252 * 8 = 2016px)
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 38,
            ease: 'linear',
          }}
        >
          {marqueeData.map((tech, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center justify-center p-7 bg-white/2 border border-white/5 rounded-[24px] w-[200px] sm:w-[230px] shrink-0 text-center transition-all duration-500 hover:bg-accent-red/5 hover:border-accent-red/35 group relative overflow-hidden shadow-xl"
            >
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(255,43,43,0.2)] group-hover:border-accent-red/20 transition-all duration-300 relative z-10">
                {tech.icon}
              </div>
              <span className="text-white text-base font-extrabold font-display block mb-1.5 relative z-10">
                {tech.name}
              </span>
              <span className="text-text-secondary text-[10px] uppercase font-bold tracking-widest font-sans relative z-10">
                {tech.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Technologies);
