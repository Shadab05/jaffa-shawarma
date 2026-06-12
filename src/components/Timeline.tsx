import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WaveDivider from './WaveDivider';

interface Step {
  num: string;
  title: string;
  duration: string;
  description: string;
  asset: string;
  type: 'image' | 'video';
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "SUMAC & SPICE MARINATION",
    duration: "24 Hours",
    description: "Chicken thighs and breasts are marinated in sumac, toasted cumin, garlic, and Lebanese olive oil for deep seasoning.",
    asset: "assets/social/sauce on chicken.PNG",
    type: "image"
  },
  {
    num: "02",
    title: "THE ARTISANAL STACKING",
    duration: "1 Hour Stack",
    description: "Marinated layers are hand-skewered on the vertical spit, sandwiched with spiced fat caps to baste the meat naturally.",
    asset: "assets/social/skewer.PNG",
    type: "image"
  },
  {
    num: "03",
    title: "INFRARED FLAME ROASTING",
    duration: "Continuous Sizzle",
    description: "The skewer spins against intense ceramic heaters, sealing juices while crisping the outer edges to a golden-brown char.",
    asset: "assets/reels/reel_1.mp4",
    type: "video"
  },
  {
    num: "04",
    title: "PRECISE RIBBON CARVING",
    duration: "Carved to Order",
    description: "Our carving masters shave paper-thin ribbons off the outer crust only when your order is placed, capturing peak freshness.",
    asset: "assets/reels/reel_3.mp4",
    type: "video"
  },
  {
    num: "05",
    title: "THE TOUM & WRAP SEAL",
    duration: "2 Minutes",
    description: "Ribbons are hand-rolled in flatbread with thick garlic toum and cucumbers, then toasted on the plancha till crisp.",
    asset: "assets/social/2.PNG",
    type: "image"
  }
];

export const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="journey" className="relative py-24 md:py-32 overflow-hidden z-20 bg-luxury-bg-ivory/50">
      {/* Glow Backdrops */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] blue-glow-radial opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] amber-glow-radial opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="font-inter text-xs uppercase text-luxury-accent-blue tracking-[0.3em] font-bold block mb-4">
            The Process
          </span>
          <h2 className="font-editorial text-3xl md:text-5xl text-luxury-text-black tracking-wide leading-tight uppercase font-black mb-4">
            CRAFTING STAGE BY STAGE
          </h2>
          <div className="w-16 h-[2px] bg-luxury-accent-blue mx-auto mb-6" />
          <p className="font-playfair italic text-base text-zinc-500 leading-relaxed">
            Follow the chronological pipeline of our signature Lebanese culinary assembly.
          </p>
        </div>

        {/* Horizontal Journey Timeline Line */}
        <div className="relative flex justify-between items-center max-w-4xl mx-auto mb-20 px-4">
          {/* Base Gray Connection Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] bg-zinc-200/60 rounded-full z-0" />
          
          {/* Active Sliding Progress Blue Line */}
          <motion.div 
            className="absolute left-6 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-[#0E5BFF] to-[#3B82F6] rounded-full z-0"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeTab / (STEPS.length - 1)) * 98}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Nodes */}
          {STEPS.map((step, index) => {
            const isActive = activeTab === index;
            const isCompleted = index < activeTab;
            
            return (
              <button
                key={step.num}
                onClick={() => setActiveTab(index)}
                className="relative z-10 flex flex-col items-center cursor-none focus:outline-none group"
              >
                {/* Node circle */}
                <motion.div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-editorial font-bold text-xs transition-all duration-300 border-[3px] ${
                    isActive
                      ? 'bg-gradient-to-br from-[#0E5BFF] to-[#3B82F6] text-white border-white shadow-[0_0_20px_rgba(14,91,255,0.4)] scale-110'
                      : isCompleted
                        ? 'bg-blue-50 text-luxury-accent-blue border-luxury-accent-blue/40'
                        : 'bg-white text-zinc-400 border-zinc-200'
                  }`}
                  whileHover={{ scale: 1.15 }}
                >
                  {step.num}
                </motion.div>

                {/* Vertical floating line for active step */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute top-12 w-[2px] h-4 bg-luxury-accent-blue/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Horizontal journey text label below the node */}
                <span className={`absolute top-16 font-inter text-[9px] md:text-[10px] tracking-widest uppercase font-extrabold transition-all duration-300 whitespace-nowrap hidden sm:block ${
                  isActive ? 'text-luxury-accent-blue scale-105' : 'text-zinc-400 group-hover:text-zinc-500'
                }`}>
                  {step.title.split(' ')[0]} {step.title.split(' ')[1] || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Split Screen Active Showcase */}
        <div className="max-w-5xl mx-auto mt-12 sm:mt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-[32px] p-6 md:p-10 shadow-[0_30px_70px_rgba(14,91,255,0.06)]"
            >
              
              {/* Detailed description column (5 Columns) */}
              <div className="lg:col-span-5 flex flex-col justify-center text-left">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] tracking-wider uppercase font-black text-white bg-luxury-accent-blue px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(14,91,255,0.2)]">
                    Stage {STEPS[activeTab].num}
                  </span>
                  <span className="font-mono text-[9px] tracking-wider uppercase text-luxury-accent-goldglow bg-amber-500/10 px-3 py-1 rounded-full font-black">
                    {STEPS[activeTab].duration}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl md:text-3xl tracking-wide uppercase font-black text-luxury-text-black mb-4 leading-tight">
                  {STEPS[activeTab].title}
                </h3>

                <p className="font-inter text-xs md:text-sm text-zinc-600 leading-relaxed mb-8">
                  {STEPS[activeTab].description}
                </p>

                {/* Quality checkpoints */}
                <div className="border-t border-zinc-200/60 pt-6 flex gap-6">
                  <div>
                    <h5 className="font-editorial text-[9px] tracking-wider uppercase text-zinc-400 font-extrabold">Quality Standard</h5>
                    <p className="font-inter text-xs text-luxury-text-charcoal font-bold mt-1">100% Authentic Lebanese</p>
                  </div>
                  <div className="w-[1px] h-8 bg-zinc-200/50" />
                  <div>
                    <h5 className="font-editorial text-[9px] tracking-wider uppercase text-zinc-400 font-extrabold">Assembly Type</h5>
                    <p className="font-inter text-xs text-luxury-text-charcoal font-bold mt-1">Artisanal Handcrafted</p>
                  </div>
                </div>
              </div>

              {/* Video/Image viewport showcase column (7 Columns) */}
              <div className="lg:col-span-7 h-[280px] md:h-[420px] rounded-[24px] overflow-hidden relative shadow-2xl group border border-white/40">
                {STEPS[activeTab].type === 'video' ? (
                  <video
                    src={STEPS[activeTab].asset}
                    loop
                    muted
                    playsInline
                    autoPlay
                    className="w-full h-full object-cover brightness-[0.95] group-hover:scale-[1.03] transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={STEPS[activeTab].asset}
                    alt={STEPS[activeTab].title}
                    className="w-full h-full object-cover brightness-[0.95] group-hover:scale-[1.03] transition-transform duration-700"
                  />
                )}
                
                {/* Subtle overlay shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* WaveDivider separating Timeline from InstagramGrid */}
      <WaveDivider height="h-16" backWaveColor="text-[#0E5BFF]/5" frontWaveColor="text-white" backWaveOpacity={0.4} />
    </section>
  );
};

export default Timeline;
