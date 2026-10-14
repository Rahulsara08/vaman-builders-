import React from 'react';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { FadeUp } from './ui/FadeUp';

export const Stats: React.FC = () => {
  const statsData = [
    { value: 30, suffix: '+', label: 'Years Experience' },
    { value: 100, suffix: '+', label: 'Projects Delivered' },
    { value: 100, suffix: '%', label: 'Client Commitment' },
    { value: 5, suffix: '★', label: 'Quality Focus' },
  ];

  return (
    <section className="relative bg-[#FAF7F5] py-20 overflow-hidden border-y border-black/5">
      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat, index) => (
            <FadeUp 
              key={index} 
              delay={index * 0.15} 
              y={30}
              className="flex flex-col items-center text-center group"
            >
              {/* Huge Counter */}
              <div className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#1B1B1B] mb-2 flex items-baseline justify-center">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  duration={2000} 
                  className="font-light"
                />
              </div>

              {/* Label */}
              <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.15em] mb-1">
                {stat.label}
              </span>
              
              {/* Subtle underline detail */}
              <div className="w-6 h-[2px] bg-[#C92C15] opacity-50 group-hover:w-12 transition-all duration-300 mt-2" />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Stats;
