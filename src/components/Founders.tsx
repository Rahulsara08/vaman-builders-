import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp } from './ui/FadeUp';
import { StaggerContainer } from './ui/StaggerContainer';
import { Award, GraduationCap, ArrowUpRight, X } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { assets } from '../lib/cloudinary';

export const Founders: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useBodyScrollLock(selectedIdx !== null);


  const founders = [
    {
      name: "Ghanshyam Das Maheshwari",
      role: "Founder",
      image: assets.founders.ghanshyam,
      icon: <Award className="h-5 w-5 text-[#C92C15]" />,
      tag: "30+ Years Construction Legacy",
      desc: "Ghanshyam Das Maheshwari is the visionary founder and driving force behind Utkarsh Builder, bringing over 30 years of rich experience in the construction and real estate industry. Renowned for his unwavering commitment to quality, integrity and customer satisfaction, he has successfully led numerous residential and commercial projects across Jaipur. His expertise spans project planning, execution and delivering developments that stand the test of time.",
      heritage: "Legacy Builder",
    },
    {
      name: "Utkarsh Nowal",
      role: "Director",
      image: assets.founders.utkarsh,
      icon: <GraduationCap className="h-5 w-5 text-[#C92C15]" />,
      tag: "MBA in Marketing and Operations",
      desc: "Utkarsh Nowal is a dynamic entrepreneur and the next generation leader at Utkarsh Builder. An MBA graduate specializing in Marketing and Operations, he brings a fresh, strategic and customer centric approach to the business, honed through prior experience at a real estate startup in market analysis and operational management. His vision is to expand Utkarsh Builder's legacy while upholding its core values of quality, trust and timely delivery.",
      heritage: "Modern Management",
    }
  ];

  return (
    <section className="py-12 md:py-32 bg-[#FAF7F5] relative overflow-hidden border-t border-black/5">
      {/* Background visual detail */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-24">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Leadership</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Meet Our Founders
            </h2>
          </FadeUp>
        </div>

        {/* 2-Column Arch Layout */}
        <StaggerContainer staggerChildren={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto justify-center">
          {founders.map((founder, idx) => (
            <motion.div
              key={idx}
              layoutId={`card-container-${idx}`}
              onClick={() => setSelectedIdx(idx)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-md hover:shadow-2xl transition-shadow duration-500 bg-gradient-to-b from-white to-[#FAF7F5] cursor-pointer"
            >
              {/* Arch Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <motion.img
                  layoutId={`card-image-${idx}`}
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                
                {/* Floating badge inside image overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white font-semibold bg-[#C92C15] px-3 py-1 rounded-full">
                      {founder.role}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold mt-2 text-white tracking-tight drop-shadow-sm">
                      {founder.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Founder Text & Qualifications */}
              <div className="p-5 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-[#C92C15]/5 rounded-lg shrink-0">
                      {founder.icon}
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-gray-800">
                      {founder.tag}
                    </span>
                  </div>

                  {/* Short text snippet (line-clamp-2) to keep card text visible but not overwhelming */}
                  <p className="text-sm text-[#6F6F6F] font-light leading-relaxed text-left line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {founder.desc}
                  </p>
                </div>

                <div className="border-t border-black/5 pt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#C92C15] uppercase tracking-wider">
                    {founder.heritage}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#C92C15]/5 flex items-center justify-center group-hover:bg-[#C92C15] transition-colors duration-300">
                    <ArrowUpRight className="h-4 w-4 text-[#C92C15] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>

      {/* Morphing Modal Overlay */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 cursor-pointer"
          >
            {/* Modal Card */}
            <motion.div
              layoutId={`card-container-${selectedIdx}`}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-2xl max-w-2xl w-full flex flex-col items-center p-8 md:p-12 cursor-default"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 hover:text-gray-900 transition-colors z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Centered Image */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#C92C15]/10 shadow-lg bg-gray-100 shrink-0 z-10">
                <motion.img
                  layoutId={`card-image-${selectedIdx}`}
                  src={founders[selectedIdx].image}
                  alt={founders[selectedIdx].name}
                  className="w-full h-full object-cover"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>

              {/* Centered Info & Full Bio Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-center mt-6 flex flex-col items-center w-full"
              >
                <span className="text-[10px] uppercase tracking-widest text-white font-bold bg-[#C92C15] px-3.5 py-1 rounded-full">
                  {founders[selectedIdx].role}
                </span>

                <h3 className="text-2xl md:text-3xl font-extrabold mt-3 text-[#1B1B1B] tracking-tight">
                  {founders[selectedIdx].name}
                </h3>

                <div className="flex items-center gap-2 mt-3 text-gray-700 bg-[#C92C15]/5 px-4 py-2 rounded-xl border border-[#C92C15]/10">
                  <div className="text-[#C92C15] shrink-0">
                    {founders[selectedIdx].icon}
                  </div>
                  <span className="text-xs font-semibold tracking-wide text-gray-800">
                    {founders[selectedIdx].tag}
                  </span>
                </div>

                <div className="w-full border-t border-black/5 my-6" />

                {/* The Full Readable Text */}
                <p className="text-sm md:text-base text-[#6F6F6F] font-light leading-relaxed max-h-[220px] overflow-y-auto px-2 md:px-6 text-center select-text scrollbar-thin">
                  {founders[selectedIdx].desc}
                </p>

                <div className="mt-8 flex items-center justify-between w-full border-t border-black/5 pt-4 text-xs font-bold text-[#C92C15] uppercase tracking-wider">
                  <span>{founders[selectedIdx].heritage}</span>
                  <button
                    onClick={() => setSelectedIdx(null)}
                    className="px-5 py-2 bg-[#C92C15]/5 hover:bg-[#C92C15] text-[#C92C15] hover:text-white rounded-xl transition-all duration-300 cursor-pointer font-bold uppercase tracking-wider text-[10px]"
                  >
                    Close Profile
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Founders;
