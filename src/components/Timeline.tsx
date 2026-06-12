import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WaveDivider from './WaveDivider';

gsap.registerPlugin(ScrollTrigger);

interface GalleryCard {
  id: number;
  image: string;
  title: string;
}

const ROW1: GalleryCard[] = [
  { id: 1, image: "assets/social/2.PNG", title: "Perfect Sizzle" },
  { id: 2, image: "assets/social/3.PNG", title: "Jaffa Assembly" },
  { id: 3, image: "assets/menu/menu_1.jpg", title: "Jaffa Classic" },
  { id: 4, image: "assets/social/full wrap.PNG", title: "Hand-Rolled Wrap" },
];

const ROW2: GalleryCard[] = [
  { id: 5, image: "assets/social/labenese shawarma.PNG", title: "Lebanese Plate" },
  { id: 6, image: "assets/menu/menu_2.jpg", title: "Authentic Platter" },
  { id: 7, image: "assets/social/sauce on chicken.PNG", title: "Signature Spices" },
  { id: 8, image: "assets/social/skewer.PNG", title: "Rotisserie Skewer" },
];

const ROW3: GalleryCard[] = [
  { id: 9, image: "assets/social/store.PNG", title: "Jaffa Outpost" },
  { id: 10, image: "assets/menu/menu_3.jpg", title: "Crispy Planches" },
  { id: 11, image: "assets/social/2.PNG", title: "Spice Marination" },
  { id: 12, image: "assets/menu/menu_4.jpg", title: "Double Garlic Toum" },
];

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll effect: offset the tracks slightly depending on scroll
      gsap.fromTo(".marquee-track-1", 
        { x: -120 },
        {
          x: 120,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      gsap.fromTo(".marquee-track-2", 
        { x: 120 },
        {
          x: -120,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      gsap.fromTo(".marquee-track-3", 
        { x: -140 },
        {
          x: 140,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Triple-duplicate each row for seamless marquee loops
  const doubleRow1 = [...ROW1, ...ROW1, ...ROW1];
  const doubleRow2 = [...ROW2, ...ROW2, ...ROW2];
  const doubleRow3 = [...ROW3, ...ROW3, ...ROW3];

  return (
    <section 
      id="journey" 
      ref={containerRef}
      className="relative py-28 md:py-36 overflow-hidden z-20 bg-luxury-bg-ivory/60"
    >
      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left 24s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 24s linear infinite;
        }
      `}</style>

      {/* Decorative glows */}
      <div className="absolute top-10 right-1/4 w-[450px] h-[450px] bg-luxury-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-luxury-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Title */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl mx-auto mb-20">
        <span className="font-inter text-xs uppercase text-luxury-accent-blue tracking-[0.3em] font-bold block mb-4">
          The Gallery
        </span>
        <h2 className="font-editorial text-3xl md:text-5xl text-luxury-text-black tracking-wide leading-tight uppercase font-black mb-4">
          INSIDE THE KITCHEN
        </h2>
        <div className="w-16 h-[2px] bg-luxury-accent-blue mx-auto mb-6" />
        <p className="font-playfair italic text-base text-zinc-500 leading-relaxed">
          A visual journey through our slow-roasted wraps, spiced platters, and storefront moments.
        </p>
      </div>

      {/* Diagonal Gallery Tracks Wrapper */}
      <div className="relative w-[120%] -left-[10%] flex flex-col gap-6 md:gap-8 skew-y-[-6deg] scale-[1.02] py-8 overflow-hidden pointer-events-auto">
        
        {/* Row 1: Left-to-Right */}
        <div className="w-full overflow-hidden flex">
          <div className="marquee-track-1 flex gap-6 md:gap-8 will-change-transform">
            <div className="flex gap-6 md:gap-8 animate-marquee-right">
              {doubleRow1.map((card, index) => (
                <div 
                  key={`r1-${card.id}-${index}`}
                  className="w-56 h-64 md:w-72 md:h-80 rounded-[2rem] overflow-hidden relative border border-zinc-200/40 shadow-[0_15px_35px_rgba(0,0,0,0.06)] bg-white group select-none flex-shrink-0"
                >
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 pointer-events-none" 
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="font-editorial text-sm font-bold text-white uppercase tracking-wider">{card.title}</span>
                    <span className="font-inter text-[9px] text-[#3B82F6] font-bold uppercase tracking-widest mt-1">@jaffashawarma</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Right-to-Left */}
        <div className="w-full overflow-hidden flex">
          <div className="marquee-track-2 flex gap-6 md:gap-8 will-change-transform">
            <div className="flex gap-6 md:gap-8 animate-marquee-left">
              {doubleRow2.map((card, index) => (
                <div 
                  key={`r2-${card.id}-${index}`}
                  className="w-56 h-64 md:w-72 md:h-80 rounded-[2rem] overflow-hidden relative border border-zinc-200/40 shadow-[0_15px_35px_rgba(0,0,0,0.06)] bg-white group select-none flex-shrink-0"
                >
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 pointer-events-none" 
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="font-editorial text-sm font-bold text-white uppercase tracking-wider">{card.title}</span>
                    <span className="font-inter text-[9px] text-[#3B82F6] font-bold uppercase tracking-widest mt-1">@jaffashawarma</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Left-to-Right */}
        <div className="w-full overflow-hidden flex">
          <div className="marquee-track-3 flex gap-6 md:gap-8 will-change-transform">
            <div className="flex gap-6 md:gap-8 animate-marquee-right">
              {doubleRow3.map((card, index) => (
                <div 
                  key={`r3-${card.id}-${index}`}
                  className="w-56 h-64 md:w-72 md:h-80 rounded-[2rem] overflow-hidden relative border border-zinc-200/40 shadow-[0_15px_35px_rgba(0,0,0,0.06)] bg-white group select-none flex-shrink-0"
                >
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 pointer-events-none" 
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="font-editorial text-sm font-bold text-white uppercase tracking-wider">{card.title}</span>
                    <span className="font-inter text-[9px] text-[#3B82F6] font-bold uppercase tracking-widest mt-1">@jaffashawarma</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* WaveDivider separating Gallery from InstagramGrid */}
      <WaveDivider height="h-16" backWaveColor="text-[#0E5BFF]/5" frontWaveColor="text-[#f8f7f4]" backWaveOpacity={0.4} />
    </section>
  );
};

export default Timeline;
