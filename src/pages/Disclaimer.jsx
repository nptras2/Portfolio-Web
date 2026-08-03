import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Image, Code2, Link2, HelpCircle, Mail } from 'lucide-react';

const Disclaimer = () => {
  const sections = [
    {
      icon: <Image className="w-5 h-5 text-accent-red" />,
      title: 'Client Content Responsibility',
      content: 'Clients are solely and fully responsible for all content, including text copy, images, product photos, illustrations, fonts, branding guides, and videos, provided to abcdwebsite for inclusion on their website. We develop using the materials supplied to us and assume that the client has verified the accuracy, quality, and complete structure of these materials.'
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-accent-red" />,
      title: 'No Responsibility for Infringement or Legality',
      content: 'abcdwebsite expressly disclaims all liability and responsibility for any copyrighted, trademark-infringing, illegal, misleading, deceptive, or libelous content provided by the client. We do not perform copyright searches, trademark verification, or legal audits on client materials. Any legal claims or issues resulting from client-supplied assets are the sole responsibility of the client.'
    },
    {
      icon: <Code2 className="w-5 h-5 text-accent-red" />,
      title: 'Scope of Services & Responsibility',
      content: 'Our professional responsibility is limited strictly to custom website design, frontend layout coding, 3D WebGL meshes, and backend database integrations (e.g. Supabase, hosting configs). We are not legal advisors, financial consultants, or compliance experts. The client must ensure that their finished website complies with local laws, industry regulations, and web accessibility standards.'
    },
    {
      icon: <Link2 className="w-5 h-5 text-accent-red" />,
      title: 'Third-Party Service Disclaimer',
      content: 'Any integrations, including payment processing (e.g., Stripe, PayPal), database networks (e.g., Supabase), domain registration, Web3 wallets, or hosting services (e.g., Vercel, Netlify), are governed by their respective third-party terms. We are not responsible for software failures, API deprecations, downtime, or rate-limit penalties originating from these third-party platforms.'
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-accent-red" />,
      title: 'No Guarantees on Performance & SEO Rankings',
      content: 'While we build high-performance websites optimized for search engines, abcdwebsite cannot guarantee specific Google search rankings, conversion rates, or traffic volumes. Search algorithms and market behaviors are outside of our control. We provide high-quality engineering and design foundations to maximize your odds of digital growth.'
    },
    {
      icon: <Mail className="w-5 h-5 text-accent-red" />,
      title: 'Contact Information',
      content: 'If you have any questions or require further explanation of this legal disclaimer, please do not hesitate to contact our creative studio:\n\nEmail: team.abcdwebsite@gmail.com\nPhone: +91 91009 20018\nHours: Mon - Sat, 10:00 AM - 7:00 PM IST'
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
            LEGAL DISCLAIMER
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
            Disclaimer
          </h1>
          <p className="text-text-secondary text-sm md:text-base mt-4 leading-relaxed font-sans max-w-2xl">
            Last Updated: August 2026. This legal disclaimer establishes terms of content liability, copyright accountability, and developer scope limitations.
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

export default React.memo(Disclaimer);
