import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Static Website',
    message: '',
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = (fieldName) => {
    if (focusedField === fieldName) setFocusedField(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your request for a "${formData.projectType}" quote has been received. CodeLuxe will contact you shortly.`);
    setFormData({ name: '', email: '', projectType: 'Static Website', message: '' });
  };

  const coordinates = [
    {
      icon: <Mail className="w-5 h-5 text-accent-red" />,
      label: 'Email Address',
      value: 'hello@codeluxe.com',
      href: 'mailto:hello@codeluxe.com',
    },
    {
      icon: <Phone className="w-5 h-5 text-accent-red" />,
      label: 'Phone Call',
      value: '+91 99999 99999',
      href: 'tel:+919999999999',
    },
    {
      icon: <MapPin className="w-5 h-5 text-accent-red" />,
      label: 'Location',
      value: 'Punjab, India',
      href: 'https://maps.google.com',
    },
  ];

  return (
    <section 
      id="contact" 
      className="py-14 md:py-28 bg-bg-primary relative overflow-hidden"
    >
      <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-accent-red/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="content-container relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-24">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text block mb-3 font-display">
            COLLABORATION
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
            Start A Project
          </h2>
          <p className="text-text-secondary text-xs md:text-base max-w-xl mx-auto mt-3 md:mt-4 leading-relaxed font-sans">
            Ready to deploy your digital interface? Fill out the form or contact us directly on WhatsApp.
          </p>
        </div>

        {/* Form and coordinates grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Desktop Coordinates Info Side */}
          <div className="hidden lg:flex lg:col-span-2 flex-col justify-between gap-10 text-left bg-white/2 border border-white/5 rounded-[32px] p-8 sm:p-10 shadow-2xl">
            <div>
              <h3 className="text-xl font-black uppercase text-white tracking-wide font-display mb-8">
                CodeLuxe Contacts
              </h3>
              
              <div className="flex flex-col gap-6.5">
                {coordinates.map((coord, index) => (
                  <a
                    key={index}
                    href={coord.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4.5 items-center group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-accent-red/5 border border-accent-red/15 flex items-center justify-center shrink-0 group-hover:bg-accent-red/10 group-hover:border-accent-red/35 transition-all duration-300">
                      {coord.icon}
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-black tracking-widest text-text-secondary block font-display">
                        {coord.label}
                      </span>
                      <span className="text-white text-sm sm:text-base font-bold group-hover:text-accent-red transition-colors font-sans mt-0.5 block">
                        {coord.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <span className="text-[9px] uppercase font-black tracking-widest text-text-secondary block mb-3.5 font-display">
                DIRECT CHAT DISPATCH
              </span>
              <a
                href="https://api.whatsapp.com/send/?phone=919999999999&text=Hello+CODELUXE%21+I+would+like+to+get+started."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#25d366]/20 transition-all duration-300 cursor-pointer"
              >
                <FaWhatsapp className="w-4.5 h-4.5" />
                Chat with Developer
              </a>
            </div>
          </div>

          {/* Mobile Info Card (max-height: 220px) */}
          <div className="flex lg:hidden flex-col justify-center gap-2.5 w-full bg-white/2 border border-white/5 rounded-2xl p-4 shadow-2xl max-h-[220px] overflow-hidden">
            {coordinates.map((coord, index) => (
              <a
                key={index}
                href={coord.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/2 hover:border-accent-red/20 transition-all duration-300"
              >
                <div className="shrink-0 text-accent-red">
                  {coord.icon}
                </div>
                <div className="text-left">
                  <span className="text-white text-[13px] font-bold font-sans block leading-none">
                    {coord.value}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form Side */}
          <div className="lg:col-span-3 glass-card border border-white/5 rounded-[32px] p-6 sm:p-10 flex flex-col justify-center shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2 md:gap-6">
              
              {/* Name Field (Floating Label) */}
              <div className="relative w-full text-left">
                <input
                  type="text"
                  name="name"
                  id="form-name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                  className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:border-accent-red transition-all"
                />
                <motion.label
                  htmlFor="form-name"
                  className="absolute left-4 pointer-events-none text-text-secondary text-xs font-black tracking-wider font-display"
                  initial={false}
                  animate={{
                    top: focusedField === 'name' || formData.name ? '6px' : '17px',
                    fontSize: focusedField === 'name' || formData.name ? '8px' : '11px',
                    color: focusedField === 'name' ? '#FF2B2B' : '#B5B5B5',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  FULL NAME
                </motion.label>
              </div>

              {/* Email Field (Floating Label) */}
              <div className="relative w-full text-left">
                <input
                  type="email"
                  name="email"
                  id="form-email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                  className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:border-accent-red transition-all"
                />
                <motion.label
                  htmlFor="form-email"
                  className="absolute left-4 pointer-events-none text-text-secondary text-xs font-black tracking-wider font-display"
                  initial={false}
                  animate={{
                    top: focusedField === 'email' || formData.email ? '6px' : '17px',
                    fontSize: focusedField === 'email' || formData.email ? '8px' : '11px',
                    color: focusedField === 'email' ? '#FF2B2B' : '#B5B5B5',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  EMAIL ADDRESS
                </motion.label>
              </div>

              {/* Project Type Selector */}
              <div className="relative w-full text-left">
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-bg-secondary border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-accent-red transition-all appearance-none cursor-pointer font-sans font-semibold"
                >
                  <option value="Static Website">Static Website (from ₹5,000)</option>
                  <option value="Business / E-Commerce">Business / E-Commerce (from ₹11,000)</option>
                  <option value="Custom 3D / Web3">Custom Web3 & 3D Development</option>
                  <option value="Consulting / Mockups">Other Consulting</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary text-[8px] font-bold">
                  ▼
                </div>
              </div>

              {/* Message Field (Floating Label) */}
              <div className="relative w-full text-left">
                <textarea
                  name="message"
                  id="form-message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                  className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:border-accent-red transition-all resize-none"
                />
                <motion.label
                  htmlFor="form-message"
                  className="absolute left-4 pointer-events-none text-text-secondary text-xs font-black tracking-wider font-display"
                  initial={false}
                  animate={{
                    top: focusedField === 'message' || formData.message ? '6px' : '17px',
                    fontSize: focusedField === 'message' || formData.message ? '8px' : '11px',
                    color: focusedField === 'message' ? '#FF2B2B' : '#B5B5B5',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  PROJECT DETAILS / MESSAGE
                </motion.label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl btn-primary text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent-red/25 hover:shadow-accent-red/45"
              >
                Send Proposal Inquiry
                <Send className="w-3.5 h-3.5" />
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
