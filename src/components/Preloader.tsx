import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

// Repeating geometric SVG latticework panel (Islamic star mesh/mashrabiya)
const LatticeworkPattern: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="lattice" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        <path d="M0 0 L40 40 M40 0 L0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
        <circle cx="20" cy="20" r="8" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
        <rect x="13" y="13" width="14" height="14" fill="none" stroke="#FFFFFF" strokeWidth="0.5" transform="rotate(45 20 20)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#lattice)" />
  </svg>
);

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'dark' | 'flicker' | 'lit' | 'opening' | 'done'>('dark');

  useEffect(() => {
    // 1. Remain dark for 600ms
    const t1 = setTimeout(() => {
      setStep('flicker');
    }, 600);

    // 2. Flicker neon for 1400ms, then stay fully lit
    const t2 = setTimeout(() => {
      setStep('lit');
    }, 2000);

    // 3. Keep lit storefront, then begin roll-up shutter reveal
    const t3 = setTimeout(() => {
      setStep('opening');
    }, 3200);

    // 4. Fade/Zoom out the entire storefront layer
    const t4 = setTimeout(() => {
      setStep('done');
      // Wait for fadeout animation before trigger unmount
      setTimeout(onComplete, 800);
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const isFlicker = step === 'flicker';
  const isLit = step === 'lit' || step === 'opening' || step === 'done';
  const isOpening = step === 'opening' || step === 'done';

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={step === 'done' ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[99999] bg-transparent overflow-hidden flex flex-col justify-center items-center select-none pointer-events-auto"
    >
      {/* Neon flicker CSS keyframe setup */}
      <style>{`
        @keyframes neon-glow {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            color: #FFFFFF;
            text-shadow: 
              0 0 8px rgba(14, 91, 255, 0.95),
              0 0 20px rgba(14, 91, 255, 0.75),
              0 0 35px rgba(59, 130, 246, 0.6),
              0 0 55px rgba(14, 91, 255, 0.45);
          }
          20%, 24%, 55% {
            color: rgba(147, 197, 253, 0.15);
            text-shadow: none;
          }
        }
        .animate-neon-glow {
          animation: neon-glow 1.8s infinite;
        }
      `}</style>

      {/* Main Storefront Frame */}
      <div className="relative w-full h-full flex flex-col bg-transparent overflow-hidden">
        
        {/* TOP PANEL: Backlit Signboard (Thinner height: 14% to 16%) */}
        <div className="relative w-full h-[14%] md:h-[16%] bg-[#080E24] border-b-[4px] border-[#0d1637] flex flex-col items-center justify-center overflow-hidden z-40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          
          {/* Latticework star panel */}
          <LatticeworkPattern />

          {/* Cool blue background lighting on latticework */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,91,255,0.08)_0%,transparent_75%)] transition-opacity duration-1000"
            style={{ opacity: isLit ? 1 : 0.2 }}
          />

          {/* Glowing Cursive Neon Sign */}
          <div className="relative select-none pointer-events-none">
            <h1
              className={`font-normal text-[36px] md:text-[48px] leading-none text-center transition-all duration-300 ${
                isFlicker ? 'animate-neon-glow' : ''
              }`}
              style={{
                fontFamily: "'Pacifico', cursive",
                color: isLit ? '#FFFFFF' : isFlicker ? undefined : 'rgba(147, 197, 253, 0.25)',
                textShadow: isLit
                  ? '0 0 8px rgba(14, 91, 255, 0.95), 0 0 20px rgba(14, 91, 255, 0.75), 0 0 35px rgba(59, 130, 246, 0.6), 0 0 55px rgba(14, 91, 255, 0.45)'
                  : undefined,
              }}
            >
              jaffa
            </h1>
          </div>
        </div>

        {/* BOTTOM BODY: Shutter area */}
        <div className="w-full flex-1 flex relative bg-transparent overflow-hidden">
          
          {/* Left Architectural Pillar */}
          <div className="w-8 md:w-24 h-full bg-[#080E24] border-r-[4px] border-[#0d1637] relative hidden sm:flex justify-center items-center overflow-hidden z-40 shadow-[4px_0_15px_rgba(0,0,0,0.4)]">
            <LatticeworkPattern />
            {/* Cool Blue Ambient Backlight Inside Pillar */}
            <div 
              className="absolute inset-y-12 inset-x-3 bg-[radial-gradient(circle_at_center,rgba(14,91,255,0.08)_0%,transparent_70%)] transition-opacity duration-1000 rounded-full"
              style={{ opacity: isLit ? 1 : 0 }}
            />
          </div>

          {/* Shutter Reveal Center Bay */}
          <div className="flex-1 h-full relative overflow-hidden bg-transparent">
            
            {/* No kitchen silhouettes or backgrounds — transparent reveal of the Hero section */}

            {/* METAL ROLL-UP SHUTTER (Fully closed at start: translateY(0%)) */}
            <div
              className="absolute inset-0 w-full h-full z-30 transition-transform duration-[1800ms] ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto"
              style={{
                transform: isOpening ? 'translateY(-100%)' : 'translateY(0%)',
                // Realistic metal slats texture using repeating gradients
                background: 'repeating-linear-gradient(to bottom, #111b3d, #111b3d 22px, #0e1633 24px, #090f23 26px)',
                boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.04), 0 4px 15px rgba(0,0,0,0.6)',
              }}
            >
              {/* Vertical rivet guides */}
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-zinc-950/40" />
              <div className="absolute right-6 top-0 bottom-0 w-[2px] bg-zinc-950/40" />

              {/* Shutter centered emblem */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                <div className="flex items-center gap-3 md:gap-5 mb-1 md:mb-2">
                  <div className="w-6 md:w-12 h-[1px] bg-zinc-400/30" />
                  <span 
                    style={{ fontFamily: "'Satisfy', cursive" }} 
                    className="text-white text-xl md:text-3xl tracking-wider opacity-85 select-none"
                  >
                    jaffa
                  </span>
                  <div className="w-6 md:w-12 h-[1px] bg-zinc-400/30" />
                </div>
                <span className="font-inter text-[8px] md:text-[10px] text-zinc-300 tracking-[0.45em] font-bold uppercase select-none opacity-75">
                  SHAWARMA
                </span>
              </div>
            </div>

          </div>

          {/* Right Architectural Pillar */}
          <div className="w-8 md:w-24 h-full bg-[#080E24] border-l-[4px] border-[#0d1637] relative hidden sm:flex justify-center items-center overflow-hidden z-40 shadow-[-4px_0_15px_rgba(0,0,0,0.4)]">
            <LatticeworkPattern />
            {/* Cool Blue Ambient Backlight Inside Pillar */}
            <div 
              className="absolute inset-y-12 inset-x-3 bg-[radial-gradient(circle_at_center,rgba(14,91,255,0.08)_0%,transparent_70%)] transition-opacity duration-1000 rounded-full"
              style={{ opacity: isLit ? 1 : 0 }}
            />
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Preloader;
