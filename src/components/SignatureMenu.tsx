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
  },
  {
    id: 8,
    name: "Falafel Supreme Roll",
    price: "₹160",
    imageUrl: "assets/social/full wrap.PNG",
    category: "Veg Specialties",
    description: "Crispy herb-infused chickpea falafel patties wrapped with pickled turnips, fresh parsley, tomatoes, and smooth sesame tahini.",
    nutrition: { calories: "420 kcal", protein: "14g", fat: "16g", carbs: "52g" },
    badge: "Veg Classic"
  },
  {
    id: 9,
    name: "Jaffa Special Hummus Plate",
    price: "₹270",
    imageUrl: "assets/social/labenese shawarma.PNG",
    category: "Platters",
    description: "Creamy house-whipped chickpea hummus topped with warm spiced chicken shavings, olive oil extra-virgin drizzle, and fresh pita bread.",
    nutrition: { calories: "640 kcal", protein: "38g", fat: "26g", carbs: "48g" },
    badge: "Premium Platter"
  },
  {
    id: 10,
    name: "Spicy Peri-Peri Wrap",
    price: "₹210",
    imageUrl: "assets/social/sauce on chicken.PNG",
    category: "Specialties",
    description: "Tender rotisserie chicken shavings tossed in hot African peri-peri spice sauce, wrapped with fries, lettuce, and garlic toum.",
    nutrition: { calories: "510 kcal", protein: "34g", fat: "20g", carbs: "42g" },
    badge: "Spicy Blast"
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

      {/* Floating Nutrition facts trigger */}
      <button
        onClick={() => setShowNutrition(!showNutrition)}
        className={`absolute top-6 right-6 px-3 py-1.5 rounded-full font-inter text-[8px] tracking-widest uppercase font-extrabold transition-all duration-350 z-20 border cursor-none ${
          showNutrition
            ? "bg-luxury-accent-blue text-white border-transparent"
            : "bg-white/10 backdrop-blur-md hover:bg-white/25 text-white border-white/20"
        }`}
      >
        {showNutrition ? "Close" : "Nutrition"}
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
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.034 24c-.376-.411-2.075-2.584-3.95-5.513-.547-.916-.901-1.63-.833-1.814.178-.48 3.355-.743 4.333-.308.298.132.29.307.29.409 0 .44-.022 1.619-.022 1.619a.441.441 0 1 0 .883-.002l-.005-2.939c0-.255-.278-.319-.331-.329-.511-.002-1.548-.006-2.661-.006-2.457 0-3.006.101-3.423-.172-.904-.591-2.383-4.577-2.417-6.819C3.849 4.964 5.723 2.225 8.362.868A8.13 8.13 0 0 1 12.026 0c4.177 0 7.617 3.153 8.075 7.209l.001.011c.084.981-5.321 1.189-6.39.904-.164-.044-.206-.212-.206-.284L13.5 4.996a.442.442 0 0 0-.884.002l.009 3.866a.33.33 0 0 0 .268.32l3.354-.001c1.79 0 2.542.207 3.042.588.333.254.461.739.349 1.37C18.633 16.755 12.273 23.71 12.034 24z"/>
              </svg>
              Swiggy
            </a>
            <a
              href="https://www.zomato.com/bhopal/jaffa-shawarma-arera-colony"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 bg-[#CB192E] hover:bg-[#A81021] text-white font-inter text-[9px] tracking-widest uppercase font-bold text-center flex items-center justify-center gap-1.5 cursor-none rounded-full shadow-[0_4px_12px_rgba(203,25,46,0.2)] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-3 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014z"/>
              </svg>
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
          {/* Scroll Buttons - Always visible on desktop */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-24px] top-[50%] -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-xl flex items-center justify-center text-luxury-text-charcoal hover:bg-luxury-accent-blue hover:text-white hover:border-transparent transition-all duration-300 z-30 cursor-none hidden md:flex"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-[-24px] top-[50%] -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-xl flex items-center justify-center text-luxury-text-charcoal hover:bg-luxury-accent-blue hover:text-white hover:border-transparent transition-all duration-300 z-30 cursor-none hidden md:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* Snap scroll container */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none !important;
            }
          `}</style>
          <div
            ref={scrollContainerRef}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="flex gap-8 overflow-x-auto pb-8 pt-2 scrollbar-hide no-scrollbar snap-x snap-mandatory scroll-smooth bg-transparent"
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
