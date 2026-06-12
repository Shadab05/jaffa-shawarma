import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WaveDivider from './WaveDivider';

// Repeating geometric SVG latticework panel for inside the story card
const LatticeworkPatternInsideCard: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="lattice-card" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M15 0 L30 15 L15 30 L0 15 Z" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        <path d="M0 0 L30 30 M30 0 L0 30" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
        <circle cx="15" cy="15" r="6" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
        <rect x="10" y="10" width="10" height="10" fill="none" stroke="#FFFFFF" strokeWidth="0.5" transform="rotate(45 15 15)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#lattice-card)" />
  </svg>
);

const STORY_VIDEOS = [
  {
    src: "assets/reels/reel_5.mp4",
    likes: "7.1K",
    comments: "310",
    caption: "Step into Jaffa Shawarma. Experience the authentic taste of the Middle East, crafted locally."
  },
  {
    src: "assets/reels/reel_1.mp4",
    likes: "4.8K",
    comments: "142",
    caption: "The golden spit JAFFA SHAWARMA cooking to perfection. Sizzling layers of spice and pure flavor."
  },
  {
    src: "assets/reels/reel_2.mp4",
    likes: "6.2K",
    comments: "284",
    caption: "Our signature garlic toum lathered onto fresh Lebanese flatbread. Hand-rolled with passion."
  }
];

export const OurStory: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % STORY_VIDEOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="story" className="relative py-24 md:py-32 overflow-hidden z-20 pb-36 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Story & Objective Text (Left Side - 6 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative rounded-[32px] p-8 md:p-10 bg-gradient-to-br from-[#0E5BFF] via-[#0A4DD4] to-[#052E91] text-white border border-[#0E5BFF]/35 shadow-[0_25px_60px_rgba(14,91,255,0.22)] overflow-hidden"
            >
              {/* Star Pattern Watermark */}
              <LatticeworkPatternInsideCard />

              <span className="font-inter text-xs uppercase text-blue-200 tracking-[0.3em] font-bold block mb-4 relative z-10">
                Our Heritage & Vision
              </span>
              
              <h2 className="font-editorial text-3xl md:text-5xl text-white tracking-wide leading-tight mb-8 uppercase font-black relative z-10">
                CRISP SHAVES, <br />
                <span className="text-[#60A5FA] font-black drop-shadow-[0_0_12px_rgba(96,165,250,0.4)]">AUTHENTIC TASTE.</span>
              </h2>

              <div className="space-y-8 mb-8 relative z-10">
                {/* Brand Story */}
                <div className="relative pl-6 border-l-2 border-blue-400/50">
                  <h3 className="font-editorial text-sm text-blue-200 tracking-widest font-extrabold uppercase mb-2">
                    OUR STORY
                  </h3>
                  <p className="font-inter text-xs md:text-sm text-blue-100/90 leading-relaxed">
                    Vibrant, aromatic and full of flavours, Shawarmas are a feast for the senses. Taste the authentic flavours of Shawarma through Jaffa, offering the authentic Lebanese Shawarma experience with flavour-packed spices, fresh juicy meats, and classic Lebanese fillings enhanced by the regional flavours. The dish that has gained popularity over the years reflecting the uniqueness and authenticity of the brand.
                  </p>
                </div>

                {/* Brand Objective */}
                <div className="relative pl-6 border-l-2 border-blue-300/40">
                  <h3 className="font-editorial text-sm text-blue-200 tracking-widest font-extrabold uppercase mb-2">
                    OUR OBJECTIVE
                  </h3>
                  <p className="font-inter text-xs md:text-sm text-blue-100/95 leading-relaxed italic">
                    "Our aim is to get inspired by authentic lebanese food and make it local for more people to accept and it should give entirely different taste, their taste buds should recall old flavours."
                  </p>
                </div>
              </div>

              {/* Stats Inside Card */}
              <div className="flex gap-6 items-center border-t border-blue-400/30 pt-6 relative z-10">
                <div>
                  <h4 className="font-editorial text-2xl text-white font-bold">24H</h4>
                  <p className="font-inter text-[9px] text-blue-200 tracking-wider uppercase mt-1">Slow Marinade</p>
                </div>
                <div className="w-[1px] h-10 bg-blue-400/30" />
                <div>
                  <h4 className="font-editorial text-2xl text-white font-bold">100%</h4>
                  <p className="font-inter text-[9px] text-blue-200 tracking-wider uppercase mt-1">Fresh Chicken</p>
                </div>
                <div className="w-[1px] h-10 bg-blue-400/30" />
                <div>
                  <h4 className="font-editorial text-2xl text-white font-bold">0%</h4>
                  <p className="font-inter text-[9px] text-blue-200 tracking-wider uppercase mt-1">Processed Fillers</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Animated Video iPhone Showcase (Right Side - 6 Columns) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Background Blue Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-luxury-accent-blue/10 rounded-full blur-[90px] pointer-events-none" />

            {/* iPhone Mockup Frame */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative w-[280px] h-[560px] md:w-[300px] md:h-[600px] rounded-[52px] border-[12px] border-zinc-900 shadow-2xl overflow-hidden bg-black flex flex-col cursor-none"
            >
              {/* Dynamic Island Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-900 rounded-full z-50 flex items-center justify-between px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <div className="w-8 h-1 bg-zinc-800/80 rounded-full" />
              </div>

              {/* Home Bar indicator at bottom */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full z-50" />

              {/* iPhone screen container */}
              <div className="absolute inset-0 w-full h-full rounded-[40px] overflow-hidden bg-zinc-950">
                {/* Scrolling container */}
                <motion.div
                  animate={{ y: `-${activeVideo * 100}%` }}
                  transition={{ type: 'spring', stiffness: 85, damping: 18 }}
                  className="w-full h-full flex flex-col"
                >
                  {STORY_VIDEOS.map((vid, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0 relative bg-zinc-950">
                      <video 
                        src={vid.src} 
                        loop 
                        muted 
                        playsInline 
                        autoPlay 
                        className="w-full h-full object-cover brightness-[0.9] group-hover:brightness-95 transition-all duration-300"
                      />

                      {/* Instagram UI mock elements */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/35 to-transparent text-white select-none pointer-events-none z-10 flex flex-col justify-end text-left">
                        {/* Profile row */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-[1.5px]">
                            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center font-editorial font-bold text-[8px] text-white">JS</div>
                          </div>
                          <div>
                            <h4 className="font-editorial text-[9px] font-bold uppercase tracking-wider">jaffashawarma</h4>
                            <p className="font-inter text-[6px] text-zinc-300">Bhopal • Indore</p>
                          </div>
                        </div>

                        {/* Caption */}
                        <p className="font-inter text-[9px] text-zinc-200 leading-normal line-clamp-2 mb-2">
                          {vid.caption}
                        </p>

                        {/* Video timeline visualizer */}
                        <div className="w-full h-[1.5px] bg-white/20 rounded-full overflow-hidden">
                          {activeVideo === idx && (
                            <motion.div 
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 5, ease: "linear" }}
                              className="h-full bg-luxury-accent-blue"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* WaveDivider separating OurStory from SignatureMenu */}
      <WaveDivider height="h-16" backWaveColor="text-[#0E5BFF]/5" frontWaveColor="text-white" backWaveOpacity={0.4} />
    </section>
  );
};

export default OurStory;
