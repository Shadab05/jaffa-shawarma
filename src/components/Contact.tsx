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

        {/* Interactive Layout Sitting Directly on the Background (Open-Air columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-stretch relative">
          
          {/* Left: Branch Selector List */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-4 max-h-none lg:max-h-[600px] overflow-y-visible lg:overflow-y-auto pr-2 custom-scrollbar z-10">
            <AnimatePresence mode="popLayout">
              {filteredBranches.map((branch) => {
                const isActive = selectedBranch.id === branch.id;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch)}
                    className={`group relative p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-br from-[#0E5BFF] to-[#1E40AF] text-white shadow-[0_20px_45px_rgba(14,91,255,0.22)] border-transparent scale-[1.01] z-10'
                        : 'bg-white/70 backdrop-blur-sm border-zinc-200/55 hover:bg-white/95 hover:border-zinc-350 shadow-sm text-zinc-800'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex justify-between items-center mb-3">
                      <span className={`font-inter text-[9px] font-bold flex items-center gap-1.5 uppercase tracking-wider ${
                        isActive ? "text-white/80" : "text-zinc-400"
                      }`}>
                        <Clock size={12} className={isActive ? "text-white/80" : "text-zinc-400"} />
                        {branch.hours}
                      </span>
                    </div>

                    {/* Branch Title */}
                    <h3 className={`font-editorial text-xl font-black uppercase tracking-wide mb-2 transition-colors ${
                      isActive ? "text-white" : "text-luxury-text-black group-hover:text-luxury-accent-blue"
                    }`}>
                      {branch.name}
                    </h3>
                    
                    {/* Address details */}
                    <p className={`font-inter text-[11px] leading-relaxed mb-5 flex items-start gap-1.5 ${
                      isActive ? "text-white/85" : "text-zinc-500"
                    }`}>
                      <MapPin size={14} className={`mt-0.5 flex-shrink-0 ${isActive ? "text-white/80" : "text-zinc-400"}`} />
                      {branch.address}
                    </p>

                    {/* Direct Actions inside card */}
                    <div className="flex gap-3 mt-2" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`tel:${branch.phoneRaw}`}
                        className={`flex-1 py-2.5 rounded-full transition-all duration-300 font-inter text-[9px] tracking-widest uppercase font-bold text-center flex items-center justify-center gap-1.5 cursor-none ${
                          isActive 
                            ? "bg-white text-[#0E5BFF] hover:bg-zinc-100 shadow-md"
                            : "border border-luxury-text-black text-luxury-text-black hover:bg-luxury-text-black hover:text-white bg-white/20 backdrop-blur-sm"
                        }`}
                      >
                        <Phone size={10} />
                        Call
                      </a>
                      <a
                        href={branch.waLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex-1 py-2.5 rounded-full transition-all duration-300 font-inter text-[9px] tracking-widest uppercase font-bold text-center flex items-center justify-center gap-1.5 cursor-none ${
                          isActive
                            ? "bg-white/15 text-white hover:bg-white/25 border border-white/35"
                            : "bg-gradient-to-r from-[#0E5BFF] to-[#3B82F6] text-white hover:shadow-[0_4px_12px_rgba(14,91,255,0.25)]"
                        }`}
                      >
                        WhatsApp
                      </a>
                    </div>

                    {/* Mobile Map View embedded directly inside the active card */}
                    {isActive && (
                      <div className="lg:hidden mt-5 w-full h-[250px] rounded-2xl overflow-hidden border border-white/25 shadow-inner relative z-10">
                        <iframe
                          title={`${branch.name} Mobile Map`}
                          src={branch.mapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full"
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right: Embedded Live Map */}
          <div className="hidden lg:flex col-span-1 lg:col-span-7 h-[350px] lg:h-auto min-h-[460px] rounded-[2rem] overflow-hidden border border-zinc-200/50 shadow-[0_20px_50px_rgba(14,91,255,0.12)] relative bg-white/80 backdrop-blur-sm z-10 flex-col items-stretch">
            <div className="relative flex-1 w-full h-full min-h-[380px] rounded-[1.8rem] overflow-hidden border-2 border-white shadow-inner">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={selectedBranch.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  title={selectedBranch.name}
                  src={selectedBranch.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </AnimatePresence>
            </div>
            
            {/* Ambient Map overlay tag */}
            <div className="absolute bottom-4 left-4 bg-luxury-text-black/85 backdrop-blur-sm px-4 py-2.5 rounded-2xl text-white font-inter text-[9px] tracking-wider uppercase font-bold flex items-center gap-1.5 shadow-md pointer-events-none">
              <MapPin size={11} className="text-luxury-accent-blue" />
              Viewing {selectedBranch.name} Map
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
