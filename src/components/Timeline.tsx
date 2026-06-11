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

        {/* Process Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Interactive Steps list (Left Side - 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-start">
            {STEPS.map((step, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between cursor-none ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#0E5BFF] to-[#3B82F6] text-white border-transparent shadow-[0_12px_30px_rgba(14,91,255,0.25)] scale-[1.01]'
                      : 'bg-white/40 border-zinc-200/50 text-luxury-text-black hover:bg-white/75 hover:border-blue-500/20 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-center w-full mb-2">
                    <span className={`font-mono text-[9px] tracking-wider uppercase px-2.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-zinc-150 text-luxury-accent-blue'
                    }`}>
                      Step {step.num}
                    </span>
                    <span className={`font-mono text-[9px] tracking-wider uppercase ${
                      isActive ? 'text-blue-100' : 'text-zinc-400'
                    }`}>
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-editorial text-base md:text-lg tracking-wide uppercase font-black mb-2">
                    {step.title}
                  </h3>

                  {/* Accordion content: description is visible on active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-inter text-xs text-blue-50/90 leading-relaxed mt-2"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Interactive Viewport Showcase (Right Side - 7 Columns) */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-[32px] p-4 bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.04)] h-[380px] md:h-[480px] flex items-center justify-center overflow-hidden"
            >
              {STEPS[activeTab].type === 'video' ? (
                <video
                  src={STEPS[activeTab].asset}
                  loop
                  muted
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover rounded-2xl shadow-md"
                />
              ) : (
                <img
                  src={STEPS[activeTab].asset}
                  alt={STEPS[activeTab].title}
                  className="w-full h-full object-cover rounded-2xl shadow-md"
                />
              )}
            </motion.div>
          </div>

        </div>

      </div>

      {/* WaveDivider separating Timeline from InstagramGrid */}
      <WaveDivider height="h-16" backWaveColor="text-[#0E5BFF]/5" frontWaveColor="text-white" backWaveOpacity={0.4} />
    </section>
  );
};

export default Timeline;
