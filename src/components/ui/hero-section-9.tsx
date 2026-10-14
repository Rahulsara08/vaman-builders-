import React from 'react';
import { motion } from 'framer-motion';

export interface ActionItem {
  text: string;
  onClick: () => void;
  variant?: 'default' | 'outline';
}

export interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionItem[];
  stats?: StatItem[];
  images: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  actions,
  stats,
  images
}) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[#FAF7F5] overflow-hidden text-center">
      {/* Decorative background glows */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[300px] bg-radial from-[rgba(201,44,21,0.06)] to-transparent filter blur-[40px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-[100px] left-[-100px] w-[500px] h-[300px] bg-radial from-[rgba(201,44,21,0.06)] to-transparent filter blur-[40px] pointer-events-none rounded-full z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
        {/* Category badge */}
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] bg-[#C92C15]/5 px-3.5 py-1.5 rounded-full inline-block"
        >
          Our Portfolio
        </motion.span>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1B1B1B] tracking-tight leading-tight max-w-3xl mx-auto"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-[#6F6F6F] font-light max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2"
          >
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer bg-[#C92C15] text-white hover:bg-[#D43B13] shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                {action.text}
              </button>
            ))}
          </motion.div>
        )}

        {/* Stats Grid */}
        {stats && stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto pt-10 md:pt-16 border-t border-black/5"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                <div className="h-10 w-10 bg-[#C92C15]/5 border border-[#C92C15]/10 rounded-xl flex items-center justify-center text-[#C92C15] mb-1">
                  {stat.icon}
                </div>
                <span className="text-xl md:text-3xl font-extrabold text-[#1B1B1B] tracking-tight">{stat.value}</span>
                <span className="text-[10px] md:text-xs text-[#6F6F6F] font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* 3D Tilted Image Collage Grid */}
      {images && images.length >= 6 && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden sm:grid max-w-6xl mx-auto mt-16 md:mt-24 px-6 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 relative z-10"
        >
          {/* Column 1: Skewed Left */}
          <div className="space-y-6 md:space-y-8 transform md:rotate-[-4deg] md:-translate-y-4">
            <div className="overflow-hidden rounded-[24px] border border-black/5 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-500 aspect-[4/3] bg-black/5">
              <img src={images[0]} alt="Portfolio Item 1" className="w-full h-full object-cover object-center" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-[24px] border border-black/5 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-500 aspect-[4/3] bg-black/5">
              <img src={images[3]} alt="Portfolio Item 4" className="w-full h-full object-cover object-center" loading="lazy" />
            </div>
          </div>

          {/* Column 2: Aligned Straight */}
          <div className="space-y-6 md:space-y-8 transform md:translate-y-4">
            <div className="overflow-hidden rounded-[24px] border border-black/5 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-500 aspect-[4/3] bg-black/5">
              <img src={images[1]} alt="Portfolio Item 2" className="w-full h-full object-cover object-center" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-[24px] border border-black/5 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-500 aspect-[4/3] bg-black/5">
              <img src={images[4]} alt="Portfolio Item 5" className="w-full h-full object-cover object-center" loading="lazy" />
            </div>
          </div>

          {/* Column 3: Skewed Right */}
          <div className="space-y-6 md:space-y-8 transform md:rotate-[4deg] md:-translate-y-4">
            <div className="overflow-hidden rounded-[24px] border border-black/5 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-500 aspect-[4/3] bg-black/5">
              <img src={images[2]} alt="Portfolio Item 3" className="w-full h-full object-cover object-center" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-[24px] border border-black/5 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-500 aspect-[4/3] bg-black/5">
              <img src={images[5]} alt="Portfolio Item 6" className="w-full h-full object-cover object-center" loading="lazy" />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
