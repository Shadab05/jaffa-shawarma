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
    <footer className="bg-white pt-24 pb-28 border-t border-zinc-150 z-20 relative overflow-hidden">
      
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
            <svg viewBox="0 0 24 24" className="w-9 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014z"/>
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
