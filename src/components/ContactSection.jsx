import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneCode: '+91',
    phone: '',
    projectType: 'Static Website',
    message: '',
  });

  const [focusedField, setFocusedField] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: 'success', message: '' });
    }, 10000); // 10 seconds display time
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = (fieldName) => {
    if (focusedField === fieldName) setFocusedField(null);
  };

  const handleChange = (e) => {
    if (e.target.name === 'phone') {
      const numericVal = e.target.value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, phone: numericVal });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      showToast('error', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);

    try {
      const fullPhone = `${formData.phoneCode} ${formData.phone}`;

      if (!supabase) {
        // Fallback simulated success
        showToast('success', 'Your Request is submitted! We will contact you shortly, or you can WhatsApp us by clicking the WhatsApp icon.');
        setFormData({ name: '', email: '', phoneCode: '+91', phone: '', projectType: 'Static Website', message: '' });
        return;
      }

      const { error } = await supabase
        .from('quotes')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: fullPhone,
            subject: formData.projectType,
            message: formData.message
          }
        ]);

      if (error) throw error;

      showToast('success', 'Your Request is submitted! We will contact you shortly, or you can WhatsApp us by clicking the WhatsApp icon.');
      setFormData({ name: '', email: '', phoneCode: '+91', phone: '', projectType: 'Static Website', message: '' });
    } catch (error) {
      console.error('Error saving quote:', error);
      showToast('error', 'Failed to submit. Please click the WhatsApp button below to message us directly!');
    } finally {
      setSubmitting(false);
    }
  };

  const coordinates = [
    {
      icon: <Mail className="w-5 h-5 text-accent-red" />,
      label: 'Email Address',
      value: 'hello@abcdwebsite.com',
      href: 'mailto:hello@abcdwebsite.com',
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
                abcdwebsite Contacts
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
                href="https://api.whatsapp.com/send/?phone=919999999999&text=Hello+ABCD+WEBSITE%21+I+would+like+to+get+started."
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

              {/* Phone Field with Country Code Selection */}
              <div className="flex gap-3 w-full text-left">
                {/* Country Code Select */}
                <div className="relative w-[110px] shrink-0">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleChange}
                    className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-4 text-sm text-white focus:outline-none focus:border-accent-red transition-all appearance-none cursor-pointer font-sans font-semibold text-center"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+49">🇩🇪 +49</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary text-[8px] font-bold">
                    ▼
                  </div>
                </div>

                {/* Number Input */}
                <div className="relative flex-1">
                  <input
                    type="tel"
                    name="phone"
                    id="form-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => handleBlur('phone')}
                    required
                    pattern="[0-9]{10}"
                    className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-transparent focus:outline-none focus:border-accent-red transition-all font-sans font-semibold tracking-wider"
                  />
                  <motion.label
                    htmlFor="form-phone"
                    className="absolute left-4 pointer-events-none text-text-secondary text-xs font-black tracking-wider font-display"
                    initial={false}
                    animate={{
                      top: focusedField === 'phone' || formData.phone ? '6px' : '17px',
                      fontSize: focusedField === 'phone' || formData.phone ? '8px' : '11px',
                      color: focusedField === 'phone' ? '#FF2B2B' : '#B5B5B5',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    10-DIGIT MOBILE NUMBER
                  </motion.label>
                </div>
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

              {/* Toast Notification Container */}
              <AnimatePresence>
                {toast.show && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`p-4 rounded-xl border text-xs leading-relaxed font-sans font-bold flex flex-col gap-2 ${
                      toast.type === 'success'
                        ? 'border-accent-red/25 bg-accent-red/5 text-white shadow-[0_0_15px_rgba(255,43,43,0.1)]'
                        : 'border-amber-500/25 bg-amber-500/5 text-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse shrink-0" />
                      <span>{toast.message}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-xl btn-primary text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent-red/25 hover:shadow-accent-red/45 transition-all duration-300 ${submitting ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {submitting ? 'Sending Proposal Inquiry...' : 'Send Proposal Inquiry'}
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
