import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundParticles from './BackgroundParticles';
import WaveDivider from './WaveDivider';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  description: string;
  nutrition: { calories: string; protein: string; fat: string; carbs: string };
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Jaffa Classic Roll",
    price: "₹199",
    imageUrl: "assets/menu/menu_1.jpg",
    category: "Classic Rolls",
    description: "Warm Lebanese Arabic flatbread wrapped around slow-roasted chicken shavings, salted dill pickles, and our signature rich garlic toum.",
    nutrition: { calories: "480 kcal", protein: "32g", fat: "16g", carbs: "42g" },
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Lebanese Plate",
    price: "₹299",
    imageUrl: "assets/menu/menu_2.jpg",
    category: "Platters",
    description: "Premium open-face platter loaded with roasted shaved chicken, hot crisp fries, creamy chickpea hummus, and toasted flatbread quarters.",
    nutrition: { calories: "680 kcal", protein: "48g", fat: "22g", carbs: "58g" }
  },
  {
    id: 3,
    name: "Jaffa Open Plate",
    price: "₹280",
    imageUrl: "assets/menu/menu_3.jpg",
    category: "Platters",
    description: "Deconstructed shawarma platter served with shredded chicken rotisserie layers, fresh house salad, and creamy toum.",
    nutrition: { calories: "590 kcal", protein: "42g", fat: "20g", carbs: "50g" }
  },
  {
    id: 4,
    name: "Original Classic Roll",
    price: "₹199",
    imageUrl: "assets/menu/menu_4.jpg",
    category: "Classic Rolls",
    description: "The original recipe. Slow-cooked marinated chicken breast shavings wrapped with simple Arabic spices and double garlic toum.",
    nutrition: { calories: "450 kcal", protein: "30g", fat: "14g", carbs: "40g" },
    badge: "Original"
  },
  {
    id: 5,
    name: "Jaffa Veg Delight",
    price: "₹180",
    imageUrl: "assets/menu/menu_5.jpg",
    category: "Veg Specialties",
    description: "Crafted for veg lovers. Grilled paneer strips marinated in sumac spices, wrapped with crispy greens and garlic sauce.",
    nutrition: { calories: "410 kcal", protein: "24g", fat: "18g", carbs: "38g" }
  },
  {
    id: 6,
    name: "Cheese Blast Inferno",
    price: "₹240",
    imageUrl: "assets/menu/menu_6.jpg",
    category: "Specialties",
    description: "For cheese lovers. Loaded with melted mozzarella, chicken shavings, hot jalapenos, and Jaffa's proprietary volcano chili-garlic paste.",
    nutrition: { calories: "620 kcal", protein: "38g", fat: "28g", carbs: "48g" },
    badge: "Hot & Cheesy"
  },
  {
    id: 7,
    name: "Butter Chicken Shawarma",
    price: "₹250",
    imageUrl: "assets/menu/menu_7.jpg",
    category: "Specialties",
    description: "Jaffa's fusion masterpiece. Tender rotisserie chicken tossed in rich, creamy butter chicken sauce and wrapped in flatbread.",
    nutrition: { calories: "580 kcal", protein: "35g", fat: "24g", carbs: "46g" },
    badge: "Chef's Special"
  }
];

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;

    setRotateX(-yPercent * 12);
    setRotateY(xPercent * 12);

    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="relative rounded-[32px] p-6 bg-white/50 backdrop-blur-xl border border-white/50 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(14,91,255,0.15)] hover:border-blue-500/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-none h-[520px]"
    >
      {/* Background radial spotlight glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(14, 91, 255, 0.06), transparent 85%)`
        }}
      />

      {/* Main card body */}
      <div>
        {/* Card Header image frame */}
        <div className="w-full h-52 rounded-2xl overflow-hidden relative border border-zinc-100/30 shadow-md mb-6 bg-zinc-950">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.98]"
          />
          {item.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-luxury-accent-blue text-white font-inter text-[8px] tracking-[0.2em] uppercase rounded-full shadow-md font-bold z-10">
              {item.badge}
            </span>
          )}
        </div>

        {/* Text descriptions */}
        <div className="flex justify-between items-start mb-2">
          <span className="font-inter text-[9px] text-luxury-accent-blue font-bold tracking-widest uppercase">
            {item.category}
          </span>
          <span className="font-editorial text-lg text-luxury-text-black font-black">
            {item.price}
          </span>
        </div>

        <h3 className="font-editorial text-xl md:text-2xl text-luxury-text-black tracking-wide font-black uppercase mb-3">
          {item.name}
        </h3>

        {/* Interactive toggle block for description or nutritional facts */}
        <div className="relative h-24 overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            {!showNutrition ? (
              <motion.p
                key="desc"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="font-inter text-xs text-zinc-500 leading-relaxed absolute inset-0"
              >
                {item.description}
              </motion.p>
            ) : (
              <motion.div
                key="nutri"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="grid grid-cols-4 gap-2 absolute inset-0 pt-2"
              >
                <div className="bg-luxury-bg-cream/50 rounded-xl p-2 text-center border border-zinc-100">
                  <div className="font-mono text-xs font-bold text-luxury-text-black">{item.nutrition.calories}</div>
                  <div className="font-inter text-[8px] text-zinc-400 uppercase tracking-wider mt-1">Cal</div>
                </div>
                <div className="bg-luxury-bg-cream/50 rounded-xl p-2 text-center border border-zinc-100">
                  <div className="font-mono text-xs font-bold text-luxury-text-black">{item.nutrition.protein}</div>
                  <div className="font-inter text-[8px] text-zinc-400 uppercase tracking-wider mt-1">Protein</div>
                </div>
                <div className="bg-luxury-bg-cream/50 rounded-xl p-2 text-center border border-zinc-100">
                  <div className="font-mono text-xs font-bold text-luxury-text-black">{item.nutrition.fat}</div>
                  <div className="font-inter text-[8px] text-zinc-400 uppercase tracking-wider mt-1">Fat</div>
                </div>
                <div className="bg-luxury-bg-cream/50 rounded-xl p-2 text-center border border-zinc-100">
                  <div className="font-mono text-xs font-bold text-luxury-text-black">{item.nutrition.carbs}</div>
                  <div className="font-inter text-[8px] text-zinc-400 uppercase tracking-wider mt-1">Carbs</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action triggers */}
      <div className="flex justify-between items-center border-t border-zinc-100 pt-4 mt-auto">
        <button
          onClick={() => setShowNutrition(!showNutrition)}
          className="font-inter text-[9px] text-zinc-400 hover:text-luxury-accent-blue tracking-widest uppercase transition-colors"
        >
          {showNutrition ? "Show Details" : "Nutritional Facts"}
        </button>

        <button
          className="px-5 py-2.5 bg-gradient-to-r from-[#0E5BFF] to-[#3B82F6] hover:shadow-[0_4px_12px_rgba(14,91,255,0.3)] text-white font-inter text-[9px] tracking-widest uppercase rounded-full transition-all duration-300 font-bold"
        >
          Order Now
        </button>
      </div>
    </motion.div>
  );
};

export const SignatureMenu: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="menu" className="relative py-24 md:py-32 overflow-hidden z-20">
      {/* Background drifting smoke particles */}
      <BackgroundParticles />
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] blue-glow-radial opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] amber-glow-radial opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="font-inter text-xs uppercase text-luxury-accent-blue tracking-[0.3em] font-bold block mb-4">
            The Menu
          </span>
          <h2 className="font-editorial text-3xl md:text-5xl text-luxury-text-black tracking-wide leading-tight uppercase font-black mb-4">
            SIGNATURE RECIPES
          </h2>
          <div className="w-16 h-[2px] bg-luxury-accent-blue mx-auto mb-6" />
          <p className="font-playfair italic text-base text-zinc-500 leading-relaxed">
            Freshly stacked ingredients prepared meticulously to order. Swipe or use control arrows to explore.
          </p>
        </div>

        {/* Horizontal Hovering Carousel Wrapper */}
        <div className="relative max-w-6xl mx-auto px-4 group/carousel">
          {/* Scroll Buttons - Absolute overlay visible on container hover */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-20px] top-[50%] -translate-y-1/2 w-12 h-12 rounded-full bg-white/85 backdrop-blur-md border border-zinc-200 shadow-xl flex items-center justify-center text-luxury-text-charcoal hover:bg-luxury-accent-blue hover:text-white hover:border-transparent transition-all duration-300 z-30 cursor-none opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-[-20px] top-[50%] -translate-y-1/2 w-12 h-12 rounded-full bg-white/85 backdrop-blur-md border border-zinc-200 shadow-xl flex items-center justify-center text-luxury-text-charcoal hover:bg-luxury-accent-blue hover:text-white hover:border-transparent transition-all duration-300 z-30 cursor-none opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* Snap scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {MENU_ITEMS.map((item) => (
              <div key={item.id} className="snap-center flex-shrink-0 w-[290px] md:w-[340px]">
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* WaveDivider separating SignatureMenu from Timeline */}
      <WaveDivider height="h-16" backWaveColor="text-[#0E5BFF]/5" frontWaveColor="text-[#F8FAFF]" backWaveOpacity={0.4} />
    </section>
  );
};

export default SignatureMenu;
