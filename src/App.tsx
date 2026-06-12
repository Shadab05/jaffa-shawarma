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
            <path d="M0,0.85 C0.0833,0.65 0.1667,1 0.25,0.85 C0.3333,0.65 0.4167,1 0.5,0.85 C0.5833,0.65 0.6667,1 0.75,0.85 C0.8333,0.65 0.9167,1 1,0.85 L1,0 L0,0 Z" />
          </clipPath>
          <clipPath id="wave-clip-back" clipPathUnits="objectBoundingBox">
            <path d="M0,0.75 C0.0833,0.5 0.1667,0.95 0.25,0.75 C0.3333,0.5 0.4167,0.95 0.5,0.75 C0.5833,0.5 0.6667,0.95 0.75,0.75 C0.8333,0.5 0.9167,0.95 1,0.75 L1,0 L0,0 Z" />
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
            isScrolled && !mobileMenuOpen ? 'h-24' : 'h-32'
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
                animation: nav-wave-flow-fast 48s linear infinite;
              }
              .animate-nav-wave-slow {
                animation: nav-wave-flow-slow 72s linear infinite;
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
                <button 
                  onClick={() => scrollToSection('journey')} 
                  className="font-inter text-[9px] tracking-[0.25em] uppercase text-luxury-text-charcoal hover:text-luxury-accent-blue transition-colors font-bold cursor-none"
                >
                  Gallery
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
              <div className="hidden lg:flex gap-4 xl:gap-5 justify-end items-center w-1/3">
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

                {/* Swiggy Button */}
                <a 
                  href="https://www.swiggy.com/search?query=Jaffa+Shawarma"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-full bg-[#FC8019] text-white flex items-center justify-center gap-1.5 cursor-none hover:scale-105 transition-all duration-300 shadow-md font-inter text-[8px] tracking-widest uppercase font-bold"
                  title="Order on Swiggy"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.034 24c-.376-.411-2.075-2.584-3.95-5.513-.547-.916-.901-1.63-.833-1.814.178-.48 3.355-.743 4.333-.308.298.132.29.307.29.409 0 .44-.022 1.619-.022 1.619a.441.441 0 1 0 .883-.002l-.005-2.939c0-.255-.278-.319-.331-.329-.511-.002-1.548-.006-2.661-.006-2.457 0-3.006.101-3.423-.172-.904-.591-2.383-4.577-2.417-6.819C3.849 4.964 5.723 2.225 8.362.868A8.13 8.13 0 0 1 12.026 0c4.177 0 7.617 3.153 8.075 7.209l.001.011c.084.981-5.321 1.189-6.39.904-.164-.044-.206-.212-.206-.284L13.5 4.996a.442.442 0 0 0-.884.002l.009 3.866a.33.33 0 0 0 .268.32l3.354-.001c1.79 0 2.542.207 3.042.588.333.254.461.739.349 1.37C18.633 16.755 12.273 23.71 12.034 24z"/>
                  </svg>
                  <span>Swiggy</span>
                </a>

                {/* Zomato Button */}
                <a 
                  href="https://www.zomato.com/bhopal/jaffa-shawarma-arera-colony"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-full bg-[#CB192E] text-white flex items-center justify-center gap-1.5 cursor-none hover:scale-105 transition-all duration-300 shadow-md font-inter text-[8px] tracking-widest uppercase font-bold"
                  title="Order on Zomato"
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014z"/>
                  </svg>
                </a>
              </div>

              {/* Hamburger Button for Mobile */}
              <div className="lg:hidden flex justify-end w-1/3">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200/50 shadow-md flex items-center justify-center text-luxury-text-black hover:text-luxury-accent-blue z-[9999] transition-all duration-300 cursor-none"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
                className="fixed inset-0 z-[998] bg-luxury-bg-ivory flex flex-col justify-center items-center gap-5 lg:hidden h-screen w-screen relative overflow-hidden"
              >
                {/* Flowing background geometric star patterns for luxury feel */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <LatticeworkPatternNavbar />
                </div>

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
                  Gallery
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
                <div className="flex flex-col gap-3 mt-4 w-full px-12 max-w-sm relative z-10">
                  {/* Swiggy & Zomato side-by-side */}
                  <div className="flex gap-3 w-full">
                    <a 
                      href="https://www.swiggy.com/search?query=Jaffa+Shawarma"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 bg-[#FC8019] text-white font-inter text-[10px] tracking-[0.2em] uppercase rounded-full shadow-md font-bold text-center cursor-none flex items-center justify-center gap-1.5"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.034 24c-.376-.411-2.075-2.584-3.95-5.513-.547-.916-.901-1.63-.833-1.814.178-.48 3.355-.743 4.333-.308.298.132.29.307.29.409 0 .44-.022 1.619-.022 1.619a.441.441 0 1 0 .883-.002l-.005-2.939c0-.255-.278-.319-.331-.329-.511-.002-1.548-.006-2.661-.006-2.457 0-3.006.101-3.423-.172-.904-.591-2.383-4.577-2.417-6.819C3.849 4.964 5.723 2.225 8.362.868A8.13 8.13 0 0 1 12.026 0c4.177 0 7.617 3.153 8.075 7.209l.001.011c.084.981-5.321 1.189-6.39.904-.164-.044-.206-.212-.206-.284L13.5 4.996a.442.442 0 0 0-.884.002l.009 3.866a.33.33 0 0 0 .268.32l3.354-.001c1.79 0 2.542.207 3.042.588.333.254.461.739.349 1.37C18.633 16.755 12.273 23.71 12.034 24z"/>
                      </svg>
                      Swiggy
                    </a>
                    <a 
                      href="https://www.zomato.com/bhopal/jaffa-shawarma-arera-colony"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 bg-[#CB192E] text-white font-inter text-[10px] tracking-[0.2em] uppercase rounded-full shadow-md font-bold text-center cursor-none flex items-center justify-center gap-1.5"
                    >
                      <svg viewBox="0 0 24 24" className="w-9 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014z"/>
                      </svg>
                      Zomato
                    </a>
                  </div>

                  <a 
                    href="https://wa.me/919303473703?text=Hi%20Jaffa%20Shawarma!%20I'd%20like%20to%20order."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-gradient-to-r from-[#0E5BFF] to-[#3B82F6] text-white font-inter text-[10px] tracking-[0.2em] uppercase rounded-full shadow-md transition-all duration-300 font-bold text-center cursor-none"
                  >
                    WhatsApp Chat
                  </a>
                  
                  <div className="flex gap-2 w-full">
                    <a 
                      href="tel:+919303473703"
                      className="flex-1 py-2.5 border border-zinc-200 text-luxury-text-charcoal hover:text-luxury-accent-blue font-inter text-[9px] tracking-[0.15em] uppercase rounded-full shadow-sm transition-colors font-bold text-center cursor-none bg-white/50 backdrop-blur-sm"
                    >
                      Gulmohar Call
                    </a>
                    <a 
                      href="tel:+918109484979"
                      className="flex-1 py-2.5 border border-zinc-200 text-luxury-text-charcoal hover:text-luxury-accent-blue font-inter text-[9px] tracking-[0.15em] uppercase rounded-full shadow-sm transition-colors font-bold text-center cursor-none bg-white/50 backdrop-blur-sm"
                    >
                      TT Nagar Call
                    </a>
                  </div>
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
