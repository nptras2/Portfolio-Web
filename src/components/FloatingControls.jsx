import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUp, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingControls = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Handle setting showScrollTop using Motion Value Event to prevent redundant renders
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  });

  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [163.3, 0]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappNumber = '919999999999'; // Placeholder format: Country code + Number
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Hello+CODELUXE%21+I+would+like+to+discuss+a+project+with+your+agency.`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        aria-label="Contact us on WhatsApp"
      >
        <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-bg-secondary border border-white/5 text-xs text-white font-medium opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-xl">
          Chat with CodeLuxe
        </span>
        <FaWhatsapp className="w-7 h-7" />
      </motion.a>

      {/* Floating Scroll Controls Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="relative w-14 h-14 bg-bg-secondary hover:bg-black rounded-full flex items-center justify-center text-white border border-white/10 transition-all duration-300 active:scale-95 group overflow-hidden shadow-2xl"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              aria-label="Scroll to top"
            >
              {/* Circular Scroll Progress Border */}
              <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="rgba(255, 43, 43, 0.15)"
                  strokeWidth="2"
                  fill="transparent"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="#FF2B2B"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray="163" // 2 * pi * r (2 * 3.14 * 26 ≈ 163.3)
                  style={{ strokeDashoffset }}
                  transition={{ ease: 'linear' }}
                />
              </svg>

              <ArrowUp className="w-5 h-5 text-text-secondary group-hover:text-accent-red group-hover:-translate-y-1 transition-all duration-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default React.memo(FloatingControls);
