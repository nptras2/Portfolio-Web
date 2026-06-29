import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setHovered(false);
    };

    const handleMouseOver = (e) => {
      if (!e.target) return;
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, .interactive-card, .swiper-slide, [onclick]');
      setHovered(!!target);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseover', handleMouseOver);

    // Add active cursor class to body for hiding default cursor
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-red pointer-events-none z-[9999] mix-blend-screen hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: hovered ? '0 0 20px #FF2B2B' : '0 0 8px rgba(255, 43, 43, 0.3)',
          borderColor: hovered ? '#FF2B2B' : 'rgba(255, 43, 43, 0.5)',
          backgroundColor: hovered ? 'rgba(255, 43, 43, 0.1)' : 'rgba(255, 43, 43, 0)',
          width: hovered ? '56px' : '32px',
          height: hovered ? '56px' : '32px',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-red rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 6px #FF2B2B',
          scale: hovered ? 1.5 : 1,
        }}
      />
    </>
  );
};

export default React.memo(CustomCursor);
