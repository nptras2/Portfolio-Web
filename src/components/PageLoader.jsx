import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const minDuration = 1800; // Enforce minimum 1.8s load display time for animation polish

    // 1. Increment progress bar smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        // Increment faster at the beginning, slower near the end
        const step = prev < 50 ? 5 : 1;
        return prev + step;
      });
    }, 35);

    // 2. When window load event triggers, complete loader progress
    const handleLoadComplete = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsedTime);

      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
        }, 300); // Short delay to let the progress bar hit 100% visual state
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      // If already loaded, run completion after minimum duration
      handleLoadComplete();
    } else {
      window.addEventListener('load', handleLoadComplete);
    }

    // Fallback: If load event doesn't trigger, force complete after 2.8 seconds
    const fallbackTimeout = setTimeout(() => {
      handleLoadComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoadComplete);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-[#020202] z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
        >
          {/* Subtle background radial red glow */}
          <div className="absolute w-[350px] h-[350px] bg-accent-red/[0.04] rounded-full blur-[100px] pointer-events-none" />

          {/* Central Logo Container with Cyber Ring */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Glowing red background ring */}
            <motion.div 
              className="absolute w-24 h-24 rounded-full border border-accent-red/20 shadow-[0_0_30px_rgba(255,43,43,0.15)]"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            {/* Main logo img */}
            <motion.img 
              src={logoImg} 
              alt="abcdwebsite logo" 
              className="w-16 h-16 rounded-full relative z-10 border border-white/5 object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          {/* Brand Name Header */}
          <motion.div
            className="text-center"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h1 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase font-sans">
              ABCD<span className="text-accent-red">WEBSITE</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary/70 mt-2 font-display">
              Advancing Brands. Creating Digital.
            </p>
          </motion.div>

          {/* Sleek Progress Indicator */}
          <div className="mt-8 flex flex-col items-center">
            {/* Custom line loader container */}
            <div className="w-48 sm:w-56 h-[3px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-accent-red to-[#ff5252] shadow-[0_0_10px_#FF2B2B]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            {/* Progress Percentage */}
            <span className="text-[9px] font-bold tracking-widest text-accent-red/80 uppercase mt-3 font-mono">
              LOADING {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(PageLoader);
