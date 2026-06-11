import React from 'react';
import { motion } from 'framer-motion';
import ThreeDLogo from './ThreeDLogo';
import WaveDivider from './WaveDivider';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-luxury-bg-ivory overflow-hidden z-10 pt-20 pb-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-luxury-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-luxury-accent-goldglow/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating abstract particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-luxury-accent-blue/15"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60 - Math.random() * 60],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* 3D WebGL Canvas Container - positioned in upper-middle */}
      <div className="relative w-full h-[40vh] md:h-[45vh] flex items-center justify-center mb-2 z-20">
        <ThreeDLogo />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative container mx-auto px-6 flex flex-col items-center justify-center text-center z-20 select-none pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Tagline */}
          <motion.span
            initial={{ letterSpacing: '0.2em', opacity: 0 }}
            animate={{ letterSpacing: '0.45em', opacity: 0.9 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="font-inter text-[9px] md:text-xs uppercase text-luxury-accent-blue tracking-[0.45em] block mb-4 font-bold"
          >
            SLOW-ROASTED • SHAVED • PERFECTED
          </motion.span>

          {/* Main Title */}
          <h1 className="font-editorial text-4xl md:text-6xl lg:text-7xl text-luxury-text-black tracking-[0.18em] uppercase font-black leading-none mb-4">
            JAFFA SHAWARMA
          </h1>

          {/* Subtitle */}
          <p className="font-playfair italic text-sm md:text-lg text-zinc-500 max-w-2xl mx-auto mb-8 tracking-wide leading-relaxed">
            Crafting premium, slow-roasted culinary masterpieces from <span className="text-luxury-accent-blue font-semibold">ancient Jaffa roots</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onExploreClick}
              className="px-7 py-3.5 bg-luxury-accent-blue text-white font-inter text-[9px] tracking-[0.2em] uppercase rounded-full shadow-[0_4px_16px_rgba(14,91,255,0.25)] hover:bg-luxury-accent-blueglow hover:shadow-[0_6px_22px_rgba(14,91,255,0.35)] transition-luxury font-bold cursor-none"
            >
              Explore Signature Menu
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04, boxShadow: '0 6px 22px rgba(14,91,255,0.35)' }}
              whileTap={{ scale: 0.96 }}
              href="https://wa.me/919303473703?text=Hi%20Jaffa%20Shawarma!%20I'd%20like%20to%20order."
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 bg-gradient-to-r from-[#0E5BFF] to-[#3B82F6] text-white font-inter text-[9px] tracking-[0.2em] uppercase rounded-full shadow-[0_4px_16px_rgba(14,91,255,0.2)] transition-luxury flex items-center justify-center text-center cursor-none font-bold"
            >
              Order on WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator prompt on the right side */}
      <div className="absolute bottom-24 right-8 flex flex-col items-center pointer-events-none opacity-60 z-20 hidden md:flex">
        <span 
          style={{ writingMode: 'vertical-lr' }} 
          className="font-inter text-[8px] tracking-[0.3em] uppercase text-zinc-500 mb-3 rotate-180 font-bold"
        >
          Scroll to Begin
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-zinc-400"
        />
      </div>

      {/* Flowing Wave Divider at the bottom - separates white hero from black VideoScroller */}
      <WaveDivider height="h-14" backWaveColor="text-[#0E5BFF]/10" frontWaveColor="text-[#000000]" backWaveOpacity={0.5} />
    </section>
  );
};

export default Hero;

