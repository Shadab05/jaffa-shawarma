import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import VideoScroller from './components/VideoScroller';
import OurStory from './components/OurStory';
import SignatureMenu from './components/SignatureMenu';
import Timeline from './components/Timeline';

import InstagramGrid from './components/InstagramGrid';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar3DLogo from './components/Navbar3DLogo';


gsap.registerPlugin(ScrollTrigger);

// Repeating geometric SVG latticework panel for Navbar background (Islamic star mesh/mashrabiya)
const LatticeworkPatternNavbar: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="lattice-nav" width="60" height="60" patternUnits="userSpaceOnUse">
        {/* Subtle grid border */}
        <rect width="60" height="60" fill="none" stroke="#0E5BFF" strokeWidth="0.2" opacity="0.3" />
        {/* Main outer diamond */}
        <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#0E5BFF" strokeWidth="0.5" />
        {/* Vertical and horizontal grid lines */}
        <path d="M30 0 L30 60 M0 30 L60 30" fill="none" stroke="#0E5BFF" strokeWidth="0.3" />
        {/* Diagonal grid lines */}
        <path d="M0 0 L60 60 M60 0 L0 60" fill="none" stroke="#0E5BFF" strokeWidth="0.3" />
        {/* Sharp 8-Pointed Star in center */}
        <path d="M30 8 L24 24 L8 30 L24 36 L30 52 L36 36 L52 30 L36 24 Z" fill="none" stroke="#0E5BFF" strokeWidth="0.6" />
        {/* Intersecting squares to form the star center */}
        <rect x="20" y="20" width="20" height="20" fill="none" stroke="#0E5BFF" strokeWidth="0.4" />
        <rect x="20" y="20" width="20" height="20" fill="none" stroke="#0E5BFF" strokeWidth="0.4" transform="rotate(45 30 30)" />
        {/* Concentric circles in centers */}
        <circle cx="30" cy="30" r="5" fill="none" stroke="#0E5BFF" strokeWidth="0.5" />
        {/* Corner details */}
        <circle cx="0" cy="0" r="4" fill="none" stroke="#0E5BFF" strokeWidth="0.4" />
        <circle cx="60" cy="0" r="4" fill="none" stroke="#0E5BFF" strokeWidth="0.4" />
        <circle cx="0" cy="60" r="4" fill="none" stroke="#0E5BFF" strokeWidth="0.4" />
        <circle cx="60" cy="60" r="4" fill="none" stroke="#0E5BFF" strokeWidth="0.4" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#lattice-nav)" />
  </svg>
);

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    // Initialize Lenis Smooth Scroll (matches rose-bhopal custom easing)
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Connect Lenis events directly to GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Sync GSAP ticker with Lenis
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // Refresh ScrollTrigger once DOM completes rendering
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      console.log('ScrollTrigger synced with Lenis');
    }, 800);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      (window as any).lenis = null;
      gsap.ticker.remove(tickerUpdate);
      clearTimeout(refreshTimer);
    };
  }, [isLoaded]);

  // Handle smooth scroll clicks
  const scrollToSection = (id: string) => {
    console.log('scrollToSection called with ID:', id);
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`Element with ID "${id}" not found in DOM.`);
      return;
    }
    
    if (lenisRef.current) {
      try {
        console.log('Scrolling via Lenis to selector:', '#' + id);
        lenisRef.current.scrollTo('#' + id, { duration: 1.2, offset: -80 });
        return;
      } catch (err) {
        console.error('Lenis scrollTo failed, falling back to native scrollIntoView:', err);
      }
    }
    
    console.log('Scrolling via native scrollIntoView');
    el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor />

      {/* SVG clip-path definitions for the flowing waves in Navbar */}
      <svg width="0" height="0" className="absolute pointer-events-none" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <clipPath id="wave-clip-front" clipPathUnits="objectBoundingBox">
            <path d="M0,0.75 C0.0833,0.4 0.1667,1 0.25,0.75 C0.3333,0.4 0.4167,1 0.5,0.75 C0.5833,0.4 0.6667,1 0.75,0.75 C0.8333,0.4 0.9167,1 1,0.75 L1,0 L0,0 Z" />
          </clipPath>
          <clipPath id="wave-clip-back" clipPathUnits="objectBoundingBox">
            <path d="M0,0.6 C0.0833,0.25 0.1667,0.9 0.25,0.6 C0.3333,0.25 0.4167,0.9 0.5,0.6 C0.5833,0.25 0.6667,0.9 0.75,0.6 C0.8333,0.25 0.9167,0.9 1,0.6 L1,0 L0,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Industrial Shutter preloader */}
      {!isLoaded ? (
        <Preloader onComplete={() => setIsLoaded(true)} />
      ) : (
        <div ref={mainContentRef} className="opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          
          {/* Floating Premium Header / Navbar */}
          {/* Floating Premium Header / Navbar */}
          <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 flex items-center ${
            isScrolled && !mobileMenuOpen ? 'h-20' : 'h-28'
          }`}>
            <style>{`
              @keyframes nav-wave-flow-fast {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-50%, 0, 0); }
              }
              @keyframes nav-wave-flow-slow {
                0% { transform: translate3d(-50%, 0, 0); }
                100% { transform: translate3d(0, 0, 0); }
              }
              .animate-nav-wave-fast {
                animation: nav-wave-flow-fast 12s linear infinite;
              }
              .animate-nav-wave-slow {
                animation: nav-wave-flow-slow 18s linear infinite;
              }
            `}</style>

            {/* Flowing Waves and Background (Unified h-full container) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              
              {/* Layer 1: Back Wave (flowing) */}
              <div className="absolute inset-0 w-[200%] h-full flex animate-nav-wave-slow opacity-60">
                <div 
                  className="w-1/2 h-full flex-shrink-0 relative overflow-hidden -mr-[1px]"
                  style={{
                    clipPath: 'url(#wave-clip-back)',
                    WebkitClipPath: 'url(#wave-clip-back)'
                  }}
                >
                  <div className={`absolute inset-0 transition-colors duration-500 ${
                    isScrolled && !mobileMenuOpen ? 'bg-[#0E5BFF]/15' : 'bg-[#0E5BFF]/5'
                  }`} />
                </div>
                <div 
                  className="w-1/2 h-full flex-shrink-0 relative overflow-hidden"
                  style={{
                    clipPath: 'url(#wave-clip-back)',
                    WebkitClipPath: 'url(#wave-clip-back)'
                  }}
                >
                  <div className={`absolute inset-0 transition-colors duration-500 ${
                    isScrolled && !mobileMenuOpen ? 'bg-[#0E5BFF]/15' : 'bg-[#0E5BFF]/5'
                  }`} />
                </div>
              </div>

              {/* Layer 2: Front Wave (flowing, spanning entire height, containing opaque background blur and the high-fidelity star pattern) */}
              <div className="absolute inset-0 w-[200%] h-full flex animate-nav-wave-fast">
                <div 
                  className="w-1/2 h-full flex-shrink-0 relative overflow-hidden -mr-[1px]"
                  style={{
                    clipPath: 'url(#wave-clip-front)',
                    WebkitClipPath: 'url(#wave-clip-front)'
                  }}
                >
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isScrolled && !mobileMenuOpen 
                      ? 'bg-luxury-bg-ivory/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)]' 
                      : 'bg-luxury-bg-ivory/45 backdrop-blur-[6px]'
                  }`} />
                  <LatticeworkPatternNavbar />
                </div>
                <div 
                  className="w-1/2 h-full flex-shrink-0 relative overflow-hidden"
                  style={{
                    clipPath: 'url(#wave-clip-front)',
                    WebkitClipPath: 'url(#wave-clip-front)'
                  }}
                >
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isScrolled && !mobileMenuOpen 
                      ? 'bg-luxury-bg-ivory/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)]' 
                      : 'bg-luxury-bg-ivory/45 backdrop-blur-[6px]'
                  }`} />
                  <LatticeworkPatternNavbar />
                </div>
              </div>

            </div>

            <div className="container mx-auto px-6 relative flex items-center justify-between w-full h-full">
              
              {/* Left links for Desktop */}
              <div className="hidden lg:flex gap-6 xl:gap-8 justify-start items-center w-1/3">
                <button 
                  onClick={() => scrollToSection('story')} 
                  className="font-inter text-[9px] tracking-[0.25em] uppercase text-luxury-text-charcoal hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  Our Story
                </button>
                <button 
                  onClick={() => scrollToSection('menu')} 
                  className="font-inter text-[9px] tracking-[0.25em] uppercase text-luxury-text-charcoal hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  Menu
                </button>
              </div>

              {/* Left spacer on Mobile */}
              <div className="lg:hidden w-1/3" />

              {/* Centered 2D Cursive Neon Logo (Absolute, bleeding out with back-glow) */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-105 z-50 w-[180px] md:w-[240px] h-[90px]" 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {/* Back-lit glow shadow for logo */}
                <div className="absolute w-[120px] md:w-[160px] h-[35px] md:h-[45px] bg-[#0E5BFF]/35 blur-xl rounded-full pointer-events-none z-0" />
                <div className="relative z-10 flex flex-col items-center justify-center pt-1 leading-none select-none pointer-events-none">
                  <span 
                    className="font-normal text-4xl md:text-5xl text-white drop-shadow-[0_0_12px_rgba(14,91,255,0.8)] filter pr-1.5"
                    style={{
                      fontFamily: "'Pacifico', cursive",
                      textShadow: '0 0 10px rgba(14, 91, 255, 0.95), 0 0 20px rgba(14, 91, 255, 0.75), 0 0 35px rgba(59, 130, 246, 0.6)',
                    }}
                  >
                    jaffa
                  </span>
                  <span className="font-inter text-[#0E5BFF] font-extrabold uppercase text-[8px] md:text-[9px] tracking-[0.55em] mt-0.5 ml-[0.55em] leading-none drop-shadow-[0_0_5px_rgba(14,91,255,0.3)]">
                    SHAWARMA
                  </span>
                </div>
              </div>

              {/* Right Links & Direct Contact for Desktop */}
              <div className="hidden lg:flex gap-6 xl:gap-8 justify-end items-center w-1/3">
                <button 
                  onClick={() => scrollToSection('outlets')} 
                  className="font-inter text-[9px] tracking-[0.25em] uppercase text-luxury-text-charcoal hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  Kitchens
                </button>
                <button 
                  onClick={() => scrollToSection('social')} 
                  className="font-inter text-[9px] tracking-[0.25em] uppercase text-luxury-text-charcoal hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  Journal
                </button>
                
                {/* Direct WhatsApp Call - Jaffa Blue Gradient */}
                <a 
                  href="https://wa.me/919303473703?text=Hi%20Jaffa%20Shawarma!%20I'd%20like%20to%20order."
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-[#0E5BFF] to-[#3B82F6] hover:shadow-[0_4px_12px_rgba(14,91,255,0.3)] text-white font-inter text-[9px] tracking-[0.15em] uppercase rounded-full transition-all duration-300 font-bold flex items-center gap-1.5 cursor-none"
                >
                  WhatsApp Us
                </a>
              </div>

              {/* Hamburger Button for Mobile */}
              <div className="lg:hidden flex justify-end w-1/3">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center text-luxury-text-charcoal hover:text-luxury-accent-blue z-[9999] transition-colors p-2 cursor-none"
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>

            </div>
          </nav>

          {/* Mobile Overlay Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-[998] bg-luxury-bg-ivory flex flex-col justify-center items-center gap-6 lg:hidden h-screen w-screen"
              >
                <button 
                  onClick={() => { scrollToSection('story'); setMobileMenuOpen(false); }} 
                  className="font-editorial text-2xl tracking-[0.2em] uppercase text-luxury-text-black hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  Our Story
                </button>
                <button 
                  onClick={() => { scrollToSection('menu'); setMobileMenuOpen(false); }} 
                  className="font-editorial text-2xl tracking-[0.2em] uppercase text-luxury-text-black hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  Menu
                </button>
                <button 
                  onClick={() => { scrollToSection('journey'); setMobileMenuOpen(false); }} 
                  className="font-editorial text-2xl tracking-[0.2em] uppercase text-luxury-text-black hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  The Prep
                </button>
                <button 
                  onClick={() => { scrollToSection('outlets'); setMobileMenuOpen(false); }} 
                  className="font-editorial text-2xl tracking-[0.2em] uppercase text-luxury-text-black hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  Kitchens
                </button>
                <button 
                  onClick={() => { scrollToSection('social'); setMobileMenuOpen(false); }} 
                  className="font-editorial text-2xl tracking-[0.2em] uppercase text-luxury-text-black hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  Journal
                </button>
                
                {/* Mobile Direct Connections */}
                <div className="flex flex-col gap-3 mt-4 w-full px-12 max-w-sm">
                  <a 
                    href="https://wa.me/919303473703?text=Hi%20Jaffa%20Shawarma!%20I'd%20like%20to%20order."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-gradient-to-r from-[#0E5BFF] to-[#3B82F6] text-white font-inter text-[10px] tracking-[0.2em] uppercase rounded-full shadow-lg transition-all duration-300 font-bold text-center cursor-none"
                  >
                    WhatsApp Chat
                  </a>
                  <a 
                    href="tel:+919303473703"
                    className="w-full py-3 border border-zinc-300 text-luxury-text-charcoal hover:text-luxury-accent-blue font-inter text-[10px] tracking-[0.2em] uppercase rounded-full shadow-md transition-colors font-bold text-center cursor-none"
                  >
                    Call Gulmohar
                  </a>
                  <a 
                    href="tel:+918109484979"
                    className="w-full py-3 border border-zinc-300 text-luxury-text-charcoal hover:text-luxury-accent-blue font-inter text-[10px] tracking-[0.2em] uppercase rounded-full shadow-md transition-colors font-bold text-center cursor-none"
                  >
                    Call TT Nagar
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section Render Blocks */}
          <Hero 
            onExploreClick={() => scrollToSection('menu')}
          />
          <VideoScroller />
          <div className="relative bg-luxury-bg-ivory">
            <OurStory />
            <SignatureMenu />
            <Timeline />
            <InstagramGrid />
            <Reviews />
            <Contact />
            <Footer />
          </div>

        </div>
      )}
    </>
  );
};

export default App;
