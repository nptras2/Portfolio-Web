import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CTABanner = () => {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappNumber = '919999999999';
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Hello+CODELUXE%21+I+would+like+to+discuss+a+new+project+quote.`;

  return (
    <section className="py-14 md:py-24 bg-bg-primary relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,43,43,0.08)_0%,transparent_60%] pointer-events-none" />

      <div className="content-container relative z-10">
        <motion.div
          className="glass-card p-6 sm:p-20 rounded-[44px] text-center border border-accent-red/30 shadow-[0_0_60px_rgba(255,43,43,0.18)] relative overflow-hidden"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Cyberpunk grid bg for visual depth */}
          <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text px-4.5 py-2 rounded-full border border-accent-red/20 bg-accent-red/5 font-display">
              SECURE YOUR PROJECT SPOT
            </span>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tighter leading-none max-w-3xl font-display">
              Ready To Build Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red via-[#e61b1b] to-accent-dark glow-text-strong">
                Dream Website?
              </span>
            </h2>

            <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-xl mt-3 leading-relaxed font-sans font-medium">
              Let's transform your ideas into a premium digital experience. Speak directly with our developers and launch your portal.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 w-full sm:w-auto">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-9 py-4 rounded-full btn-primary text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-9 py-4 rounded-full border border-white/10 hover:border-[#25D366] bg-white/2 hover:bg-[#25D366]/5 text-white hover:text-[#25D366] font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(CTABanner);
