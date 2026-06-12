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

    setRotateX(-yPercent * 10);
    setRotateY(xPercent * 10);

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
      className="relative rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_rgba(14,91,255,0.22)] transition-all duration-500 flex flex-col justify-end overflow-hidden group cursor-none h-[520px] w-full"
    >
      {/* Background full-height photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-[0.52]"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-transparent z-1" />
      </div>

      {/* Badge in top-left */}
      {item.badge && (
        <span className="absolute top-6 left-6 px-3.5 py-1 bg-luxury-accent-blue text-white font-inter text-[8px] tracking-[0.2em] uppercase rounded-full shadow-md font-extrabold z-10">
          {item.badge}
        </span>
      )}

      {/* Floating Info trigger in top-right for Nutrition */}
      <button
        onClick={() => setShowNutrition(!showNutrition)}
        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md hover:bg-luxury-accent-blue text-white flex items-center justify-center border border-white/20 transition-all duration-300 z-20 text-[9px] tracking-wider uppercase font-bold cursor-none"
      >
        {showNutrition ? "X" : "i"}
      </button>

      {/* Card Content Overlay */}
      <div className="relative z-10 p-7 flex flex-col justify-end h-full text-white pointer-events-none">
        
        {/* Dynamic nutritional facts popup */}
        <AnimatePresence>
          {showNutrition && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute inset-x-6 top-16 bg-zinc-950/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl z-20 pointer-events-auto"
            >
              <h4 className="font-editorial text-xs font-bold text-[#3B82F6] tracking-wider uppercase mb-3 text-center">NUTRITIONAL INFO</h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white/5 rounded-xl p-2 text-center border border-white/5">
                  <div className="font-mono text-[10px] font-bold text-white">{item.nutrition.calories.split(' ')[0]}</div>
                  <div className="font-inter text-[7px] text-white/50 uppercase mt-1">Cal</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center border border-white/5">
                  <div className="font-mono text-[10px] font-bold text-white">{item.nutrition.protein}</div>
                  <div className="font-inter text-[7px] text-white/50 uppercase mt-1">Prot</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center border border-white/5">
                  <div className="font-mono text-[10px] font-bold text-white">{item.nutrition.fat}</div>
                  <div className="font-inter text-[7px] text-white/50 uppercase mt-1">Fat</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center border border-white/5">
                  <div className="font-mono text-[10px] font-bold text-white">{item.nutrition.carbs}</div>
                  <div className="font-inter text-[7px] text-white/50 uppercase mt-1">Carb</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category & Price */}
        <div className="flex justify-between items-end mb-2">
          <span className="font-inter text-[9px] text-[#3B82F6] font-bold tracking-widest uppercase">
            {item.category}
          </span>
          <span className="font-editorial text-lg text-white font-black">
            {item.price}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-2xl text-white tracking-wide font-black uppercase mb-3 leading-none">
          {item.name}
        </h3>

        {/* Description & Buttons Group inside container that expands/reveals */}
        <div className="flex flex-col gap-4 overflow-hidden transition-all duration-500 max-h-16 group-hover:max-h-56 pointer-events-auto">
          
          <p className="font-inter text-xs text-white/70 leading-relaxed">
            {item.description}
          </p>

          {/* Action triggers: Swiggy and Zomato buttons side-by-side */}
          <div className="flex gap-3 pt-1">
            <a
              href="https://www.swiggy.com/search?query=Jaffa+Shawarma"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 bg-[#FC8019] hover:bg-[#E0690C] text-white font-inter text-[9px] tracking-widest uppercase font-bold text-center flex items-center justify-center gap-1.5 cursor-none rounded-full shadow-[0_4px_12px_rgba(252,128,25,0.2)] transition-all duration-300"
            >
              Swiggy
            </a>
            <a
              href="https://www.zomato.com/bhopal/restaurants?q=Jaffa+Shawarma"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 bg-[#CB192E] hover:bg-[#A81021] text-white font-inter text-[9px] tracking-widest uppercase font-bold text-center flex items-center justify-center gap-1.5 cursor-none rounded-full shadow-[0_4px_12px_rgba(203,25,46,0.2)] transition-all duration-300"
            >
              Zomato
            </a>
          </div>

        </div>

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
