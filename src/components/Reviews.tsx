import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  location: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Arjun Verma",
    rating: 5,
    text: "The chicken is incredibly tender, and the garlic toum is hands down the best in Bhopal! This is not your average street food wrap; it feels very premium.",
    location: "Bhopal"
  },
  {
    id: 2,
    name: "Sara Khan",
    rating: 5,
    text: "Amazing taste! The classic roll is wrapped tightly and toasted perfectly. I also love the minimal branding and packaging. Clean and premium.",
    location: "Gulmohar"
  },
  {
    id: 3,
    name: "Rohan Sharma",
    rating: 5,
    text: "The Lebanese plate has massive portions. Sliced chicken breast is roasted to a perfect crispy char without being dry. High-quality meat.",
    location: "Arera Colony"
  },
  {
    id: 4,
    name: "Pooja Patel",
    rating: 5,
    text: "Hands down the most hygienic and tasty shawarma in the city. The spicy wrap has a genuine kick. Highly recommend Jaffa Gulmohar!",
    location: "MP Nagar"
  }
];

export const Reviews: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="reviews" className="relative py-24 md:py-32 overflow-hidden z-20">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] blue-glow-radial opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="font-inter text-xs uppercase text-luxury-accent-blue tracking-[0.3em] font-bold block mb-4">
            Testimonials
          </span>
          <h2 className="font-editorial text-3xl md:text-5xl text-luxury-text-black tracking-wide leading-tight uppercase font-black mb-4">
            CUSTOMER REVIEWS
          </h2>
          <div className="w-16 h-[2px] bg-luxury-accent-blue mx-auto mb-6" />
          <p className="font-playfair italic text-base text-zinc-500 leading-relaxed">
            Here's what our loyal community says about the Jaffa standard.
          </p>
        </div>

        {/* Reviews Horizontal Auto-Scroll (or Grid on small screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-zinc-200/50 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:border-luxury-accent-blue/30 transition-all duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-amber-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-inter text-xs text-zinc-500 leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-zinc-100 pt-4 flex justify-between items-center mt-auto">
                <span className="font-editorial text-sm font-bold text-luxury-text-black uppercase">
                  {review.name}
                </span>
                <span className="font-inter text-[9px] text-zinc-400 uppercase tracking-wider">
                  {review.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;
