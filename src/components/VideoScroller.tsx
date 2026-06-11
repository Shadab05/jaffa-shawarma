import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WaveDivider from './WaveDivider';

gsap.registerPlugin(ScrollTrigger);

export const VideoScroller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      return isTouch || isSmallScreen;
    };
    setIsMobile(checkMobile());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const checkMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;

    let animationFrameId: number;
    let isRendering = true;

    const setupTextTimeline = () => {
      // Pin the section
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: stickyRef.current,
        anticipatePin: 1,
        scrub: true,
      });

      // Text fade-in / fade-out animations & end-of-scroll full background fade
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });

      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 2 })
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 2 }, '+=2')
        
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 2 })
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 2 }, '+=2')
        
        .to(text3Ref.current, { opacity: 1, y: 0, duration: 2 })
        .to(text3Ref.current, { opacity: 0, y: -50, duration: 2 }, '+=2');
    };

    if (checkMobile) {
      // Mobile mode: Setup the text timeline and pinning, and let the video autoplay
      setupTextTimeline();
      
      video.play().catch((err) => {
        console.warn("Video autoplay block wait:", err);
      });

      return () => {
        ScrollTrigger.getAll().forEach(t => {
          if (t.trigger === container) {
            t.kill();
          }
        });
      };
    }

    // Desktop mode: Scrub the video.currentTime based on scroll progress
    const initScrollTrigger = (duration: number) => {
      video.currentTime = 0;

      let targetTime = 0;
      let currentTime = 0;

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          // Keep slightly before end of video to avoid blank/frozen state
          targetTime = self.progress * (duration - 0.05);
        }
      });

      setupTextTimeline();

      // Smooth lerp rendering loop for video scrubbing (avoids frame lag)
      const updateFrame = () => {
        if (!isRendering) return;

        currentTime += (targetTime - currentTime) * 0.08;

        if (!video.seeking && Math.abs(video.currentTime - currentTime) > 0.02) {
          video.currentTime = currentTime;
        }

        animationFrameId = requestAnimationFrame(updateFrame);
      };

      updateFrame();
    };

    let initialized = false;
    let pollInterval: any;

    const tryInit = () => {
      if (initialized) return;
      const duration = video.duration;
      if (duration && !isNaN(duration)) {
        initialized = true;
        initScrollTrigger(duration);
        clearInterval(pollInterval);
        video.removeEventListener('loadedmetadata', tryInit);
        video.removeEventListener('durationchange', tryInit);
        video.removeEventListener('canplay', tryInit);
      }
    };

    video.addEventListener('loadedmetadata', tryInit);
    video.addEventListener('durationchange', tryInit);
    video.addEventListener('canplay', tryInit);

    tryInit();
    pollInterval = setInterval(tryInit, 250);

    return () => {
      isRendering = false;
      cancelAnimationFrame(animationFrameId);
      clearInterval(pollInterval);
      video.removeEventListener('loadedmetadata', tryInit);
      video.removeEventListener('durationchange', tryInit);
      video.removeEventListener('canplay', tryInit);
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#030611]">
      {/* Sticky Fullscreen Video Container */}
      <div ref={stickyRef} className="w-full h-screen overflow-hidden flex items-center justify-center bg-[#030611]">
        
        {/* The video (scaled up and anchored to top to push the bottom watermark off-screen) */}
        <video
          ref={videoRef}
          src="assets/Hero scroller video.mp4"
          muted
          playsInline
          autoPlay={isMobile}
          loop={isMobile}
          preload="auto"
          className="w-full h-full object-cover opacity-85 scale-[1.18] origin-top select-none pointer-events-none"
        />

        {/* Persistent bottom gradient mask to cover the bottom watermark and blend edges */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030611] to-transparent pointer-events-none z-20" />

        {/* WaveDivider to transition from dark scroller to white OurStory */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <WaveDivider height="h-16" backWaveColor="text-[#0E5BFF]/10" frontWaveColor="text-[#F8FAFF]" backWaveOpacity={0.4} />
        </div>

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/30 pointer-events-none z-0" />

        {/* Text 1: The Craft */}
        <div 
          ref={text1Ref} 
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 translate-y-10 pointer-events-none z-20"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-luxury-accent-blue uppercase mb-4">
            The Golden Skewer
          </span>
          <h2 className="font-editorial text-3xl md:text-6xl text-white tracking-wide leading-tight max-w-4xl font-black">
            UNLEASHING THE SHAVE
          </h2>
          <p className="font-playfair italic text-zinc-400 mt-4 text-base md:text-xl max-w-2xl">
            Sizzling layers of hand-stacked, marinated chicken breast and thigh slow-roasted to a crispy char.
          </p>
        </div>

        {/* Text 2: The Spices */}
        <div 
          ref={text2Ref} 
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 translate-y-10 pointer-events-none z-20"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-luxury-accent-blue/90 uppercase mb-4">
            Ancient Spices
          </span>
          <h2 className="font-editorial text-3xl md:text-6xl text-white tracking-wide leading-tight max-w-4xl font-black">
            AUTHENTIC LEBANESE RUB
          </h2>
          <p className="font-playfair italic text-zinc-400 mt-4 text-base md:text-xl max-w-2xl">
            Marinated for 24 hours in our signature spice blend, toasted cumin, cardamom, and sumac.
          </p>
        </div>

        {/* Text 3: The Wrap */}
        <div 
          ref={text3Ref} 
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 translate-y-10 pointer-events-none z-20"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-luxury-accent-blue uppercase mb-4">
            The Masterpiece
          </span>
          <h2 className="font-editorial text-3xl md:text-6xl text-white tracking-wide leading-tight max-w-4xl font-black">
            CRISP, JUICY, UNMATCHED
          </h2>
          <p className="font-playfair italic text-zinc-400 mt-4 text-base md:text-xl max-w-2xl">
            Hand-rolled inside warm Arabic bread, smeared with garlic paste and pickles.
          </p>
        </div>

        {/* Scroll Progress Bar at the bottom of video */}
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center z-25">
          <div className="font-inter text-[9px] tracking-[0.3em] uppercase text-white/40">
            Scroll to Seek the Story
          </div>
          <div className="w-16 h-[1px] bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-luxury-accent-blue" 
              style={{ width: '100%' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoScroller;
