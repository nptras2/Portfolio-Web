import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Cookie, Server, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Eye className="w-5 h-5 text-accent-red" />,
      title: 'Information We Collect',
      content: 'We collect personal information that you voluntarily provide to us when submitting inquiries, requesting quotes, or contacting us through our website. This includes your name, email address, phone number, and any project-specific details you share. Additionally, we automatically collect certain technical data, such as your IP address, browser type, and device information, to improve site performance and analytics.'
    },
    {
      icon: <Lock className="w-5 h-5 text-accent-red" />,
      title: 'How We Use Your Information',
      content: 'Your information is used solely to deliver, improve, and personalize our web design and development services. Specifically, we use it to respond to your project requests, process quote submissions, send service-related updates, analyze website traffic patterns, and safeguard our website from security threats. We never sell or share your data with unauthorized third parties.'
    },
    {
      icon: <Cookie className="w-5 h-5 text-accent-red" />,
      title: 'Cookies & Tracking Technologies',
      content: 'We use cookies and similar tracking tools to enhance your browsing experience, remember your preferences, and track aggregate visitor traffic. You can configure your web browser settings to refuse cookies or alert you when they are being sent. Note that disabling cookies may affect the visual performance or functionality of certain custom 3D web elements.'
    },
    {
      icon: <Server className="w-5 h-5 text-accent-red" />,
      title: 'Third-Party Services',
      content: 'Our website integrates with trusted third-party providers, including Supabase (for secure database hosting and form submissions) and external CDN providers. These platforms collect and process data in accordance with their own strict privacy frameworks. We recommend reviewing their privacy statements to understand how your data is handled on their infrastructure.'
    },
    {
      icon: <Shield className="w-5 h-5 text-accent-red" />,
      title: 'Data Security & Protection',
      content: 'We implement industry-standard security measures, including SSL encryption and secure database access protocols, to protect your personal information from unauthorized access, alteration, or disclosure. However, no electronic transmission over the internet or cloud storage solution is 100% secure, and we cannot guarantee absolute data protection.'
    },
    {
      icon: <Mail className="w-5 h-5 text-accent-red" />,
      title: 'Contact Information',
      content: 'If you have any questions, concerns, or requests regarding this Privacy Policy or how we manage your personal information, please feel free to reach out to us directly:\n\nEmail: team.abcdwebsite@gmail.com\nPhone: +91 91009 20018\nHours: Mon - Sat, 10:00 AM - 7:00 PM IST'
    }
  ];

  return (
    <div className="relative min-h-screen bg-bg-primary pt-32 pb-24 overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-accent-red/[0.02] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent-red/[0.02] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-[0.15] pointer-events-none" />

      <div className="content-container relative z-10 max-w-4xl">
        {/* Page Header */}
        <motion.div 
          className="text-left mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent-red glow-text font-display block mb-3">
            LEGAL AGREEMENT
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-sm md:text-base mt-4 leading-relaxed font-sans max-w-2xl">
            Last Updated: August 2026. This policy outlines how abcdwebsite collects, processes, protects, and handles your personal and business data.
          </p>
        </motion.div>

        {/* Section Cards */}
        <div className="flex flex-col gap-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              className="glass-card p-8 sm:p-10 rounded-[32px] text-left border border-white/5 hover:border-accent-red/35 flex flex-col sm:flex-row gap-6 items-start"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-12 h-12 rounded-2xl bg-accent-red/5 border border-accent-red/20 flex items-center justify-center text-accent-red shrink-0 mt-0.5 shadow-[0_0_15px_rgba(255,43,43,0.1)]">
                {section.icon}
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-extrabold text-white uppercase tracking-wider font-display mb-4">
                  {section.title}
                </h2>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-sans whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PrivacyPolicy);
