import React from 'react';
import Navbar3DLogo from './Navbar3DLogo';

// Hand-sketched outline SVGs to match the reference footer doodles
const SkewerDoodle: React.FC = () => (
  <svg className="w-12 h-16 opacity-[0.18] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 100 150">
    <line x1="50" y1="10" x2="50" y2="140" />
    <path d="M30,130 L70,130" />
    <path d="M40,135 L60,135" />
    <path d="M40,30 C30,30 30,48 50,48 C70,48 70,30 60,30 Z" />
    <path d="M35,48 C22,48 22,70 50,70 C78,70 78,48 65,48 Z" />
    <path d="M30,70 C16,70 16,95 50,95 C84,95 84,70 70,70 Z" />
    <path d="M32,95 C20,95 20,118 50,118 C80,118 80,95 68,95 Z" />
    <circle cx="50" cy="20" r="8" />
  </svg>
);

const FriesDoodle: React.FC = () => (
  <svg className="w-11 h-11 opacity-[0.18] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 100 100">
    <path d="M25,45 L75,45 L68,90 L32,90 Z" />
    <path d="M25,45 C35,50 65,50 75,45" />
    <rect x="32" y="20" width="5" height="25" rx="1" />
    <rect x="39" y="12" width="5" height="33" rx="1" />
    <rect x="46" y="16" width="5" height="29" rx="1" />
    <rect x="53" y="10" width="5" height="35" rx="1" />
    <rect x="60" y="18" width="5" height="27" rx="1" />
    <rect x="67" y="14" width="5" height="31" rx="1" />
  </svg>
);

const WrapDoodle: React.FC = () => (
  <svg className="w-12 h-12 opacity-[0.18] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 100 100">
    <rect x="15" y="35" width="70" height="30" rx="12" />
    <path d="M30,35 C42,42 58,42 70,35" />
    <path d="M25,65 C40,58 60,58 75,65" />
    <path d="M12,42 C8,45 8,55 12,58" />
    <circle cx="10" cy="50" r="3" />
    <path d="M85,44 C88,42 92,48 90,52" />
  </svg>
);

const SodaDoodle: React.FC = () => (
  <svg className="w-10 h-10 opacity-[0.16] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 100 100">
    <path d="M35,30 L65,30 L60,85 L40,85 Z" />
    <path d="M30,30 L70,30 L70,25 L30,25 Z" />
    <path d="M50,25 L60,8" />
  </svg>
);

const TomatoDoodle: React.FC = () => (
  <svg className="w-10 h-10 opacity-[0.16] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="35" />
    <circle cx="50" cy="50" r="25" strokeDasharray="3,3" />
    <circle cx="50" cy="50" r="7" />
  </svg>
);

const FalafelDoodle: React.FC = () => (
  <svg className="w-8 h-8 opacity-[0.18] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="30" strokeDasharray="3,3" />
    <circle cx="50" cy="50" r="12" />
    <circle cx="35" cy="40" r="2" />
    <circle cx="65" cy="45" r="2" />
    <circle cx="45" cy="62" r="2" />
  </svg>
);

const OnionDoodle: React.FC = () => (
  <svg className="w-12 h-8 opacity-[0.15] text-[#0E5BFF] fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 120 80">
    <ellipse cx="60" cy="40" rx="45" ry="25" />
    <ellipse cx="60" cy="40" rx="32" ry="16" />
    <ellipse cx="60" cy="40" rx="18" ry="8" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-28 z-20 relative overflow-hidden">
      
      {/* Dynamic Random Floating Doodles Background styling */}
      <style>{`
        @keyframes footer-float-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(25px, -15px) rotate(15deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes footer-float-2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 20px) rotate(-10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes footer-float-3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, 25px) rotate(8deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-f-float-1 { animation: footer-float-1 14s ease-in-out infinite; }
        .animate-f-float-2 { animation: footer-float-2 18s ease-in-out infinite; }
        .animate-f-float-3 { animation: footer-float-3 22s ease-in-out infinite; }
      `}</style>

      {/* Floating Doodles scattered across the background to fill empty space */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left Side Group */}
        <div className="absolute left-[5%] top-[10%] animate-f-float-1"><SkewerDoodle /></div>
        <div className="absolute left-[15%] top-[40%] animate-f-float-2 -rotate-12"><FriesDoodle /></div>
        <div className="absolute left-[3%] top-[70%] animate-f-float-3 rotate-45"><WrapDoodle /></div>
        <div className="absolute left-[20%] top-[80%] animate-f-float-1"><FalafelDoodle /></div>

        {/* Right Side Group */}
        <div className="absolute right-[5%] top-[12%] animate-f-float-3 rotate-12"><WrapDoodle /></div>
        <div className="absolute right-[18%] top-[35%] animate-f-float-1 -rotate-45"><SodaDoodle /></div>
        <div className="absolute right-[3%] top-[65%] animate-f-float-2"><SkewerDoodle /></div>
        <div className="absolute right-[22%] top-[75%] animate-f-float-3"><TomatoDoodle /></div>

        {/* Inner Scattered elements */}
        <div className="absolute left-[32%] top-[15%] animate-f-float-2"><TomatoDoodle /></div>
        <div className="absolute right-[35%] top-[20%] animate-f-float-1"><OnionDoodle /></div>
        <div className="absolute left-[38%] top-[80%] animate-f-float-3"><FriesDoodle /></div>
        <div className="absolute right-[32%] top-[75%] animate-f-float-2"><FalafelDoodle /></div>
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
        <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center items-center font-inter text-[9px] tracking-[0.2em] uppercase text-zinc-500 mb-6 w-full max-w-lg">
          <a href="#hero" className="hover:text-luxury-accent-blue transition-colors cursor-none">Landing</a>
          <a href="#story" className="hover:text-luxury-accent-blue transition-colors cursor-none">Our Story</a>
          <a href="#menu" className="hover:text-luxury-accent-blue transition-colors cursor-none">Menu</a>
          <a href="#journey" className="hover:text-luxury-accent-blue transition-colors cursor-none">Gallery</a>
          <a href="#outlets" className="hover:text-luxury-accent-blue transition-colors cursor-none">Kitchens</a>
          <a href="#social" className="hover:text-luxury-accent-blue transition-colors cursor-none">Journal</a>
        </div>

        {/* Order Delivery Platforms */}
        <div className="flex gap-4 justify-center items-center mb-8 border-b border-zinc-100 pb-8 w-full max-w-lg">
          <a 
            href="https://www.swiggy.com/search?query=Jaffa+Shawarma" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FC8019]/10 text-[#FC8019] hover:bg-[#FC8019] hover:text-white transition-all duration-300 border border-[#FC8019]/25 font-inter text-[10px] tracking-wider uppercase font-bold cursor-none"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.034 24c-.376-.411-2.075-2.584-3.95-5.513-.547-.916-.901-1.63-.833-1.814.178-.48 3.355-.743 4.333-.308.298.132.29.307.29.409 0 .44-.022 1.619-.022 1.619a.441.441 0 1 0 .883-.002l-.005-2.939c0-.255-.278-.319-.331-.329-.511-.002-1.548-.006-2.661-.006-2.457 0-3.006.101-3.423-.172-.904-.591-2.383-4.577-2.417-6.819C3.849 4.964 5.723 2.225 8.362.868A8.13 8.13 0 0 1 12.026 0c4.177 0 7.617 3.153 8.075 7.209l.001.011c.084.981-5.321 1.189-6.39.904-.164-.044-.206-.212-.206-.284L13.5 4.996a.442.442 0 0 0-.884.002l.009 3.866a.33.33 0 0 0 .268.32l3.354-.001c1.79 0 2.542.207 3.042.588.333.254.461.739.349 1.37C18.633 16.755 12.273 23.71 12.034 24z"/>
            </svg>
            Swiggy
          </a>
          <a 
            href="https://www.zomato.com/bhopal/jaffa-shawarma-arera-colony" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#CB192E]/10 text-[#CB192E] hover:bg-[#CB192E] hover:text-white transition-all duration-300 border border-[#CB192E]/25 font-inter text-[10px] tracking-wider uppercase font-bold cursor-none"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Zomato
          </a>
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
