import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, ThumbsUp, Headset } from 'lucide-react';

const Counter = ({ endValue, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            setCount(Math.floor(progress * endValue));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, duration]);

  return <span ref={elementRef}>{count}</span>;
};

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.scrollWidth / stats.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < stats.length) {
      setActiveIndex(newIndex);
    }
  };

  const stats = [
    {
      num: '01',
      icon: <Target className="w-7 h-7 text-accent-red" />,
      value: 50,
      suffix: '+',
      label: 'Projects Delivered',
      desc: 'High-end custom websites built for startups and corporations globally.',
    },
    {
      num: '02',
      icon: <Users className="w-7 h-7 text-accent-red" />,
      value: 30,
      suffix: '+',
      label: 'Happy Clients',
      desc: 'Long-term collaborative partnerships built on trust and pixel-perfection.',
    },
    {
      num: '03',
      icon: <ThumbsUp className="w-7 h-7 text-accent-red" />,
      value: 100,
      suffix: '%',
      label: 'Satisfaction Rate',
      desc: 'Commitment to world-class speed, design standards, and UX.',
    },
    {
      num: '04',
      icon: <Headset className="w-7 h-7 text-accent-red" />,
      value: 24,
      suffix: '/7',
      label: 'Support Availability',
      desc: 'Round-the-clock server maintenance and direct WhatsApp channel support.',
    },
  ];

  return (
    <section 
      className="py-14 md:py-32 bg-bg-secondary relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-accent-red/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text block mb-3 font-display">
            AGENCY EXCELLENCE
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
            Why Choose CodeLuxe
          </h2>
          <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed font-sans">
            We merge luxury graphics with high-performance frameworks to construct unforgettable websites.
          </p>
        </div>

        {/* Desktop View (Unchanged) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-[32px] text-center flex flex-col items-center gap-4 group hover:border-accent-red/35 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Massive Watermark background numbers */}
              <span className="absolute bottom-[-10px] right-2 text-8xl font-black font-display text-white/[0.015] group-hover:text-accent-red/[0.025] group-hover:scale-105 transition-all duration-500 select-none z-0">
                {stat.num}
              </span>

              {/* Icon */}
              <div className="w-16 h-16 rounded-[20px] bg-accent-red/5 border border-accent-red/15 flex items-center justify-center group-hover:bg-accent-red/10 group-hover:border-accent-red/35 transition-all duration-300 z-10">
                {stat.icon}
              </div>

              {/* Counter Display */}
              <div className="text-4xl sm:text-5xl font-black font-sans text-white mt-2 flex items-baseline tracking-tight z-10">
                <Counter endValue={stat.value} />
                <span className="text-accent-red font-black">{stat.suffix}</span>
              </div>

              {/* Label & Description */}
              <div className="z-10">
                <h3 className="text-base font-extrabold text-white uppercase tracking-wider font-display group-hover:text-accent-red transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Horizontal Coverflow Stats Slider */}
        <div className="block md:hidden w-full relative z-10 px-4">
          {/* Floating 3D particle background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 bg-white rounded-full opacity-35 animate-pulse" />
            <div className="absolute bottom-[30%] left-[10%] w-2 h-2 bg-accent-red rounded-full opacity-50 animate-ping [animation-duration:3.5s]" />
            <div className="absolute top-[40%] right-[15%] w-1 h-1 bg-white rounded-full opacity-40 animate-pulse [animation-duration:2.5s]" />
            <div className="absolute bottom-[15%] right-[25%] w-1.5 h-1.5 bg-accent-red rounded-full opacity-40 animate-ping [animation-duration:4.5s]" />
          </div>

          <div className="relative w-full h-[260px] flex items-center justify-center overflow-hidden z-10 perspective-1000">
            <div className="relative w-[180px] h-[220px] flex items-center justify-center">
              {stats.map((stat, idx) => {
                const offset = idx - activeIndex;
                const absOffset = Math.abs(offset);
                
                // Hide cards that are far away
                if (absOffset > 1) return null;
                
                return (
                  <motion.div
                    key={idx}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      const swipeThreshold = 40;
                      if (info.offset.x < -swipeThreshold && activeIndex < stats.length - 1) {
                        setActiveIndex(activeIndex + 1);
                      } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
                        setActiveIndex(activeIndex - 1);
                      }
                    }}
                    animate={{
                      x: offset * 130, // Slide side cards out
                      scale: idx === activeIndex ? 1.05 : 0.82,
                      rotateY: offset * -30, // Rotate side cards in 3D
                      z: idx === activeIndex ? 0 : -100,
                      opacity: idx === activeIndex ? 1 : 0.4
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className={`absolute w-[180px] h-[220px] rounded-[24px] border p-5 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${
                      idx === activeIndex 
                        ? 'border-accent-red/35 bg-white/3 shadow-[0_0_25px_rgba(255,43,43,0.12)]' 
                        : 'border-white/5 bg-white/2'
                    }`}
                  >
                    {/* Massive Watermark background numbers */}
                    <span className={`absolute bottom-[-15px] right-3 text-7xl font-black font-display select-none z-0 transition-all duration-500 ${
                      idx === activeIndex ? 'text-accent-red/[0.04] scale-105' : 'text-white/[0.015]'
                    }`}>
                      {stat.num}
                    </span>

                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-[16px] flex items-center justify-center transition-all duration-300 z-10 ${
                      idx === activeIndex 
                        ? 'bg-accent-red/10 border border-accent-red/35' 
                        : 'bg-accent-red/5 border border-accent-red/15'
                    }`}>
                      {stat.icon}
                    </div>

                    {/* Counter Display */}
                    <div className="text-3xl font-black font-sans text-white mt-1 flex items-baseline tracking-tight z-10">
                      <Counter endValue={stat.value} />
                      <span className="text-accent-red font-black">{stat.suffix}</span>
                    </div>

                    {/* Label & Description */}
                    <div className="z-10 text-left">
                      <h3 className={`text-xs font-extrabold uppercase tracking-wider font-display transition-colors duration-300 ${
                        idx === activeIndex ? 'text-accent-red' : 'text-white'
                      }`}>
                        {stat.label}
                      </h3>
                      <p className="text-text-secondary text-[10px] mt-1 leading-relaxed font-sans font-semibold">
                        {stat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls: ← 01 / 04 → */}
          <div className="flex justify-center items-center gap-6 mt-4 relative z-20">
            <button 
              onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-accent-red flex items-center justify-center text-white hover:text-accent-red hover:shadow-[0_0_10px_rgba(255,43,43,0.3)] transition-all bg-white/2 cursor-pointer active:scale-95 text-xs font-black"
              aria-label="Previous stat"
            >
              ←
            </button>
            <span className="font-mono text-xs font-black tracking-widest text-text-secondary">
              {`0${activeIndex + 1} / 0${stats.length}`}
            </span>
            <button 
              onClick={() => activeIndex < stats.length - 1 && setActiveIndex(activeIndex + 1)}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-accent-red flex items-center justify-center text-white hover:text-accent-red hover:shadow-[0_0_10px_rgba(255,43,43,0.3)] transition-all bg-white/2 cursor-pointer active:scale-95 text-xs font-black"
              aria-label="Next stat"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyChooseUs);
