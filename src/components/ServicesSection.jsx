import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, HelpCircle, ChevronDown, Layers } from 'lucide-react';

const ServicesSection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  useEffect(() => {
    setFeaturesOpen(false);
    setExtrasOpen(false);
  }, [activeCardIndex]);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      title: 'Basic Landing Page',
      price: '₹2,000',
      period: 'One-Time Project Price',
      tagline: 'Perfect for simple landing pages, single-page sites, and basic online presence.',
      features: [
        'Single Landing Page Layout',
        'No Login/Signup System',
        'No Database Integration',
        'Pure Static Website',
        'Fully Mobile & Tablet Responsive',
        'Interactive Contact Form & WhatsApp',
      ],
      extras: [
        { label: 'Hosting & Maintenance', value: '₹2,000 / year' },
        { label: 'Domain Registration', value: 'Client Owned' },
      ],
      badge: 'Basic Tier',
      accentColor: 'border-white/5',
    },
    {
      title: 'Premium Website',
      price: '₹5,000',
      period: 'One-Time Project Price',
      tagline: 'Complete website with modern UI/UX, advanced animations, and dynamic interactive elements.',
      features: [
        'Complete Multi-page Website',
        'Modern UI/UX Design System',
        'Advanced Animations & Interactions',
        '3D Effects & Graphics Included',
        'Auth & Database Ready (Supabase)',
        'Free Tier Hosting Setup (up to 50k users)',
      ],
      extras: [
        { label: 'Custom 3D Models Add-on', value: '+₹1,000' },
        { label: 'Hosting & Maintenance', value: '₹2,000 / year' },
      ],
      badge: 'Premium Tier',
      accentColor: 'border-accent-red/35 shadow-[0_0_40px_rgba(255,43,43,0.12)]',
      highlighted: true,
    },
  ];

  return (
    <section 
      id="services" 
      className="py-14 md:py-32 bg-bg-primary relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-accent-red/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent-red/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span 
            className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text block mb-3 font-display"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            TRANSPARENT PRICING
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Services & Packages
          </motion.h2>
          <motion.p 
            className="text-text-secondary text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed font-sans"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            No complex calculators. Choose a premium tier and let's craft your high-end web interfaces.
          </motion.p>
        </div>

        {/* Desktop View (Unchanged) */}
        <div className="hidden lg:block">
          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto items-stretch">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`glass-card p-8 sm:p-12 rounded-[32px] relative flex flex-col justify-between overflow-hidden group ${service.accentColor}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
              >
                {/* Highlight ribbon */}
                {service.highlighted && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-accent-red to-accent-dark text-white text-[9px] font-black tracking-widest uppercase py-2 px-7 rounded-bl-2xl shadow-lg font-display">
                    POPULAR CHOICE
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="mb-8 text-left">
                    <span className="text-accent-red text-xs font-black uppercase tracking-widest block mb-2 font-display">
                      {service.badge}
                    </span>
                    <h3 className="text-3xl font-black text-white uppercase tracking-wide font-display group-hover:text-accent-red transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="mb-8 pb-8 border-b border-white/5 text-left">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans text-white tracking-tighter">
                        {service.price}
                      </span>
                      <span className="text-text-secondary text-[10px] uppercase tracking-widest font-black font-display">
                        / {service.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-10 text-left">
                    <span className="text-white text-xs font-black uppercase tracking-widest block mb-5 font-display">
                      Features Included:
                    </span>
                    <ul className="flex flex-col gap-3.5">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3.5">
                          <div className="w-5 h-5 rounded-full bg-accent-red/10 border border-accent-red/20 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                            <Check className="w-3.5 h-3.5 text-accent-red" />
                          </div>
                          <span className="text-text-secondary text-xs sm:text-sm font-semibold font-sans leading-relaxed">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Extras & CTA */}
                <div>
                  {/* Extras Add-ons Box */}
                  {service.extras && service.extras.length > 0 && (
                    <div className="mb-8 p-5 bg-white/2 rounded-2xl border border-white/5 text-left">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary font-display block mb-3">
                        Package Extras
                      </span>
                      <div className="flex flex-col gap-2">
                        {service.extras.map((extra, eIdx) => (
                          <div key={eIdx} className="flex items-center justify-between text-xs font-semibold font-sans">
                            <span className="text-text-secondary">{extra.label}</span>
                            <span className="text-white font-bold">{extra.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Action Button */}
                  <button
                    onClick={scrollToContact}
                    className={`w-full py-4 rounded-xl uppercase font-black text-xs tracking-widest font-display transition-all duration-300 flex items-center justify-center gap-2 ${
                      service.highlighted
                        ? 'bg-gradient-to-r from-accent-red via-[#e61b1b] to-accent-dark hover:from-accent-dark hover:to-accent-red text-white shadow-lg shadow-accent-red/25 hover:shadow-accent-red/45 hover:-translate-y-0.5 active:translate-y-0'
                        : 'border border-white/10 hover:border-accent-red bg-white/2 hover:bg-accent-red/5 text-white hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                  >
                    Choose {service.title}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Client Rules Box */}
          <motion.div
            className="glass-card mt-16 max-w-5xl mx-auto p-8 sm:p-10 rounded-[32px] border border-white/5 relative overflow-hidden text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 w-2.5 h-full bg-accent-red" />
            <h4 className="text-xl font-black text-white uppercase tracking-wide font-display mb-6 flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-accent-red animate-pulse" />
              Client Rules & Guidelines
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 font-sans text-xs sm:text-sm font-semibold leading-relaxed text-text-secondary">
              <div className="flex items-start gap-3.5">
                <div className="w-2 h-2 rounded-full bg-accent-red shrink-0 mt-2 shadow-[0_0_8px_#FF2B2B]" />
                <span>
                  <strong className="text-white">Domain Purchase</strong>: Domain purchase is the client's responsibility.
                </span>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-2 h-2 rounded-full bg-accent-red shrink-0 mt-2 shadow-[0_0_8px_#FF2B2B]" />
                <span>
                  <strong className="text-white">Hosting & Maintenance</strong>: Annual hosting and basic maintenance charges are <strong className="text-white">₹2,000 per year</strong>.
                </span>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-2 h-2 rounded-full bg-accent-red shrink-0 mt-2 shadow-[0_0_8px_#FF2B2B]" />
                <span>
                  <strong className="text-white">Traffic & Cloud Plan</strong>: Free hosting supports up to <strong className="text-white">50,000 monthly users</strong>. Exceeding this traffic requires upgrading to a Supabase paid plan.
                </span>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-2 h-2 rounded-full bg-accent-red shrink-0 mt-2 shadow-[0_0_8px_#FF2B2B]" />
                <span>
                  <strong className="text-white">Optional Website Management</strong>: Direct updates, content uploads, active management, etc., are charged at <strong className="text-white">₹2,000 per month</strong>.
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile View (Redesigned for Premium Swipeable Carousel & Accordions) */}
        <div className="block lg:hidden max-w-sm mx-auto px-2 relative z-10">
          
          {/* Subtle 3D Holographic Background Sphere */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none opacity-45 z-0 overflow-visible">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,43,43,0.18)_0%,transparent_60%)] blur-2xl animate-pulse" />
            <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="holo-glow-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF2B2B" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#FF2B2B" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <g className="origin-center animate-[spin_32s_linear_infinite]">
                <ellipse cx="100" cy="100" rx="72" ry="20" stroke="url(#holo-glow-mobile)" strokeWidth="0.75" strokeDasharray="3 3" />
                <ellipse cx="100" cy="100" rx="72" ry="20" stroke="url(#holo-glow-mobile)" strokeWidth="0.75" className="rotate-45" />
                <ellipse cx="100" cy="100" rx="72" ry="20" stroke="url(#holo-glow-mobile)" strokeWidth="0.75" className="rotate-90" />
                <ellipse cx="100" cy="100" rx="72" ry="20" stroke="url(#holo-glow-mobile)" strokeWidth="0.75" className="rotate-[135deg]" />
              </g>
              <g className="origin-center animate-[spin_24s_linear_infinite_reverse]">
                <ellipse cx="100" cy="100" rx="72" ry="36" stroke="#FF2B2B" strokeWidth="0.5" opacity="0.3" className="rotate-12" />
                <ellipse cx="100" cy="100" rx="72" ry="36" stroke="#FF2B2B" strokeWidth="0.5" opacity="0.3" className="-rotate-[30deg]" />
                <circle cx="100" cy="100" r="72" stroke="#FF2B2B" strokeWidth="0.75" strokeDasharray="60 10 30 10" opacity="0.4" />
              </g>
              <line x1="100" y1="28" x2="100" y2="172" stroke="#FF2B2B" strokeWidth="0.5" opacity="0.25" strokeDasharray="3 3" />
              <line x1="28" y1="100" x2="172" y2="100" stroke="#FF2B2B" strokeWidth="0.5" opacity="0.25" strokeDasharray="3 3" />
            </svg>
            
            {/* Animated particles */}
            <div className="absolute top-[20%] left-[25%] w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-pulse" />
            <div className="absolute top-[75%] left-[15%] w-1 h-1 bg-accent-red rounded-full opacity-80 animate-ping [animation-duration:3s]" />
            <div className="absolute top-[35%] right-[20%] w-1 h-1 bg-white rounded-full opacity-50 animate-pulse [animation-duration:2s]" />
            <div className="absolute bottom-[20%] right-[30%] w-1.5 h-1.5 bg-accent-red rounded-full opacity-70 animate-ping [animation-duration:4s]" />
          </div>

          {/* Premium Pill Tabs selector */}
          <div className="flex justify-center p-1 bg-white/3 border border-white/5 rounded-full mb-8 relative z-10">
            {services.map((service, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCardIndex(idx)}
                className={`flex-1 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCardIndex === idx
                    ? 'bg-accent-red text-white shadow-[0_0_15px_rgba(255,43,43,0.45)]'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {service.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Active Package Card (Swipeable) */}
          <motion.div
            key={activeCardIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={(e, info) => {
              const swipeThreshold = 55;
              if (info.offset.x < -swipeThreshold && activeCardIndex < services.length - 1) {
                setActiveCardIndex(prev => prev + 1);
              } else if (info.offset.x > swipeThreshold && activeCardIndex > 0) {
                setActiveCardIndex(prev => prev - 1);
              }
            }}
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`glass-card p-6 rounded-[28px] border relative flex flex-col justify-between overflow-hidden z-10 w-full min-h-[460px] ${
              services[activeCardIndex].highlighted 
                ? 'border-accent-red/35 shadow-[0_0_30px_rgba(255,43,43,0.08)]' 
                : 'border-white/5'
            }`}
          >
            {/* Popular choice indicator */}
            {services[activeCardIndex].highlighted && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-accent-red to-accent-dark text-white text-[8px] font-black tracking-widest uppercase py-1.5 px-5 rounded-bl-xl shadow-md font-display">
                POPULAR CHOICE
              </div>
            )}

            <div>
              {/* Header */}
              <div className="mb-5 text-left pr-16">
                <span className="text-accent-red text-[10px] font-black uppercase tracking-widest block mb-1 font-display">
                  {services[activeCardIndex].badge}
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-wide font-display">
                  {services[activeCardIndex].title}
                </h3>
                <p className="text-text-secondary text-xs mt-2 leading-relaxed font-sans">
                  {services[activeCardIndex].tagline}
                </p>
              </div>

              {/* Price Display */}
              <div className="mb-5 pb-5 border-b border-white/5 text-left">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black font-sans text-white tracking-tighter">
                    {services[activeCardIndex].price}
                  </span>
                  <span className="text-text-secondary text-[8px] uppercase tracking-widest font-black font-display">
                    / {services[activeCardIndex].period}
                  </span>
                </div>
              </div>

              {/* Accordion: Features Included */}
              <div className="mb-3">
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className={`w-full py-2.5 px-4 bg-white/2 hover:bg-white/4 rounded-xl border border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white transition-all font-display ${
                    featuresOpen ? 'rounded-b-none border-b-transparent' : ''
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red" />
                    Features Included ({services[activeCardIndex].features.length})
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-accent-red transition-transform duration-300 ${featuresOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {featuresOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden bg-white/[0.01] border-x border-b border-white/5 rounded-b-xl"
                    >
                      <ul className="flex flex-col gap-2.5 p-4 text-left">
                        {services[activeCardIndex].features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-red/40 shrink-0 mt-1.5" />
                            <span className="text-text-secondary text-xs font-medium font-sans leading-relaxed">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion: Package Extras */}
              {services[activeCardIndex].extras && services[activeCardIndex].extras.length > 0 && (
                <div className="mb-6">
                  <button
                    onClick={() => setExtrasOpen(!extrasOpen)}
                    className={`w-full py-2.5 px-4 bg-white/2 hover:bg-white/4 rounded-xl border border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white transition-all font-display ${
                      extrasOpen ? 'rounded-b-none border-b-transparent' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-accent-red" />
                      Package Extras ({services[activeCardIndex].extras.length})
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-accent-red transition-transform duration-300 ${extrasOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {extrasOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden bg-white/[0.01] border-x border-b border-white/5 rounded-b-xl"
                      >
                        <div className="flex flex-col gap-2 p-4 text-left">
                          {services[activeCardIndex].extras.map((extra, eIdx) => (
                            <div key={eIdx} className="flex items-center justify-between text-xs font-semibold font-sans">
                              <span className="text-text-secondary">{extra.label}</span>
                              <span className="text-white font-bold">{extra.value}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToContact}
              className={`w-full py-3.5 mt-2 rounded-xl uppercase font-black text-[10px] tracking-widest font-display transition-all duration-300 flex items-center justify-center gap-2 ${
                services[activeCardIndex].highlighted
                  ? 'bg-gradient-to-r from-accent-red via-[#e61b1b] to-accent-dark hover:from-accent-dark hover:to-accent-red text-white shadow-md shadow-accent-red/20'
                  : 'border border-white/10 hover:border-accent-red bg-white/2 hover:bg-accent-red/5 text-white'
              }`}
            >
              Choose {services[activeCardIndex].title.split(' ')[0]}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Swipe Indicator Dots */}
          <div className="flex justify-center gap-2 mt-5 mb-10 relative z-10">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCardIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeCardIndex === idx 
                    ? 'bg-accent-red w-7 shadow-[0_0_10px_#FF2B2B]' 
                    : 'bg-white/15'
                }`}
              />
            ))}
          </div>

          {/* Collapsible Client Rules Accordion */}
          <div className="relative z-10 w-full mb-4">
            <button
              onClick={() => setRulesOpen(!rulesOpen)}
              className={`w-full py-3.5 px-5 bg-white/2 hover:bg-white/4 rounded-2xl border border-white/5 flex items-center justify-between text-xs font-black uppercase tracking-widest text-white transition-all font-display ${
                rulesOpen ? 'rounded-b-none border-b-transparent' : ''
              }`}
            >
              <span className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-accent-red" />
                Client Rules & Guidelines
              </span>
              <ChevronDown className={`w-4 h-4 text-accent-red transition-transform duration-300 ${rulesOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {rulesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden bg-white/[0.01] border-x border-b border-white/5 rounded-b-2xl"
                >
                  <div className="flex flex-col gap-3 p-5">
                    {/* Small horizontal glass cards */}
                    <div className="glass-card p-4 rounded-xl border border-white/5 flex items-start gap-3 bg-white/2 hover:bg-white/4 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0 mt-1.5 shadow-[0_0_6px_#FF2B2B]" />
                      <span className="text-text-secondary text-xs font-semibold font-sans leading-relaxed text-left">
                        <strong className="text-white">Domain Purchase</strong>: Domain purchase is the client's responsibility.
                      </span>
                    </div>
                    <div className="glass-card p-4 rounded-xl border border-white/5 flex items-start gap-3 bg-white/2 hover:bg-white/4 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0 mt-1.5 shadow-[0_0_6px_#FF2B2B]" />
                      <span className="text-text-secondary text-xs font-semibold font-sans leading-relaxed text-left">
                        <strong className="text-white">Hosting & Maintenance</strong>: Annual hosting and basic maintenance charges are <strong className="text-white">₹2,000 per year</strong>.
                      </span>
                    </div>
                    <div className="glass-card p-4 rounded-xl border border-white/5 flex items-start gap-3 bg-white/2 hover:bg-white/4 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0 mt-1.5 shadow-[0_0_6px_#FF2B2B]" />
                      <span className="text-text-secondary text-xs font-semibold font-sans leading-relaxed text-left">
                        <strong className="text-white">Traffic & Cloud Plan</strong>: Free hosting supports up to <strong className="text-white">50,000 monthly users</strong>. Exceeding this traffic requires upgrading to a Supabase paid plan.
                      </span>
                    </div>
                    <div className="glass-card p-4 rounded-xl border border-white/5 flex items-start gap-3 bg-white/2 hover:bg-white/4 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0 mt-1.5 shadow-[0_0_6px_#FF2B2B]" />
                      <span className="text-text-secondary text-xs font-semibold font-sans leading-relaxed text-left">
                        <strong className="text-white">Optional Website Management</strong>: Direct updates, content uploads, active management, etc., are charged at <strong className="text-white">₹2,000 per month</strong>.
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(ServicesSection);
