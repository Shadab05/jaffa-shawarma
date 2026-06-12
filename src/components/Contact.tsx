import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import BackgroundParticles from './BackgroundParticles';

interface Branch {
  id: string;
  name: string;
  city: 'Bhopal' | 'Indore';
  area: string;
  address: string;
  phone: string;
  phoneRaw: string;
  hours: string;
  mapEmbedUrl: string;
  waLink: string;
}

const BRANCHES: Branch[] = [
  {
    id: "trilanga",
    name: "Jaffa Trilanga",
    city: "Bhopal",
    area: "Gulmohar Colony",
    address: "Plot 24, SLK Towers, Trilanga Main Road, near Aura Mall, Shahpura, Bhopal, MP 462039",
    phone: "+91 93034 73703",
    phoneRaw: "+919303473703",
    hours: "12:00 PM - 11:30 PM",
    mapEmbedUrl: "https://maps.google.com/maps?q=Jaffa%20Shawarma%20Trilanga%20Bhopal&z=15&output=embed",
    waLink: "https://wa.me/919303473703?text=Hi%20Jaffa%20Trilanga!%20I'd%20like%20to%20place%20an%20order."
  },
  {
    id: "ttnagar",
    name: "Jaffa TT Nagar",
    city: "Bhopal",
    area: "Kilol Park",
    address: "Shop No. 2 & 3, Kilol Park, Opposite Petrol Pump, Baugla Road, TT Nagar, Bhopal, MP 462003",
    phone: "+91 81094 84979",
    phoneRaw: "+918109484979",
    hours: "12:00 PM - 11:30 PM",
    mapEmbedUrl: "https://maps.google.com/maps?q=Jaffa%20Shawarma%20TT%20Nagar%20Bhopal&z=15&output=embed",
    waLink: "https://wa.me/918109484979?text=Hi%20Jaffa%20TT%20Nagar!%20I'd%20like%20to%20place%20an%20order."
  },
  {
    id: "arera",
    name: "Jaffa Arera Colony",
    city: "Bhopal",
    area: "10 No. Market",
    address: "Shop 3, Market 10, Smart Parking, Link Road 3, Opposite GM Tower, Arera Colony, Bhopal, MP 462016",
    phone: "+91 93034 73703",
    phoneRaw: "+919303473703",
    hours: "2:00 PM - 11:30 PM",
    mapEmbedUrl: "https://maps.google.com/maps?q=Jaffa%20Shawarma%2010%20No%20Market%20Bhopal&z=15&output=embed",
    waLink: "https://wa.me/919303473703?text=Hi%20Jaffa%20Arera%20Colony!%20I'd%20like%20to%20place%20an%20order."
  },
  {
    id: "kohefiza",
    name: "Jaffa Kohefiza",
    city: "Bhopal",
    area: "Kohefiza Road",
    address: "Shop 01, Near Ashiyana Apartment, Main Kohefiza Road, Housing Board Colony, Bhopal, MP 462030",
    phone: "+91 93034 73703",
    phoneRaw: "+919303473703",
    hours: "12:00 PM - 11:30 PM",
    mapEmbedUrl: "https://maps.google.com/maps?q=Jaffa%20Shawarma%20Kohefiza%20Bhopal&z=15&output=embed",
    waLink: "https://wa.me/919303473703?text=Hi%20Jaffa%20Kohefiza!%20I'd%20like%20to%20place%20an%20order."
  },
  {
    id: "lalghati",
    name: "Jaffa Lalghati",
    city: "Bhopal",
    area: "BDA Colony",
    address: "BDA Colony, Near Ashiyana Apartments and Albeik, Lalghati, Bhopal, MP 462030",
    phone: "+91 81094 84979",
    phoneRaw: "+918109484979",
    hours: "12:00 PM - 11:30 PM",
    mapEmbedUrl: "https://maps.google.com/maps?q=Jaffa%20Shawarma%20Lalghati%20Bhopal&z=15&output=embed",
    waLink: "https://wa.me/918109484979?text=Hi%20Jaffa%20Lalghati!%20I'd%20like%20to%20place%20an%20order."
  },
  {
    id: "indore-vijay",
    name: "Jaffa Vijay Nagar",
    city: "Indore",
    area: "Scheme No. 78",
    address: "Scheme Number 78, Part 2, PU4, Near Medanta Hospital, Vijay Nagar, Indore, MP 452010",
    phone: "+91 93034 73703",
    phoneRaw: "+919303473703",
    hours: "12:00 PM - 11:30 PM",
    mapEmbedUrl: "https://maps.google.com/maps?q=Jaffa%20Shawarma%20Vijay%20Nagar%20Indore&z=15&output=embed",
    waLink: "https://wa.me/919303473703?text=Hi%20Jaffa%20Indore!%20I'd%20like%20to%20place%20an%20order."
  }
];

export const Contact: React.FC = () => {
  const [activeCity, setActiveCity] = useState<'Bhopal' | 'Indore'>('Bhopal');
  const [selectedBranch, setSelectedBranch] = useState<Branch>(BRANCHES[0]);

  // Filter branches by selected city
  const filteredBranches = BRANCHES.filter(b => b.city === activeCity);

  const handleCityChange = (city: 'Bhopal' | 'Indore') => {
    setActiveCity(city);
    const firstOfCity = BRANCHES.find(b => b.city === city);
    if (firstOfCity) {
      setSelectedBranch(firstOfCity);
    }
  };

  return (
    <section id="outlets" className="relative py-24 md:py-32 overflow-hidden z-20">
      {/* Background local culinary smoke particles */}
      <BackgroundParticles />

      {/* Decorative side glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(14,91,255,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-inter text-xs uppercase text-luxury-accent-blue tracking-[0.3em] font-bold block mb-4">
            Find Us
          </span>
          <h2 className="font-editorial text-3xl md:text-5xl text-luxury-text-black tracking-wide leading-tight uppercase font-black mb-4">
            OUR KIOSKS & BRANCHES
          </h2>
          <div className="w-16 h-[2px] bg-luxury-accent-blue mx-auto mb-6" />
          <p className="font-playfair italic text-base text-zinc-500 leading-relaxed">
            Select a branch location to view details, call or message directly, and locate on the live map.
          </p>
        </div>

        {/* City Tab Selector (Pills) */}
        <div className="flex justify-center mb-10 z-10 relative">
          <div className="flex gap-1 bg-zinc-200/40 p-1 rounded-full border border-zinc-200/30 backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
            <button
              onClick={() => handleCityChange('Bhopal')}
              className={`px-8 py-2.5 rounded-full font-inter text-[10px] tracking-widest uppercase font-bold transition-all duration-350 cursor-none ${
                activeCity === 'Bhopal'
                  ? 'bg-luxury-text-black text-white shadow-md'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/30'
              }`}
            >
              Bhopal ({BRANCHES.filter(b => b.city === 'Bhopal').length})
            </button>
            <button
              onClick={() => handleCityChange('Indore')}
              className={`px-8 py-2.5 rounded-full font-inter text-[10px] tracking-widest uppercase font-bold transition-all duration-350 cursor-none ${
                activeCity === 'Indore'
                  ? 'bg-luxury-text-black text-white shadow-md'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/30'
              }`}
            >
              Indore ({BRANCHES.filter(b => b.city === 'Indore').length})
            </button>
          </div>
        </div>

        {/* Interactive Book Accordion Layout */}
        <div className="max-w-6xl mx-auto z-10 relative">
          {/* Desktop/Mobile Accordion Row */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full justify-start overflow-visible pb-4">
            <AnimatePresence mode="popLayout">
              {filteredBranches.map((branch, index) => {
                const isActive = selectedBranch.id === branch.id;
                const branchIndexStr = String(index + 1).padStart(2, '0');
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 100, damping: 18 }}
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch)}
                    className={`group relative rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col ${
                      isActive
                        ? 'bg-gradient-to-br from-[#0E5BFF] via-[#0D4EDC] to-[#1E40AF] text-white shadow-[0_25px_50px_rgba(14,91,255,0.25)] border-transparent lg:w-[620px] w-full z-10'
                        : 'bg-white/75 backdrop-blur-sm border-zinc-200/55 hover:bg-white/95 hover:border-zinc-350 shadow-sm text-zinc-800 lg:w-[170px] w-full'
                    } h-auto lg:h-[480px] p-6 lg:p-7 flex-shrink-0`}
                  >
                    {/* Inner flex layout split when active */}
                    <div className="flex flex-col lg:flex-row h-full w-full justify-between gap-6 items-stretch">
                      
                      {/* Left Side: "Book Cover / Spine" (visible in both states) */}
                      <div className={`flex flex-col justify-between flex-shrink-0 transition-all duration-300 ${
                        isActive ? 'lg:w-[220px] w-full border-b lg:border-b-0 lg:border-r border-white/20 pb-4 lg:pb-0 lg:pr-5' : 'w-full h-full'
                      }`}>
                        
                        {/* Timings and Index */}
                        <div className="flex justify-between items-center w-full">
                          <span className={`font-inter text-[8px] font-extrabold flex items-center gap-1 uppercase tracking-wider ${
                            isActive ? "text-white/80" : "text-zinc-400"
                          }`}>
                            <Clock size={10} />
                            {isActive ? branch.hours.split(" - ")[0] : "TIMINGS"}
                          </span>
                          <span className={`font-editorial text-2xl font-black ${
                            isActive ? "text-white/30" : "text-luxury-accent-blue/40 group-hover:text-luxury-accent-blue/70"
                          }`}>
                            {branchIndexStr}
                          </span>
                        </div>

                        {/* Title and Area */}
                        <div className="my-6 lg:my-auto">
                          <span className={`font-inter text-[9px] font-bold uppercase tracking-widest ${
                            isActive ? "text-blue-200" : "text-zinc-400 group-hover:text-luxury-accent-blue/70"
                          }`}>
                            {branch.area}
                          </span>
                          <h3 className={`font-editorial text-xl lg:text-2xl font-black uppercase tracking-wide mt-1 leading-tight ${
                            isActive ? "text-white" : "text-luxury-text-black group-hover:text-luxury-accent-blue"
                          } ${!isActive && 'lg:rotate-180 lg:[writing-mode:vertical-lr] lg:mx-auto lg:mt-6 lg:my-0'}`}>
                            {branch.name.replace("Jaffa ", "")}
                          </h3>
                        </div>

                        {/* Store Phone Details */}
                        <div className="mt-auto pt-2">
                          <span className={`font-inter text-[8px] tracking-widest uppercase block ${
                            isActive ? "text-white/60" : "text-zinc-400"
                          }`}>
                            STORE CALL
                          </span>
                          <a 
                            href={`tel:${branch.phoneRaw}`} 
                            onClick={(e) => e.stopPropagation()}
                            className={`font-mono text-[11px] font-bold block mt-1 hover:underline cursor-none ${
                              isActive ? "text-white" : "text-luxury-text-charcoal"
                            }`}
                          >
                            {branch.phone}
                          </a>
                        </div>
                      </div>

                      {/* Right Side: "Book Pages" (Map & Address, fades in when active) */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15, duration: 0.3 }}
                          className="flex-1 flex flex-col justify-between h-full gap-4 relative z-10 w-full"
                        >
                          {/* Timings full view on active */}
                          <div className="flex items-center gap-1.5 font-inter text-[9px] text-white/80 uppercase tracking-widest">
                            <Clock size={11} className="text-blue-300" />
                            Timings: {branch.hours}
                          </div>

                          {/* Address details */}
                          <p className="font-inter text-[11px] leading-relaxed text-white/90 flex items-start gap-2">
                            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-blue-300" />
                            {branch.address}
                          </p>

                          {/* Embedded Live Map */}
                          <div className="w-full flex-1 min-h-[200px] rounded-2xl overflow-hidden border border-white/20 shadow-inner relative z-10">
                            <iframe
                              title={`${branch.name} Map Page`}
                              src={branch.mapEmbedUrl}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen={false}
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              className="w-full h-full"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>

                          {/* Action Buttons inside Page */}
                          <div className="flex gap-3 mt-1" onClick={(e) => e.stopPropagation()}>
                            <a
                              href={`tel:${branch.phoneRaw}`}
                              className="flex-1 py-2.5 rounded-full bg-white text-[#0E5BFF] hover:bg-zinc-100 transition-all duration-300 font-inter text-[9px] tracking-widest uppercase font-bold text-center flex items-center justify-center gap-1.5 cursor-none shadow-md"
                            >
                              <Phone size={10} />
                              Call Outlet
                            </a>
                            <a
                              href={branch.waLink}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 py-2.5 rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/35 transition-all duration-300 font-inter text-[9px] tracking-widest uppercase font-bold text-center flex items-center justify-center gap-1.5 cursor-none"
                            >
                              Order via WA
                            </a>
                          </div>
                        </motion.div>
                      )}

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
