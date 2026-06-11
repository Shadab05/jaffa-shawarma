/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: {
            ivory: "#F8FAFF",       // Ivory Canvas (Light Theme)
            cream: "#F0F4FF",       // Ice blue / light accent fill
            champagne: "#E8EDFF",   // Deeper light fill
            pearl: "#FFFFFF",       // Pure White
            blush: "#FFF9F6",       // Soft rose gold blush tint
            rose: "#FFF3ED",        // Soft peach blush tint
            beige: "#F5EFEB",       // Soft light beige
            peach: "#FFFDFB",
            black: "#000000"        // Hero Black Backdrop
          },
          accent: {
            blue: "#0E5BFF",        // Primary Royal Blue Accent
            blueglow: "#4D8CFF",    // Glowing neon blue
            gold: "#B78759",        // Rose gold / bronze
            rosegold: "#D4AF37",    // Brass / Gold
            goldglow: "#F59E0B",    // Warm fire amber glow
            coral: "#EF4444"        // Flame red highlight
          },
          text: {
            black: "#0D1117",       // Deep Indigo Charcoal (Primary text)
            charcoal: "#1F2937",    // Secondary body text
            brown: "#4B5563",       // Gray-brown body text
            gold: "#B78759",        // Accent text gold
            blue: "#0E5BFF"         // Accent text blue
          }
        }
      },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        inter: ["'Inter'", "sans-serif"],
        editorial: ["'Cinzel'", "serif"]
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
