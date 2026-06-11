import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Reel {
  id: number;
  videoUrl: string;
  thumbnailUrl: string;
  likes: string;
  comments: string;
  caption: string;
}

const REELS: Reel[] = [
  {
    id: 1,
    videoUrl: "/assets/reels/reel_1.mp4",
    thumbnailUrl: "/assets/reels/reel_1_thumb.jpg",
    likes: "4.8K",
    comments: "142",
    caption: "The golden spit JAFFA SHAWARMA cooking to perfection. Sizzling layers of spice and pure flavor."
  },
  {
    id: 2,
    videoUrl: "/assets/reels/reel_2.mp4",
    thumbnailUrl: "/assets/reels/reel_2_thumb.jpg",
    likes: "6.2K",
    comments: "284",
    caption: "Our signature garlic toum lathered onto fresh Lebanese flatbread. Hand-rolled with passion."
  },
  {
    id: 3,
    videoUrl: "/assets/reels/reel_3.mp4",
    thumbnailUrl: "/assets/reels/reel_3_thumb.jpg",
    likes: "3.9K",
    comments: "98",
    caption: "Succulent chicken shavings fresh off the rotisserie grill. True culinary craftsmanship."
  },
  {
    id: 4,
    videoUrl: "/assets/reels/reel_4.mp4",
    thumbnailUrl: "/assets/reels/reel_4_thumb.jpg",
    likes: "5.5K",
    comments: "189",
    caption: "Every wrap is a masterpiece. Crispy pickles, toasted crust, and our secret spice blend."
  },
  {
    id: 5,
    videoUrl: "/assets/reels/reel_5.mp4",
    thumbnailUrl: "/assets/reels/reel_5_thumb.jpg",
    likes: "7.1K",
    comments: "310",
    caption: "Step into Jaffa Shawarma. Experience the authentic taste of the Middle East, crafted locally."
  },
  {
    id: 6,
    videoUrl: "/assets/reels/reel_6.mp4",
    thumbnailUrl: "/assets/reels/reel_6_thumb.jpg",
    likes: "5.9K",
    comments: "223",
    caption: "The satisfying sizzle of fresh chicken pressed to perfection. Golden, crispy, and incredibly juicy."
  },
  {
    id: 7,
    videoUrl: "/assets/reels/reel_7.mp4",
    thumbnailUrl: "/assets/reels/reel_7_thumb.jpg",
    likes: "8.4K",
    comments: "412",
    caption: "Gather around for the ultimate shawarma feast. A sensory journey of aromatics and spices."
  }
];

export const InstagramGrid: React.FC = () => {
  const [muted, setMuted] = useState(true);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    // Calculate how much we need to translate horizontally
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      // Leave some breathing room at the end
      return -(trackWidth - viewportWidth + 120);
    };

    // Main scroll horizontal timeline
    const scrollTween = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: () => getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
          invalidateOnRefresh: true,
        }
      }
    );

    // Apply horizontal parallax to the media elements inside card wrappers
    const mediaElements = track.querySelectorAll(".parallax-card-media");
    mediaElements.forEach((media) => {
      gsap.fromTo(
        media,
        { x: -50 },
        {
          x: 50,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          }
        }
      );
    });

    return () => {
      // Cleanup GSAP triggers on unmount
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === trigger) t.kill();
      });
      scrollTween.kill();
    };
  }, []);

  return (
    <section id="social" className="relative z-20">
      {/* Trigger container for pinning */}
      <div ref={triggerRef} className="relative w-full bg-[#f8f7f4]">
        
        {/* Sticky viewport content - centered vertically */}
        <div className="relative h-screen w-full flex flex-col justify-center overflow-hidden py-8">
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(14,91,255,0.06)_0%,transparent_70%)] pointer-events-none z-0" />
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 px-6 z-10">
            <span className="font-inter text-xs uppercase text-luxury-accent-blue tracking-[0.3em] font-bold block mb-2">
              Our Feed
            </span>
            <h2 className="font-editorial text-3xl md:text-5xl text-luxury-text-black tracking-wide leading-tight uppercase font-black mb-2">
              THE JOURNAL
            </h2>
            <div className="w-16 h-[2px] bg-luxury-accent-blue mx-auto mb-4" />
            <p className="font-playfair italic text-base text-zinc-500 leading-relaxed">
              Witness the sizzle on Instagram. Scroll down to browse our feed horizontally with parallax depth.
            </p>
          </div>

          {/* Horizontal Track Showcase */}
          <div className="w-full overflow-hidden mb-8 z-10">
            <div 
              ref={trackRef}
              className="flex gap-8 px-[12vw] w-max select-none"
            >
              {REELS.map((reel) => (
                <ReelCard key={reel.id} reel={reel} globalMuted={muted} />
              ))}
            </div>
          </div>

          {/* Controls & CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto px-10 w-full gap-4 z-10">
            <button
              onClick={() => setMuted(!muted)}
              className="flex items-center gap-2 px-5 py-2.5 border border-zinc-200 rounded-full font-inter text-[10px] tracking-wider uppercase text-luxury-text-charcoal hover:border-luxury-accent-blue hover:text-luxury-accent-blue transition-colors font-bold shadow-sm cursor-none bg-white/50 backdrop-blur-sm"
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              {muted ? "Mute All" : "Unmute All"}
            </button>
            
            <a
              href="https://www.instagram.com/jaffashawarma/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#0E5BFF] to-[#3B82F6] hover:shadow-[0_4px_16px_rgba(14,91,255,0.35)] text-white font-inter text-[10px] tracking-widest uppercase rounded-full font-bold shadow-md cursor-none"
            >
              <Instagram size={16} />
              Follow @jaffashawarma
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

interface ReelCardProps {
  reel: Reel;
  globalMuted: boolean;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, globalMuted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Auto-play blocked:", err));
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleCardClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Play failed:", err));
      }
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="relative flex-shrink-0 w-[260px] md:w-[300px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-zinc-200/60 shadow-xl cursor-none group bg-zinc-950"
    >
      {/* Video element with Parallax offset frame */}
      <div className="absolute inset-0 w-[120%] h-full -left-[10%] overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.thumbnailUrl}
          loop
          muted={globalMuted}
          playsInline
          className="parallax-card-media w-full h-full object-cover scale-110 brightness-[0.85] group-hover:brightness-95 transition-all duration-300 pointer-events-auto"
        />
      </div>

      {/* Play/Pause Overlay Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: hovered ? 1 : 0.8, opacity: hovered && !isPlaying ? 0.8 : 0 }}
          className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </motion.div>
      </div>

      {/* Instagram Frame Overlay Details */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end text-white select-none z-10 pointer-events-none">
        
        {/* Profile Details */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-[1.5px]">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center font-editorial font-bold text-[9px] text-white">
              JS
            </div>
          </div>
          <div>
            <h4 className="font-editorial text-[10px] font-bold tracking-wide uppercase">jaffashawarma</h4>
            <p className="font-inter text-[8px] text-zinc-300">Bhopal • Indore</p>
          </div>
        </div>

        {/* Caption */}
        <p className="font-inter text-[10px] text-zinc-200 leading-relaxed mb-4 line-clamp-3">
          {reel.caption}
        </p>

        {/* Metrics */}
        <div className="flex items-center gap-4 text-zinc-300 font-mono text-[9px]">
          <div className="flex items-center gap-1.5">
            <Heart size={12} className="fill-white text-white" />
            <span>{reel.likes}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle size={12} className="fill-white text-white" />
            <span>{reel.comments}</span>
          </div>
        </div>

      </div>

      {/* Static Instagram Tag Icon in top-right */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-full text-white pointer-events-none z-10">
        <Instagram size={14} />
      </div>
    </div>
  );
};

export default InstagramGrid;
