import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageSquare, ClipboardList, PenTool, Terminal, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discuss',
    desc: 'Aligning goals, target audience analysis, and setting project KPIs.',
    icon: <MessageSquare className="w-6 h-6 text-accent-red" />,
  },
  {
    number: '02',
    title: 'Plan',
    desc: 'Creating site wireframes, flow architecture, database schemas, and timeline models.',
    icon: <ClipboardList className="w-6 h-6 text-accent-red" />,
  },
  {
    number: '03',
    title: 'Design',
    desc: 'Designing luxury Figma prototypes, assets, color harmony guidelines, and responsive layouts.',
    icon: <PenTool className="w-6 h-6 text-accent-red" />,
  },
  {
    number: '04',
    title: 'Develop',
    desc: 'Coding high-performance React applications, setting up databases, and optimizing 3D canvases.',
    icon: <Terminal className="w-6 h-6 text-accent-red" />,
  },
  {
    number: '05',
    title: 'Deliver',
    desc: 'Rigorous speed audits, SEO indexing, production build compiles, and cloud Vercel deployments.',
    icon: <Rocket className="w-6 h-6 text-accent-red" />,
  },
];

const ProcessSection = () => {
  const [openStepIndex, setOpenStepIndex] = useState(null);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 16,
      },
    },
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      id="process" 
      className="py-14 md:py-32 bg-bg-primary relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-red/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-24">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text block mb-3 font-display">
            METHODOLOGY
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
            Our Agency Process
          </h2>
          <p className="text-text-secondary text-xs md:text-base max-w-xl mx-auto mt-3 md:mt-4 leading-relaxed font-sans">
            A methodical step-by-step roadmap from initial brainstorming to direct production deployments.
          </p>
        </div>

        {/* Desktop View: Horizontal Timeline (Unchanged) */}
        <motion.div
          className="hidden md:grid grid-cols-5 gap-8 items-stretch relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Connecting Line (Only visible on desktop) */}
          <div className="absolute top-16 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-accent-red/35 to-transparent z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-card p-7 sm:p-8 rounded-[28px] text-left flex flex-col justify-between relative z-10 group interactive-card"
            >
              {/* Connector Pin */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-bg-primary border border-accent-red/40 rounded-full items-center justify-center hidden md:flex">
                <div className="w-1.5 h-1.5 bg-accent-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
              </div>

              {/* Step Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent-red/5 border border-accent-red/15 flex items-center justify-center group-hover:bg-accent-red/10 group-hover:border-accent-red/35 transition-all duration-300">
                  {step.icon}
                </div>
                <span className="text-3xl font-black font-display text-white/10 group-hover:text-accent-red/25 transition-colors duration-300">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-wide font-display group-hover:text-accent-red transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View: Interactive Accordion Timeline */}
        <div className="block md:hidden relative max-w-sm mx-auto px-2 pb-4">
          {/* Base vertical line */}
          <div className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-white/10 z-0" />
          
          {/* Glowing vertical line segment that lights up next to active accordion */}
          {openStepIndex !== null && (
            <motion.div 
              layoutId="activeTimelineGlow"
              className="absolute left-[22px] w-[2px] bg-accent-red shadow-[0_0_12px_#FF2B2B] z-10"
              style={{
                top: `${openStepIndex * 60 + 24}px`,
                height: '60px'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}

          <div className="flex flex-col gap-3 relative z-10">
            {steps.map((step, index) => {
              const isOpen = openStepIndex === index;
              return (
                <div key={index} className="flex gap-4 items-start w-full">
                  {/* Timeline Dot Indicator */}
                  <div className="relative flex items-center justify-center shrink-0 w-11 h-11">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 bg-bg-primary transition-all duration-300 ${isOpen ? 'border-accent-red scale-110 shadow-[0_0_8px_#FF2B2B]' : 'border-white/20'}`}>
                      {isOpen && <div className="w-1.5 h-1.5 bg-accent-red rounded-full mx-auto mt-[1.2px] animate-pulse" />}
                    </div>
                  </div>

                  {/* Accordion Card */}
                  <div className="flex-1 text-left">
                    <motion.button
                      layout="position"
                      onClick={() => setOpenStepIndex(isOpen ? null : index)}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center justify-between w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                        isOpen 
                          ? 'bg-white/3 border-accent-red/35 shadow-[0_0_15px_rgba(255,43,43,0.12)]' 
                          : 'bg-white/2 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-display font-black text-xs ${isOpen ? 'text-accent-red' : 'text-white/25'}`}>
                          {step.number}
                        </span>
                        <span className={`font-display font-black text-xs uppercase tracking-widest ${isOpen ? 'text-white' : 'text-text-secondary'}`}>
                          {step.title}
                        </span>
                      </div>
                      
                      {/* Plus Icon rotates to X */}
                      <motion.span 
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-accent-red font-black text-sm origin-center inline-block"
                      >
                        +
                      </motion.span>
                    </motion.button>

                    {/* Collapsible Panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden bg-white/[0.01] border-x border-b border-white/5 rounded-b-xl -mt-1 p-4"
                        >
                          <p className="text-text-secondary text-[11px] font-semibold leading-relaxed font-sans">
                            {step.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default React.memo(ProcessSection);
