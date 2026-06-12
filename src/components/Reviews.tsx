import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  location: string;
}

const REVIEWS: Review[] = [
  { id: 1, name: "Arjun Verma",    rating: 5, text: "The chicken is incredibly tender, and the garlic toum is hands down the best in Bhopal! This is not your average street wrap; it feels very premium.", location: "Bhopal" },
  { id: 2, name: "Sara Khan",      rating: 5, text: "Amazing taste! The Jaffa Classic Roll is wrapped tightly and toasted perfectly. I also love the minimal packaging. Clean and premium.", location: "Gulmohar" },
  { id: 3, name: "Rohan Sharma",   rating: 5, text: "The Lebanese plate has massive portions. Sliced chicken breast is roasted to a perfect crispy char without being dry. High-quality meat.", location: "Arera Colony" },
  { id: 4, name: "Pooja Patel",    rating: 5, text: "Hands down the most hygienic and tasty shawarma in the city. The spicy wrap has a genuine kick. Highly recommend Jaffa Gulmohar!", location: "MP Nagar" },
  { id: 5, name: "Kabir Malhotra", rating: 5, text: "Ordered the Jaffa Platter at Vijay Nagar. The hummus is incredibly smooth, and the chicken has that authentic Lebanese sumac spice punch.", location: "Indore" },
  { id: 6, name: "Anjali Joshi",   rating: 5, text: "The Cheese Blast Inferno is a revelation. Sizzling melted mozzarella combined with chicken shavings and volcano chili-garlic paste is pure bliss.", location: "TT Nagar" },
  { id: 7, name: "Devansh Gupta",  rating: 5, text: "If you love shawarmas, Jaffa is the ultimate destination. Their garlic Toum is absolute magic and they don't compromise on hygiene.", location: "Kohefiza" },
  { id: 8, name: "Mehak Alvi",     rating: 5, text: "Consistent quality every single time. The flatbread is always fresh and the chicken is slow-roasted to absolute perfection. Absolute favorite!", location: "Lalghati" },
];

export const Reviews: React.FC = () => {
  // ── Desktop 3D Carousel ──────────────────────────────────────────
  const [rotationY, setRotationY]   = useState(0);
  const [isHovered, setIsHovered]   = useState(false);
  const requestRef    = useRef<number | null>(null);
  const prevTimeRef   = useRef<number | null>(null);

  const animateRotation = (time: number) => {
    if (prevTimeRef.current !== null) {
      const dt = time - prevTimeRef.current;
      if (!isHovered) setRotationY(prev => (prev + dt * 0.012) % 360);
    }
    prevTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateRotation);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateRotation);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isHovered]);

  const handleNav = (dir: 'left' | 'right') =>
    setRotationY(prev => dir === 'left' ? prev - 45 : prev + 45);

  const radius = 380; // wider cylinder — cards properly spaced apart

  return (
    <section id="reviews" className="relative bg-white z-20 py-24 md:py-32">
      {/* Background decorations wrapped to prevent horizontal overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-luxury-accent-blue/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[130px]" />
      </div>

      {/* ── Section Header ── */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
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
      </div>

      {/* ── MOBILE: CSS Sticky Stack ──────────────────────────────────
          All cards are siblings in the same parent container with position: sticky.
          Each card pins at a slightly staggered top offset.
          Because they are in the same container, they stack on top of each other
          and remain stacked until the entire section is scrolled past.
      ─────────────────────────────────────────────────────────────── */}
      <div className="md:hidden px-5 relative z-10 pb-[40px]">
        {REVIEWS.slice(0, 6).map((review, index) => (
          <div
            key={review.id}
            style={{
              position: 'sticky',
              top: `${80 + index * 16}px`, // staggered top to create the book stack effect
              zIndex: index + 1,           // later cards sit on top of earlier ones
            }}
            className="mb-6 last:mb-0"
          >
            <div className="bg-gradient-to-br from-[#0E5BFF] to-[#1E40AF] text-white rounded-[2rem] px-6 py-6 border border-white/10 shadow-[0_14px_35px_rgba(14,91,255,0.28)] relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />
              <Quote className="absolute right-5 top-5 w-6 h-6 text-white/10 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-3 text-amber-300">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-300 text-amber-300" />
                  ))}
                </div>
                <p className="font-inter text-[11px] text-white/90 leading-relaxed italic pr-6 mb-4">
                  "{review.text}"
                </p>
                <div className="border-t border-white/15 pt-3 flex justify-between items-center">
                  <span className="font-editorial text-[11px] font-black text-white uppercase tracking-wider">
                    {review.name}
                  </span>
                  <span className="font-inter text-[8px] text-white/70 uppercase tracking-widest font-extrabold">
                    {review.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: 3D Rotating Cylinder ─────────────────────────── */}
      <div
        className="hidden md:flex flex-col items-center justify-center h-[410px] relative w-full z-10"
        style={{ perspective: '1200px' }}
      >
        {/* Arrow nav */}
        <button
          onClick={() => handleNav('left')}
          className="absolute left-[5%] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-zinc-200 shadow-xl flex items-center justify-center text-luxury-text-charcoal hover:bg-luxury-accent-blue hover:text-white hover:border-transparent transition-all duration-300 z-30 cursor-none"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => handleNav('right')}
          className="absolute right-[5%] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-zinc-200 shadow-xl flex items-center justify-center text-luxury-text-charcoal hover:bg-luxury-accent-blue hover:text-white hover:border-transparent transition-all duration-300 z-30 cursor-none"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>

        {/* 3D Stage */}
        <div
          style={{
            width: '240px',
            height: '210px',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-5deg)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); prevTimeRef.current = null; }}
        >
          {/* Rotating cylinder track */}
          <div
            style={{
              position: 'absolute', inset: 0,
              transformStyle: 'preserve-3d',
              transform: `rotateY(${-rotationY}deg)`,
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {REVIEWS.map((review, index) => {
              const angle       = index * 45; // 360/8
              const yOffset     = (index - 3.5) * 12;
              const relAngle    = ((angle - rotationY) % 360 + 360) % 360;
              const isFront     = relAngle < 60 || relAngle > 300;
              const opacity     = isFront ? 1 : (relAngle > 120 && relAngle < 240 ? 0.06 : 0.32);

              return (
                <div
                  key={review.id}
                  style={{
                    position: 'absolute', inset: 0,
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px)`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden' as any,
                    opacity,
                    transition: 'opacity 0.45s',
                  }}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br from-[#0E5BFF] via-[#0C52E4] to-[#1E40AF] text-white rounded-[2rem] p-6 border border-white/15 flex flex-col justify-between relative overflow-hidden select-none transition-all duration-300 ${
                      isFront
                        ? 'shadow-[0_20px_40px_rgba(14,91,255,0.30)] border-white/30 scale-[1.04]'
                        : 'shadow-md border-white/5 saturate-[0.65] scale-95'
                    }`}
                  >
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none" />
                    <Quote className="absolute right-5 top-5 w-6 h-6 text-white/10 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex gap-0.5 mb-3 text-amber-300">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-300 text-amber-300" />
                        ))}
                      </div>
                      <p className="font-inter text-[10px] leading-relaxed text-white/90 italic pr-2 line-clamp-5">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="border-t border-white/15 pt-3 flex justify-between items-center mt-auto relative z-10">
                      <span className="font-editorial text-[10px] font-black text-white uppercase tracking-wide">
                        {review.name}
                      </span>
                      <span className="font-inter text-[7px] text-white/70 uppercase tracking-widest font-extrabold">
                        {review.location}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
