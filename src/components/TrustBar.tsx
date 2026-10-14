import React from 'react';
import { Award, Compass, Layers, ShieldCheck, Zap, Briefcase, Hammer } from 'lucide-react';

const trustItems = [
  { text: '30+ Years Experience', icon: Award },
  { text: '100+ Projects Delivered', icon: ShieldCheck },
  { text: 'Residential Construction', icon: Compass },
  { text: 'Commercial Construction', icon: Layers },
  { text: 'Turnkey Solutions', icon: Zap },
  { text: 'Site Supervision', icon: Briefcase },
  { text: 'Structural Safety', icon: ShieldCheck },
  { text: 'Renovation Experts', icon: Hammer },
];

export const TrustBar: React.FC = () => {
  // Triple the items to ensure seamless loop without gaps
  const marqueeItems = [...trustItems, ...trustItems, ...trustItems];

  return (
    <div className="relative w-full bg-white/30 backdrop-blur-xl py-6 overflow-hidden border-y border-white/60 z-10 shadow-md">
      {/* Marquee Row */}
      <div className="flex w-max items-center animate-marquee">
        {marqueeItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 px-8 text-[#111111] uppercase tracking-wider text-xs md:text-sm font-extrabold select-none whitespace-nowrap"
            >
              <Icon className="h-4 w-4 text-[#C92C15]" />
              <span>{item.text}</span>
              <span className="ml-8 text-black/30 font-light">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TrustBar;
