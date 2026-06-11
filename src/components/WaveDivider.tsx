import React from 'react';

interface WaveDividerProps {
  className?: string;
  height?: string; // e.g. "h-28" or "h-16"
  backWaveColor?: string; // Tailwind class like "text-[#7DD3FC]" or custom CSS color class
  frontWaveColor?: string; // Tailwind class like "text-[#BAE6FD]"
  backWaveOpacity?: number; // e.g. 0.45
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  className = "",
  height = "h-20",
  backWaveColor = "text-[#7DD3FC]",
  frontWaveColor = "text-[#BAE6FD]",
  backWaveOpacity = 0.45,
}) => {
  return (
    <div className={`absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 ${height} bg-transparent ${className}`}>
      <style>{`
        @keyframes wave-flow-fast {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes wave-flow-slow {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-wave-fast {
          animation: wave-flow-fast 14s linear infinite;
        }
        .animate-wave-slow {
          animation: wave-flow-slow 22s linear infinite;
        }
      `}</style>
      
      {/* Layer 1: Back Wave */}
      <div className="absolute inset-0 w-[200%] h-full flex animate-wave-slow" style={{ opacity: backWaveOpacity }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className={`w-1/2 h-full ${backWaveColor} fill-current flex-shrink-0 scale-x-[1.005]`}>
          <path d="M0,40 C150,75 300,10 450,40 C600,75 750,10 900,40 C1050,75 1200,10 1350,40 C1500,75 1650,10 1800,40 L1800,100 L0,100 Z" />
        </svg>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className={`w-1/2 h-full ${backWaveColor} fill-current flex-shrink-0 scale-x-[1.005]`}>
          <path d="M0,40 C150,75 300,10 450,40 C600,75 750,10 900,40 C1050,75 1200,10 1350,40 C1500,75 1650,10 1800,40 L1800,100 L0,100 Z" />
        </svg>
      </div>

      {/* Layer 2: Front Wave */}
      <div className="absolute inset-0 w-[200%] h-full flex animate-wave-fast">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className={`w-1/2 h-full ${frontWaveColor} fill-current flex-shrink-0 scale-x-[1.005]`}>
          <path d="M0,25 C120,60 240,0 360,25 C480,60 600,0 720,25 C840,60 960,0 1080,25 C1200,60 1320,0 1440,25 L1440,100 L0,100 Z" />
        </svg>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className={`w-1/2 h-full ${frontWaveColor} fill-current flex-shrink-0 scale-x-[1.005]`}>
          <path d="M0,25 C120,60 240,0 360,25 C480,60 600,0 720,25 C840,60 960,0 1080,25 C1200,60 1320,0 1440,25 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </div>
  );
};

export default WaveDivider;
