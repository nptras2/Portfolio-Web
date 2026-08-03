import React, { useState, useEffect } from 'react';
import { Star, Building2, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';

const placeholders = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    company: 'Your Company Name',
    title: 'Chief Executive Officer',
    rating: 5,
    quote: 'This spot is reserved for our next premium project. Let\'s build a high-performance web experience together and feature your success story right here.',
    avatar_url: '',
    date: 'Q3 Launch',
  },
  {
    id: 2,
    name: 'David Chen',
    company: 'Future Enterprise',
    title: 'Product Director',
    rating: 5,
    quote: 'Partner with abcdwebsite to transform your ideas into luxury digital architectures. Your rating, logo, and review could be showcasing your digital growth here.',
    avatar_url: '',
    date: 'Next Project',
  }
];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!supabase) {
          setReviews(placeholders);
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setReviews(data);
        } else {
          setReviews(placeholders);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews(placeholders);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section 
      id="reviews" 
      className="py-14 md:py-32 bg-bg-primary relative overflow-hidden"
    >
      <div className="absolute top-1/2 right-[-10%] w-[450px] h-[450px] bg-accent-red/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          
          {/* Left Column: Heading Copy */}
          <div className="text-left flex flex-col items-start gap-6 lg:col-span-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent-red glow-text font-display">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
              Client Reviews
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans">
              We do not believe in fake testimonials. Instead, we let our engineering speak for itself. Partner with us, and your business success story will be featured here.
            </p>
            <button
              onClick={scrollToContact}
              className="px-7 py-3.5 rounded-full border border-accent-red/20 bg-accent-red/5 hover:bg-accent-red hover:text-white hover:shadow-[0_0_20px_rgba(255,43,43,0.35)] text-accent-red font-black text-xs uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 group cursor-pointer"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Desktop View: Testimonial Cards */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:col-span-2 items-stretch">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id || index}
                className="glass-card p-8 sm:p-10 rounded-[32px] text-left border border-white/5 flex flex-col justify-between group hover:border-accent-red/35"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1.5 mb-6">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent-red fill-accent-red/10 group-hover:fill-accent-red transition-all duration-300" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white font-medium text-sm sm:text-base leading-relaxed italic mb-8 font-sans">
                    "{review.quote}"
                  </p>
                </div>

                {/* Footer details */}
                <div className="flex items-center justify-between pt-5 border-t border-white/5 text-xs">
                  <div className="flex items-center gap-3">
                    {review.avatar_url ? (
                      <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-white/5 shrink-0">
                        <img src={review.avatar_url} alt={review.name || review.company} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-accent-red/5 border border-accent-red/20 flex items-center justify-center text-accent-red font-bold shrink-0">
                        {review.name ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                      </div>
                    )}
                    <div>
                      <span className="text-white font-extrabold font-display block text-sm">
                        {review.name || review.company}
                      </span>
                      <span className="text-text-secondary text-[10px] font-black uppercase tracking-wider font-sans">
                        {review.name ? [review.title, review.company].filter(Boolean).join(', ') : review.title}
                      </span>
                    </div>
                  </div>
                  {review.date && (
                    <span className="text-accent-red/90 font-mono font-black uppercase tracking-widest text-[10px]">{review.date}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile View: Single card carousel */}
          {reviews.length > 0 && (
            <div className="block md:hidden lg:col-span-2 w-full max-w-sm mx-auto">
              <div className="relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReviewIndex}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="glass-card p-6 rounded-[28px] text-left border border-white/5 flex flex-col justify-between min-h-[250px] shadow-2xl relative"
                  >
                    <div>
                      {/* Stars */}
                      <div className="flex items-center gap-1.5 mb-5">
                        {[...Array(reviews[activeReviewIndex]?.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-accent-red fill-accent-red" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-white font-medium text-[13px] leading-relaxed italic mb-6 font-sans">
                        "{reviews[activeReviewIndex]?.quote}"
                      </p>
                    </div>

                    {/* Footer details */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                      <div className="flex items-center gap-3">
                        {reviews[activeReviewIndex]?.avatar_url ? (
                          <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-white/5 shrink-0">
                            <img 
                              src={reviews[activeReviewIndex].avatar_url} 
                              alt={reviews[activeReviewIndex].name || reviews[activeReviewIndex].company} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-xl bg-accent-red/5 border border-accent-red/20 flex items-center justify-center text-accent-red shrink-0">
                            {reviews[activeReviewIndex]?.name ? (
                              <User className="w-3.5 h-3.5" />
                            ) : (
                              <Building2 className="w-3.5 h-3.5" />
                            )}
                          </div>
                        )}
                        <div>
                          <span className="text-white font-extrabold font-display block text-xs">
                            {reviews[activeReviewIndex]?.name || reviews[activeReviewIndex]?.company}
                          </span>
                          <span className="text-text-secondary text-[8px] font-black uppercase tracking-wider font-sans">
                            {reviews[activeReviewIndex]?.name 
                              ? [reviews[activeReviewIndex]?.title, reviews[activeReviewIndex]?.company].filter(Boolean).join(', ') 
                              : reviews[activeReviewIndex]?.title}
                          </span>
                        </div>
                      </div>
                      {reviews[activeReviewIndex]?.date && (
                        <span className="text-accent-red/90 font-mono font-black uppercase tracking-widest text-[9px]">{reviews[activeReviewIndex]?.date}</span>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-5 px-2 relative z-20">
                <button 
                  onClick={() => activeReviewIndex > 0 && setActiveReviewIndex(activeReviewIndex - 1)}
                  className={`px-5 py-2.5 rounded-full border text-[10px] font-black tracking-widest uppercase transition-all active:scale-95 cursor-pointer ${
                    activeReviewIndex > 0 
                      ? 'border-accent-red/35 text-accent-red hover:shadow-[0_0_12px_rgba(255,43,43,0.25)] bg-accent-red/5' 
                      : 'border-white/5 text-white/20 bg-transparent pointer-events-none'
                  }`}
                  aria-label="Previous review"
                >
                  ◀ PREV
                </button>

                <span className="font-mono text-xs font-black tracking-widest text-text-secondary">
                  {`0${activeReviewIndex + 1} / 0${reviews.length}`}
                </span>

                <button 
                  onClick={() => activeReviewIndex < reviews.length - 1 && setActiveReviewIndex(activeReviewIndex + 1)}
                  className={`px-5 py-2.5 rounded-full border text-[10px] font-black tracking-widest uppercase transition-all active:scale-95 cursor-pointer ${
                    activeReviewIndex < reviews.length - 1 
                      ? 'border-accent-red/35 text-accent-red hover:shadow-[0_0_12px_rgba(255,43,43,0.25)] bg-accent-red/5' 
                      : 'border-white/5 text-white/20 bg-transparent pointer-events-none'
                  }`}
                  aria-label="Next review"
                >
                  NEXT ▶
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ReviewsSection);
