import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import developerCharacterRaw from '../assets/developer-character.png';

const Hero3D = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const ringsX = useTransform(smoothMouseX, (x) => x * -10);
  const ringsY = useTransform(smoothMouseY, (y) => y * -8 + (isMobile ? -35 : 0));

  const charX = useTransform(smoothMouseX, (x) => x * 12);
  const charY = useTransform(smoothMouseY, (y) => y * 8 + (isMobile ? -35 : 25));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamically strip the white background using BFS flood-fill to prevent laptop screen transparency bleed
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const width = canvas.width;
      const height = canvas.height;

      // Visited array for BFS
      const visited = new Uint8Array(width * height);
      const queue = [];

      // Check and push edge pixels as BFS seeds
      const checkAndPush = (x, y) => {
        const idx = y * width + x;
        if (visited[idx]) return;
        visited[idx] = 1;

        const rIdx = idx * 4;
        const r = data[rIdx];
        const g = data[rIdx+1];
        const b = data[rIdx+2];
        const minVal = Math.min(r, g, b);

        if (minVal === 255) {
          queue.push(idx);
          data[rIdx+3] = 0; // Pure white background is fully transparent
        } else if (minVal >= 250) {
          // Semi-transparent fade for anti-aliasing edges
          const alpha = Math.round(((255 - minVal) / (255 - 250)) * 255);
          data[rIdx+3] = Math.min(data[rIdx+3], alpha);
        }
      };

      // Edges seeds: Seed from top, left, and right edges.
      // Skipping the bottom edge prevents seeding from any character highlights that touch the bottom.
      for (let x = 0; x < width; x++) {
        checkAndPush(x, 0);
      }
      for (let y = 0; y < height; y++) {
        checkAndPush(0, y);
        checkAndPush(width - 1, y);
      }

      // BFS traversal to clear only connected background white pixels
      let head = 0;
      while (head < queue.length) {
        const curr = queue[head++];
        const cx = curr % width;
        const cy = Math.floor(curr / width);

        // Check 4 neighbors
        const neighbors = [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1]
        ];

        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nIdx = ny * width + nx;
            if (!visited[nIdx]) {
              visited[nIdx] = 1;
              const nrIdx = nIdx * 4;
              const nr = data[nrIdx];
              const ng = data[nrIdx+1];
              const nb = data[nrIdx+2];
              const nMin = Math.min(nr, ng, nb);
              if (nMin === 255) {
                // Propagate only through pure white pixels
                queue.push(nIdx);
                data[nrIdx+3] = 0;
              } else if (nMin >= 250) {
                // Clear anti-aliased edge but do not propagate inward
                const alpha = Math.round(((255 - nMin) / (255 - 250)) * 255);
                data[nrIdx+3] = Math.min(data[nrIdx+3], alpha);
              }
            }
          }
        }
      }

      // Color Correction: recolor unvisited white pixels (laptop screen background) to dark black
      for (let i = 0; i < data.length; i += 4) {
        const idx = i / 4;
        if (!visited[idx]) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          const minVal = Math.min(r, g, b);
          if (minVal > 245) {
            data[i] = 10;
            data[i+1] = 10;
            data[i+2] = 10;
            data[i+3] = 255;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedImage(canvas.toDataURL('image/png'));
    };
    img.src = developerCharacterRaw;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Atmospheric sparks with random larger glow particles
  const sparks = useRef(
    Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: i % 8 === 0 ? Math.random() * 5 + 3.5 : Math.random() * 2.2 + 0.8,
      duration: Math.random() * 9 + 5,
      delay: Math.random() * -12,
    }))
  ).current;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: processedImage ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full relative select-none flex items-center justify-center overflow-visible"
    >
      {/* Atmospheric Red Haze behind rings */}
      <div className="absolute top-[10%] left-[-15%] w-[800px] h-[800px] bg-accent-red/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Background Volumetric Glow - dampened to match black levels */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,43,43,0.06)_0%,transparent_75%] pointer-events-none z-0" />

      {/* Atmospheric drifting particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {sparks.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${p.size > 3 ? 'bg-accent-red/20 shadow-[0_0_15px_rgba(255,43,43,0.4)]' : 'bg-accent-red/35 shadow-[0_0_8px_rgba(255,43,43,0.5)]'}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -180],
              opacity: [0, p.size > 3 ? 0.45 : 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Parallax Group 1: Background Concentric Rings (Centered behind character, scaled to fit 100vh) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible top-0"
        style={{
          zIndex: 1,
          x: ringsX,
          y: ringsY,
        }}
      >
        {/* Static translation to offset the rings up-left, positioning them behind her head/shoulders */}
        <div className="
relative
translate-y-0
sm:translate-y-0
scale-100
sm:scale-100
translate-x-0
sm:translate-x-[2%]
overflow-visible
flex items-center justify-center
">
          <svg 
            className="w-[305px] h-[305px] xs:w-[335px] xs:h-[335px] sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px] xl:w-[710px] xl:h-[710px] filter drop-shadow-[0_0_20px_rgba(255,43,43,0.4)] lg:drop-shadow-[0_0_25px_rgba(255,43,43,0.45)] overflow-visible" 
            viewBox="0 0 1000 1000"
          >
            <defs>
              <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur1" />
                <feGaussianBlur stdDeviation="24" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* 1. Outer solid neon ring */}
            <motion.circle
              cx="500"
              cy="500"
              r="380"
              fill="none"
              stroke="#FF2B2B"
              strokeWidth="5"
              filter="url(#ring-glow)"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="origin-center"
            />

            {/* 2. Middle dashed broken ring segments */}
            <motion.circle
              cx="500"
              cy="500"
              r="340"
              fill="none"
              stroke="#B30000"
              strokeWidth="2.5"
              strokeDasharray="420 50 120 70 250 80"
              opacity="0.85"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
              className="origin-center"
            />

            {/* 3. Thin dashed ring */}
            <motion.circle
              cx="500"
              cy="500"
              r="300"
              fill="none"
              stroke="#FF2B2B"
              strokeWidth="1"
              strokeDasharray="12 18"
              opacity="0.6"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
              className="origin-center"
            />

            {/* 4. Fine dotted ring */}
            <motion.circle
              cx="500"
              cy="500"
              r="260"
              fill="none"
              stroke="#FF2B2B"
              strokeWidth="1.5"
              strokeDasharray="2 10"
              opacity="0.4"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="origin-center"
            />

            {/* 5. Subtle broken inner ring */}
            <motion.circle
              cx="500"
              cy="500"
              r="220"
              fill="none"
              stroke="#B30000"
              strokeWidth="1"
              strokeDasharray="180 80 90 50"
              opacity="0.7"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
              className="origin-center"
            />

            {/* Orbiting glowing particles traveling along concentric ring paths */}
            <g className="origin-center animate-[spin_12s_linear_infinite]">
              <circle cx="500" cy="120" r="4.5" fill="#FFF" className="shadow-[0_0_10px_#FFF]" />
            </g>
            <g className="origin-center animate-[spin_20s_linear_infinite_reverse]">
              <circle cx="500" cy="160" r="5" fill="#FF2B2B" className="shadow-[0_0_12px_#FF2B2B]" />
            </g>
            <g className="origin-center animate-[spin_28s_linear_infinite]">
              <circle cx="500" cy="200" r="3.5" fill="#FF2B2B" opacity="0.8" />
            </g>
            <g className="origin-center animate-[spin_16s_linear_infinite_reverse]">
              <circle cx="500" cy="240" r="4" fill="#FFF" className="shadow-[0_0_8px_#FFF]" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Parallax Group 2: Character Image Layer (Enlarged, Broad shoulders, and pinned to bottom) */}
      <motion.div
        className="absolute inset-0 flex items-center lg:items-end justify-center overflow-visible"
        style={{
          zIndex: 10,
          x: charX,
          y: charY,
        }}
      >
        <motion.div
          className="
relative
w-[120%]
xs:w-[130%]
sm:w-[160%]
lg:w-[175%]
xl:w-[185%]
h-full
sm:h-[120%]
lg:h-[125%]
xl:h-[130%]
left-0
sm:left-[-2%]
lg:left-[-6%]
xl:left-[-8%]
flex items-center lg:items-end justify-center
pointer-events-none overflow-visible
"
          animate={{
            y: [0, -8, 0]
          }}
          transition={{
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }}
        >
          {/* Render the processed transparent image for perfect dark-background integration */}
          <img
            src={processedImage || developerCharacterRaw}
            alt="CodeLuxe Cyber Developer"
            className="w-full h-full object-contain object-bottom select-none pointer-events-none transition-opacity duration-300"
            style={{
              opacity: processedImage ? 1 : 0, // Fade-in when transparency processing is complete
              filter: 'drop-shadow(0 15px 45px rgba(0,0,0,0.95))',
              maskImage: isMobile 
                ? 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)' 
                : 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: isMobile 
                ? 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)' 
                : 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)'
            }}
          />
          
          {/* Large radial red glow centered behind the character - dampened */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,43,43,0.08)_0%,transparent_60%)] pointer-events-none mix-blend-screen -z-10 animate-pulse-slow" />
        </motion.div>
      </motion.div>

      {/* HUD Cards Removed for Clean Layout */}
    </motion.div>
  );
};

export default React.memo(Hero3D);
