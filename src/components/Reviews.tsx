import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const cards = gsap.utils.toArray('.testimonial-card');
    
    // ScrollTrigger matchMedia for mobile stacking
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      cards.forEach((card: any, index: number) => {
        // Animate all cards except the very last one, which sits on top of the stack
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.35,
          yPercent: -12,
          scrollTrigger: {
            trigger: card,
            start: "top 120px",
            end: "bottom 120px",
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="reviews" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden z-20 bg-luxury-bg-ivory/30">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-luxury-accent-blue/5 rounded-full blur-[130px] pointer-events-none" />

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

        {/* Reviews stacking layout (flex-col for mobile, grid for desktop) */}
        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto pb-12 md:pb-0">
          {REVIEWS.map((review, index) => (
            <div
              key={review.id}
              style={{
                // Increment z-index on mobile so later cards lay naturally on top of older cards
                zIndex: index + 10
              }}
              className="testimonial-card bg-[#0E5BFF] text-white rounded-[2.5rem] p-8 md:p-6 lg:p-7 border border-white/10 shadow-[0_20px_50px_rgba(14,91,255,0.22)] relative overflow-hidden flex flex-col justify-between group transition-all duration-300 w-full sticky top-[130px] md:relative md:top-auto"
            >
              {/* Backlit glow details on cards */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
              
              {/* Quote icon background */}
              <Quote className="absolute right-6 top-6 w-8 h-8 text-white/10 pointer-events-none" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-amber-300">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-300 text-amber-300" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-inter text-xs text-white/90 leading-relaxed mb-8 italic">
                  "{review.text}"
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-white/15 pt-5 flex justify-between items-center mt-auto relative z-10">
                <span className="font-editorial text-sm font-black text-white uppercase tracking-wider">
                  {review.name}
                </span>
                <span className="font-inter text-[9px] text-white/70 uppercase tracking-widest font-extrabold">
                  {review.location}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;
