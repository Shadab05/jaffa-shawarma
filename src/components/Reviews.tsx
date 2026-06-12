import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
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
    text: "The chicken is incredibly tender, and the garlic toum is hands down the best in Bhopal! This is not your average street wrap; it feels very premium.",
    location: "Bhopal"
  },
  {
    id: 2,
    name: "Sara Khan",
    rating: 5,
    text: "Amazing taste! The Jaffa Classic Roll is wrapped tightly and toasted perfectly. I also love the minimal packaging. Clean and premium.",
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
  },
  {
    id: 5,
    name: "Kabir Malhotra",
    rating: 5,
    text: "Ordered the Jaffa Platter at Vijay Nagar. The hummus is incredibly smooth, and the chicken has that authentic Lebanese sumac spice punch.",
    location: "Indore"
  },
  {
    id: 6,
    name: "Anjali Joshi",
    rating: 5,
    text: "The Cheese Blast Inferno is a revelation. Sizzling melted mozzarella combined with chicken shavings and volcano chili-garlic paste is pure bliss.",
    location: "TT Nagar"
  },
  {
    id: 7,
    name: "Devansh Gupta",
    rating: 5,
    text: "If you love shawarmas, Jaffa is the ultimate destination. Their garlic Toum is absolute magic and they don't compromise on hygiene.",
    location: "Kohefiza"
  },
  {
    id: 8,
    name: "Mehak Alvi",
    rating: 5,
    text: "Consistent quality every single time. The flatbread is always fresh and the chicken is slow-roasted to absolute perfection. Absolute favorite!",
    location: "Lalghati"
  }
];

export const Reviews: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Carousel states for Desktop
  const [rotationY, setRotationY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Auto-rotation animation loop for 3D Carousel on Desktop
  const animateRotation = (time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      if (!isHovered) {
        // Slow continuous rotation (0.015 degrees per millisecond)
        setRotationY((prev) => (prev + deltaTime * 0.015) % 360);
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateRotation);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateRotation);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered]);

  // Mobile Stacking Scroll Animation
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const triggers = gsap.utils.toArray('.testimonial-card-trigger');
      
      triggers.forEach((trigger: any, index: number) => {
        const card = trigger.querySelector('.testimonial-card');
        if (index === triggers.length - 1) return; // Last card sits on top of stack, stays unscaled

        const cardsRemaining = triggers.length - 1 - index;
        
        gsap.to(card, {
          scale: 1 - cardsRemaining * 0.05, // progress scale down
          opacity: 0.3,
          yPercent: -15 * cardsRemaining,
          scrollTrigger: {
            trigger: trigger,
            start: "top 130px",
            end: "bottom 130px",
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  // Handle Manual Navigation in 3D Cylinder
  const handleNav = (direction: 'left' | 'right') => {
    // Rotate by 45 degrees (360/8)
    const angle = 45;
    setRotationY((prev) => direction === 'left' ? prev - angle : prev + angle);
  };

  const radius = 480; // Radius of 3D cylinder in pixels

  return (
    <section id="reviews" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden z-20 bg-luxury-bg-ivory/35 border-t border-zinc-150">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-luxury-accent-blue/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
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

        {/* --- MOBILE VIEW: Sticky Stack Cards --- */}
        <div className="flex flex-col gap-[10vh] max-w-md mx-auto md:hidden pb-12">
          {REVIEWS.map((review, index) => (
            <div 
              key={review.id} 
              className="testimonial-card-trigger h-[320px] w-full relative"
              style={{
                zIndex: index + 10
              }}
            >
              <div 
                className="testimonial-card bg-gradient-to-br from-[#0E5BFF] to-[#1E40AF] text-white rounded-[2.5rem] p-8 border border-white/10 shadow-[0_20px_45px_rgba(14,91,255,0.22)] w-full h-full flex flex-col justify-between sticky top-[140px]"
              >
                <Quote className="absolute right-8 top-8 w-8 h-8 text-white/10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-5 text-amber-300">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-300 text-amber-300" />
                    ))}
                  </div>
                  <p className="font-inter text-xs text-white/90 leading-relaxed italic pr-4">
                    "{review.text}"
                  </p>
                </div>

                <div className="border-t border-white/15 pt-4 flex justify-between items-center mt-auto">
                  <span className="font-editorial text-xs font-black text-white uppercase tracking-wider">
                    {review.name}
                  </span>
                  <span className="font-inter text-[8px] text-white/70 uppercase tracking-widest font-extrabold">
                    {review.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- DESKTOP VIEW: 3D Spiral Cylinder Carousel --- */}
        <div className="hidden md:flex flex-col items-center justify-center h-[520px] relative w-full perspective-1000 z-10">
          
          {/* Navigation Controls */}
          <button
            onClick={() => handleNav('left')}
            className="absolute left-[5%] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-xl flex items-center justify-center text-luxury-text-charcoal hover:bg-luxury-accent-blue hover:text-white hover:border-transparent transition-all duration-300 z-30 cursor-none"
            aria-label="Previous Review"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={() => handleNav('right')}
            className="absolute right-[5%] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-xl flex items-center justify-center text-luxury-text-charcoal hover:bg-luxury-accent-blue hover:text-white hover:border-transparent transition-all duration-300 z-30 cursor-none"
            aria-label="Next Review"
          >
            <ChevronRight size={20} />
          </button>

          {/* 3D Carousel Stage */}
          <div 
            className="relative w-[340px] h-[340px] transition-transform duration-500 ease-out"
            style={{
              transform: "rotateX(-5deg)", // slight tilt for better 3D depth
              transformStyle: "preserve-3d"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              previousTimeRef.current = null; // reset timestamp delta
            }}
          >
            {/* Cylinder Track */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `rotateY(${-rotationY}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
              }}
            >
              {REVIEWS.map((review, index) => {
                const angle = index * 45; // 360 / 8 reviews
                
                // Spiral height offset (creates a continuous spiral going up/down)
                const yOffset = (index - 3.5) * 16; 

                // Calculate opacity based on front focus. The card facing front (close to 0 deg relative to screen) is 100% visible
                // Card is facing screen when its net angle (angle - rotationY) is multiple of 360
                const relativeAngle = ((angle - rotationY) % 360 + 360) % 360;
                const isFacingFront = relativeAngle < 60 || relativeAngle > 300;
                const opacity = isFacingFront ? 1.0 : (relativeAngle > 120 && relativeAngle < 240 ? 0.08 : 0.35);

                return (
                  <div
                    key={review.id}
                    className="absolute inset-0 w-full h-full transition-opacity duration-500"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      opacity: opacity
                    }}
                  >
                    <div 
                      className={`w-full h-full bg-gradient-to-br from-[#0E5BFF] via-[#0C52E4] to-[#1E40AF] text-white rounded-[2.5rem] p-7 border border-white/15 flex flex-col justify-between transition-all duration-300 relative overflow-hidden select-none ${
                        isFacingFront 
                          ? 'shadow-[0_25px_50px_rgba(14,91,255,0.3)] border-white/30 scale-[1.03]' 
                          : 'shadow-md border-white/5 saturate-[0.7] scale-95'
                      }`}
                    >
                      {/* Backlit card radial glow */}
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                      <Quote className="absolute right-6 top-6 w-7 h-7 text-white/10 pointer-events-none" />

                      <div className="relative z-10">
                        {/* Rating Stars */}
                        <div className="flex gap-1 mb-5 text-amber-300">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} size={13} className="fill-amber-300 text-amber-300" />
                          ))}
                        </div>

                        {/* Review text */}
                        <p className="font-inter text-[11px] leading-relaxed text-white/90 italic pr-3">
                          "{review.text}"
                        </p>
                      </div>

                      {/* Author */}
                      <div className="border-t border-white/15 pt-4 flex justify-between items-center mt-auto relative z-10">
                        <span className="font-editorial text-xs font-black text-white uppercase tracking-wider">
                          {review.name}
                        </span>
                        <span className="font-inter text-[8px] text-white/70 uppercase tracking-widest font-extrabold">
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

      </div>
    </section>
  );
};

export default Reviews;
