import React from 'react';
import Navbar3DLogo from './Navbar3DLogo';

// Hand-sketched outline SVGs to match the reference footer doodles
const SkewerDoodle: React.FC = () => (
  <svg className="w-12 h-16 opacity-[0.25] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 100 150">
    <line x1="50" y1="10" x2="50" y2="140" />
    <path d="M30,130 L70,130" />
    <path d="M40,135 L60,135" />
    {/* Stacked chicken pieces */}
    <path d="M40,30 C30,30 30,48 50,48 C70,48 70,30 60,30 Z" />
    <path d="M35,48 C22,48 22,70 50,70 C78,70 78,48 65,48 Z" />
    <path d="M30,70 C16,70 16,95 50,95 C84,95 84,70 70,70 Z" />
    <path d="M32,95 C20,95 20,118 50,118 C80,118 80,95 68,95 Z" />
    {/* Tomato on top */}
    <circle cx="50" cy="20" r="8" />
  </svg>
);

const FriesDoodle: React.FC = () => (
  <svg className="w-12 h-12 opacity-[0.25] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 100 100">
    {/* Fry box container */}
    <path d="M25,45 L75,45 L68,90 L32,90 Z" />
    <path d="M25,45 C35,50 65,50 75,45" />
    {/* French Fries sticking out */}
    <rect x="32" y="20" width="5" height="25" rx="1" />
    <rect x="39" y="12" width="5" height="33" rx="1" />
    <rect x="46" y="16" width="5" height="29" rx="1" />
    <rect x="53" y="10" width="5" height="35" rx="1" />
    <rect x="60" y="18" width="5" height="27" rx="1" />
    <rect x="67" y="14" width="5" height="31" rx="1" />
  </svg>
);

const WrapDoodle: React.FC = () => (
  <svg className="w-14 h-14 opacity-[0.25] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 100 100" style={{ transform: 'rotate(-15deg)' }}>
    {/* Rolled flatbread wrap */}
    <rect x="15" y="35" width="70" height="30" rx="12" />
    {/* Wrap fold lines */}
    <path d="M30,35 C42,42 58,42 70,35" />
    <path d="M25,65 C40,58 60,58 75,65" />
    {/* Filling pieces poking out */}
    <path d="M12,42 C8,45 8,55 12,58" />
    <circle cx="10" cy="50" r="3" />
    <path d="M85,44 C88,42 92,48 90,52" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-28 border-t border-zinc-150 z-20 relative overflow-hidden">
      
      {/* Scattered Outline Doodles on the Left Corner */}
      <div className="absolute left-6 top-8 flex flex-col gap-6 pointer-events-none hidden md:flex">
        <div className="translate-x-2"><SkewerDoodle /></div>
        <div className="translate-x-12 -rotate-12"><FriesDoodle /></div>
        <div className="translate-x-4"><WrapDoodle /></div>
      </div>

      {/* Scattered Outline Doodles on the Right Corner */}
      <div className="absolute right-6 top-8 flex flex-col gap-6 pointer-events-none hidden md:flex items-end">
        <div className="-translate-x-2"><WrapDoodle /></div>
        <div className="-translate-x-12 rotate-12"><FriesDoodle /></div>
        <div className="-translate-x-4"><SkewerDoodle /></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Centered Logo block */}
        <div className="flex flex-col items-center justify-center mb-8">
          <Navbar3DLogo variant="footer" />
        </div>

        {/* Short tagline */}
        <p className="font-playfair italic text-sm text-zinc-400 max-w-sm text-center mb-10 leading-relaxed">
          Crafting premium, slow-roasted culinary masterpieces in Bhopal.
        </p>

        {/* Footer Navigation Link Line */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center items-center font-inter text-[9px] tracking-[0.2em] uppercase text-zinc-500 mb-8 border-b border-zinc-100 pb-8 w-full max-w-lg">
          <a href="#hero" className="hover:text-luxury-accent-blue transition-colors cursor-none">Landing</a>
          <a href="#story" className="hover:text-luxury-accent-blue transition-colors cursor-none">Our Story</a>
          <a href="#reveal" className="hover:text-luxury-accent-blue transition-colors cursor-none">3D Logo</a>
          <a href="#menu" className="hover:text-luxury-accent-blue transition-colors cursor-none">Menu</a>
          <a href="#outlets" className="hover:text-luxury-accent-blue transition-colors cursor-none">Locations</a>
        </div>

        {/* Copyright info */}
        <div className="text-center font-inter text-[9px] text-zinc-400 tracking-wider">
          <p>&copy; {new Date().getFullYear()} JAFFA SHAWARMA. All Rights Reserved.</p>
          <p className="mt-1 opacity-60">Hand-rolled & slow-cooked in Bhopal, MP.</p>
        </div>

      </div>

      {/* Light blue repeating wave banner at the very bottom (flowing animation) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 h-28 bg-transparent">
        <style>{`
          @keyframes wave-flow-fast {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes wave-flow-slow {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .animate-wave-fast {
            animation: wave-flow-fast 14s linear infinite;
          }
          .animate-wave-slow {
            animation: wave-flow-slow 22s linear infinite;
          }
        `}</style>
        
        {/* Layer 1: Back Wave (slightly darker sky blue, semi-transparent, moving slower in opposite direction) */}
        <div className="absolute inset-0 w-[200%] h-full flex animate-wave-slow opacity-45">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-1/2 h-full text-[#7DD3FC] fill-current flex-shrink-0">
            <path d="M0,40 C150,75 300,10 450,40 C600,75 750,10 900,40 C1050,75 1200,10 1350,40 C1500,75 1650,10 1800,40 L1800,100 L0,100 Z" />
          </svg>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-1/2 h-full text-[#7DD3FC] fill-current flex-shrink-0">
            <path d="M0,40 C150,75 300,10 450,40 C600,75 750,10 900,40 C1050,75 1200,10 1350,40 C1500,75 1650,10 1800,40 L1800,100 L0,100 Z" />
          </svg>
        </div>

        {/* Layer 2: Front Wave (bright light blue, moving faster) */}
        <div className="absolute inset-0 w-[200%] h-full flex animate-wave-fast">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-1/2 h-full text-[#BAE6FD] fill-current flex-shrink-0">
            <path d="M0,25 C120,60 240,0 360,25 C480,60 600,0 720,25 C840,60 960,0 1080,25 C1200,60 1320,0 1440,25 L1440,100 L0,100 Z" />
          </svg>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-1/2 h-full text-[#BAE6FD] fill-current flex-shrink-0">
            <path d="M0,25 C120,60 240,0 360,25 C480,60 600,0 720,25 C840,60 960,0 1080,25 C1200,60 1320,0 1440,25 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
