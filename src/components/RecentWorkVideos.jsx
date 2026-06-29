import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';

const videoData = [
  {
    id: 1,
    title: '3D Watch Customizer Walkthrough',
    desc: 'Demonstration of smooth real-time 3D watch configuration, leather strap selection, and high-performance WebGL asset loading.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-hud-design-screens-with-digital-data-31952-large.mp4',
    category: '3D UI WebGL',
  },
  {
    id: 2,
    title: 'NFT Minting Portal Case Study',
    desc: 'Interactive demonstration showing Ethereum wallet connection, gas fee calculation modules, and visual custom minting animations.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-monitors-with-flowing-digital-code-background-34283-large.mp4',
    category: 'Web3 / Cryptocurrency',
  },
  {
    id: 3,
    title: 'SaaS Analytics Dashboard UI',
    desc: 'High-speed scrolling demo showcasing real-time data charts rendering at 60 FPS, tabular logs sorting, and custom workspace exports.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-cyber-punk-hologram-effect-with-lines-and-numbers-34273-large.mp4',
    category: 'Dynamic Dashboard',
  }
];

const VideoCard = ({ video, className, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => console.log('Video play interrupted:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullScreen = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className={className || "w-[300px] sm:w-[470px] lg:w-[520px] bg-white/2 rounded-[32px] border border-white/5 p-6 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:border-accent-red/20 shadow-2xl"}>
      {/* Visual background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Video player frame */}
      <div 
        onClick={handlePlayToggle} 
        className="w-full h-40 sm:h-72 rounded-2xl overflow-hidden bg-black relative border border-white/5 cursor-pointer shadow-inner z-10"
      >
        <video
          ref={videoRef}
          src={video.videoSrc}
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-300"
        />

        {/* Video Player overlay shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Play/Pause Button overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ scale: isPlaying ? 0.8 : 1, opacity: isPlaying ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-full bg-accent-red text-white flex items-center justify-center shadow-lg shadow-accent-red/40"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
          </motion.div>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <span className="bg-black/80 px-3.5 py-1.5 rounded-lg text-[9px] font-black text-accent-red uppercase tracking-widest border border-accent-red/10 font-display">
            {video.category}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleMuteToggle}
              className="w-8 h-8 rounded-full bg-black/80 border border-white/10 hover:border-accent-red flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
              aria-label="Mute toggle"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleFullScreen}
              className="w-8 h-8 rounded-full bg-black/80 border border-white/10 hover:border-accent-red flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
              aria-label="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Description Content */}
      <div className="text-left mt-6 z-10">
        <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-wide font-display group-hover:text-accent-red transition-colors duration-300">
          {video.title}
        </h3>
        <p className="text-text-secondary text-xs sm:text-sm mt-3 leading-relaxed font-sans">
          {video.desc}
        </p>
      </div>
    </div>
  );
};

const RecentWorkVideos = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.scrollWidth / videoData.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < videoData.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section 
      id="recent-work-videos" 
      className="py-14 md:py-32 bg-bg-secondary border-b border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-1/3 right-[-10%] w-[400px] h-[400px] bg-accent-red/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container mb-12 md:mb-20 text-center relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text block mb-3 font-display">
          DYNAMIC DEMONSTRATIONS
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
          Recent Work Videos
        </h2>
        <p className="text-text-secondary text-xs md:text-base max-w-xl mx-auto mt-3 md:mt-4 leading-relaxed font-sans">
          Scroll through our high-definition website walkthroughs, interactive UI modules, and procedural WebGL animations.
        </p>
      </div>

      {/* Desktop View: Swiper Slider (Unchanged) */}
      <div className="hidden md:block w-full relative px-6 z-10">
        <Swiper
          spaceBetween={32}
          slidesPerView="auto"
          className="swiper-container"
          loop={false}
        >
          {videoData.map((video) => (
            <SwiperSlide key={video.id} style={{ width: 'auto' }}>
              <VideoCard video={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile View: Snapping Swipe Carousel */}
      <div className="block md:hidden w-full relative z-10 px-4">
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full overflow-x-auto scrollbar-none flex gap-4 snap-x snap-mandatory px-4 pb-4"
        >
          {videoData.map((video, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div 
                key={video.id} 
                className="snap-center shrink-0 w-[80vw] h-[65vh] flex items-center justify-center"
              >
                <VideoCard 
                  video={video} 
                  isActive={isActive}
                  className={`w-full h-full p-5 rounded-[28px] bg-white/2 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                    isActive 
                      ? 'border-accent-red/35 scale-100 shadow-[0_0_25px_rgba(255,43,43,0.1)]' 
                      : 'border-white/5 scale-[0.93] opacity-65'
                  }`} 
                />
              </div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-5">
          {videoData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (containerRef.current) {
                  const cardWidth = containerRef.current.scrollWidth / videoData.length;
                  containerRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-accent-red w-6 shadow-[0_0_8px_#FF2B2B]' : 'bg-white/20'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Swipe Helper Text */}
        <p className="text-text-secondary/50 text-[9px] uppercase font-black tracking-widest mt-3.5 animate-pulse text-center">
          Swipe → Next Project
        </p>
      </div>
    </section>
  );
};

export default React.memo(RecentWorkVideos);
