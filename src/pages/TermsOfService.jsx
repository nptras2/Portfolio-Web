import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Clock, CreditCard, RefreshCw, FileText, Award, AlertTriangle, XOctagon, Mail } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      icon: <Laptop className="w-5 h-5 text-accent-red" />,
      title: 'Website Development Services',
      content: 'abcdwebsite provides custom website design, frontend development, 3D WebGL integration, database configuration, and optimization services. The detailed scope of work, technical specifications, and deliverables will be formally established in a separate digital quote or project proposal agreed upon before the project starts.'
    },
    {
      icon: <Clock className="w-5 h-5 text-accent-red" />,
      title: 'Project Timelines',
      content: 'Project timelines and target launch dates are estimations provided in good faith. We endeavor to meet all scheduled deadlines. However, delivery timelines are highly dependent on the client providing prompt content, feedback, reviews, and necessary account clearances. We are not responsible for delays caused by client response times.'
    },
    {
      icon: <CreditCard className="w-5 h-5 text-accent-red" />,
      title: 'Payment Terms & Scheduling',
      content: 'Payments must be made according to the milestones defined in your quote. Standard projects require an initial deposit (typically 50%) before design or development begins, with remaining milestone payments due upon design approval and final launch. Outstanding balances must be fully cleared before the site is migrated to live production servers.'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-accent-red" />,
      title: 'Revision Limits',
      content: 'Each development tier includes a set number of revision rounds (as specified in your packages details) to refine layout styles, text copy, and micro-interactions. Revision requests must be compiled into consolidated lists. Revisions exceeding the package allocation or requesting major structural changes post-approval will be billed at our standard hourly rate.'
    },
    {
      icon: <FileText className="w-5 h-5 text-accent-red" />,
      title: 'Client Responsibilities & Assets',
      content: 'Clients must supply all text copy, branding guides, logos, product images, and video files required for development. You represent and warrant that you own or have obtained all necessary copyright licenses and intellectual property clearances for all assets you provide. We do not provide copywriting or asset rights licensing audits.'
    },
    {
      icon: <Award className="w-5 h-5 text-accent-red" />,
      title: 'Intellectual Property Ownership',
      content: 'Upon receipt of final, cleared payment, abcdwebsite transfers full intellectual property ownership, design assets, and code repositories of the completed web build to the client. We reserve the right to display design screenshots, case studies, and live link walkthroughs of the finished project in our design portfolio.'
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-accent-red" />,
      title: 'Limitation of Liability',
      content: 'Under no circumstances shall abcdwebsite, its developers, or its partners be liable for any indirect, incidental, special, or consequential damages. This includes, without limitation, loss of business profits, data corruption, database downtime, server outages, transaction failures, or third-party service provider software glitches.'
    },
    {
      icon: <XOctagon className="w-5 h-5 text-accent-red" />,
      title: 'Cancellation & Refund Policy',
      content: 'Either party may terminate the development agreement upon written notice. If the project is cancelled by the client after work has commenced, the initial project deposit is strictly non-refundable to cover design labor, scheduling costs, and asset preparations. Refund details for incomplete milestones will be evaluated on a prorated basis.'
    },
    {
      icon: <Mail className="w-5 h-5 text-accent-red" />,
      title: 'Contact Information',
      content: 'For any legal inquiries, contract clarifications, or payment disputes related to these Terms of Service, please reach out to our team:\n\nEmail: team.abcdwebsite@gmail.com\nPhone: +91 91009 20018\nAddress: ABCDWEBSITE Creative Studio, India'
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
            TERMS & CONDITIONS
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
            Terms of Service
          </h1>
          <p className="text-text-secondary text-sm md:text-base mt-4 leading-relaxed font-sans max-w-2xl">
            Last Updated: August 2026. Please read these terms carefully before starting your web development project with abcdwebsite.
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

export default React.memo(TermsOfService);
