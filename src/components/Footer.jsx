import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaDiscord, FaTwitter, FaDribbble, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown } from 'lucide-react';

// Toggle to show/hide the Portfolio link
const SHOW_PORTFOLIO = false;
// Toggle to show/hide the Themes link
const SHOW_THEMES = false;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (accordionName) => {
    if (openAccordion === accordionName) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(accordionName);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! Welcome to CodeLuxe.');
    e.target.reset();
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Technologies', href: '#technologies' },
    { label: 'Services', href: '#services' },
    ...(SHOW_THEMES ? [{ label: 'Themes', href: '#themes' }] : []),
    ...(SHOW_PORTFOLIO ? [{ label: 'Portfolio', href: '#portfolio' }] : []),
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const servicesLinks = [
    { label: 'Static Website', href: '#services' },
    { label: 'E-Commerce Website', href: '#services' },
    { label: '3D Web Development', href: '#services' },
    { label: 'Monthly Maintenance', href: '#services' },
    { label: 'Web3 & Cyber Dev', href: '#technologies' },
  ];

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, href: 'https://github.com', label: 'GitHub' },
    // { icon: <FaDiscord className="w-5 h-5" />, href: 'https://discord.com', label: 'Discord' },
    { icon: <FaXTwitter className="w-5 h-5" />, href: 'https://x.com', label: 'X.com' },
    // { icon: <FaDribbble className="w-5 h-5" />, href: 'https://dribbble.com', label: 'Dribbble' },
    { icon: <FaLinkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-bg-primary pt-14 md:pt-24 pb-8 md:pb-12 border-t border-white/5 overflow-hidden">
      {/* Decorative background accent ring */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-accent-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] bg-accent-red/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Desktop View: Unchanged footer columns */}
      <div className="hidden md:grid max-w-7xl mx-auto px-6 grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 relative z-10">
        {/* Brand Information */}
        <div className="flex flex-col gap-6 text-left">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-black tracking-wider text-white">
              CODE<span className="text-accent-red">LUXE</span>
            </span>
            <div className="w-1.5 h-1.5 bg-accent-red rounded-full animate-cyber-pulse" />
          </a>
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
            We build digital experiences that represent luxury, speed, and immersive design. 
            CodeLuxe is a world-class creative studio crafting high-end premium websites.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-white/5 bg-white/2 hover:bg-accent-red/10 hover:border-accent-red hover:text-accent-red flex items-center justify-center text-text-secondary transition-all duration-300 hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-left">
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            Quick Links
            <span className="w-8 h-[1px] bg-accent-red/55" />
          </h3>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-text-secondary hover:text-accent-red hover:translate-x-1 text-sm font-medium transition-all duration-300 inline-flex items-center gap-1.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links */}
        <div className="text-left">
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            Services
            <span className="w-8 h-[1px] bg-accent-red/55" />
          </h3>
          <ul className="flex flex-col gap-3">
            {servicesLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-text-secondary hover:text-accent-red hover:translate-x-1 text-sm font-medium transition-all duration-300 inline-flex items-center gap-1.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="text-left">
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            Newsletter
            <span className="w-8 h-[1px] bg-accent-red/55" />
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            Stay updated with our latest design releases, themes, and web agency insights.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2.5">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-white/2 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-text-secondary/50 focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-1.5 bg-accent-red hover:bg-accent-dark text-white rounded-md transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile View: Collapsible Accordions & Socials beside logo */}
      <div className="block md:hidden px-6 mb-8 relative z-10 text-left">
        {/* Brand Information & Social Icons Row */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between w-full">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="flex items-center gap-1.5"
            >
              <span className="text-lg font-black tracking-wider text-white">
                CODE<span className="text-accent-red">LUXE</span>
              </span>
              <div className="w-1.5 h-1.5 bg-accent-red rounded-full animate-cyber-pulse" />
            </a>

            {/* Social Icons beside Logo */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full border border-white/5 bg-white/2 hover:bg-accent-red/10 hover:border-accent-red flex items-center justify-center text-text-secondary transition-all"
                >
                  <span className="scale-[0.8]">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <p className="text-text-secondary text-[11px] leading-relaxed max-w-[280px]">
            We build digital experiences that represent luxury, speed, and immersive design.
          </p>
        </div>

        {/* Collapsible Accordions Block */}
        <div className="flex flex-col gap-2.5 mb-6">
          {/* Quick Links Accordion */}
          <div className="border-b border-white/5 pb-2">
            <button
              onClick={() => toggleAccordion('quickLinks')}
              className="flex justify-between items-center w-full py-2 text-white font-extrabold text-xs uppercase tracking-widest text-left"
            >
              <span>Quick Links</span>
              <motion.span
                animate={{ rotate: openAccordion === 'quickLinks' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-accent-red" />
              </motion.span>
            </button>
            
            <AnimatePresence initial={false}>
              {openAccordion === 'quickLinks' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-wrap gap-x-4 gap-y-2.5 py-3">
                    {quickLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => scrollToSection(e, link.href)}
                          className="text-text-secondary hover:text-accent-red text-xs font-semibold"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services Accordion */}
          <div className="border-b border-white/5 pb-2">
            <button
              onClick={() => toggleAccordion('services')}
              className="flex justify-between items-center w-full py-2 text-white font-extrabold text-xs uppercase tracking-widest text-left"
            >
              <span>Services</span>
              <motion.span
                animate={{ rotate: openAccordion === 'services' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-accent-red" />
              </motion.span>
            </button>
            
            <AnimatePresence initial={false}>
              {openAccordion === 'services' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-col gap-2.5 py-3 text-left">
                    {servicesLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => scrollToSection(e, link.href)}
                          className="text-text-secondary hover:text-accent-red text-xs font-semibold block"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cyberpunk accent bar */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-accent-red/20 to-transparent my-6" />

      {/* Footer Bottom info */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-text-secondary gap-4 relative z-10">
        <div className="text-center md:text-left text-[10px] md:text-xs">
          &copy; {currentYear} <span className="text-white font-semibold">CodeLuxe</span>. Built with React + Three.js
        </div>
        <div className="flex gap-4 text-[10px] md:text-xs">
          <a href="#" className="hover:text-accent-red transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent-red transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent-red transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
