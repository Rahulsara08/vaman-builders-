import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { assets } from '../lib/cloudinary';
import { MapPin, Expand, X, Calendar, ShieldCheck, Compass } from 'lucide-react';
import { FadeUp } from './ui/FadeUp';
import { motion, AnimatePresence } from 'framer-motion';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface ProjectCardData {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'renovation';
  categoryLabel: string;
  image: string;
  location: string;
  area: string;
  status: 'Completed' | 'In Progress';
  description: string;
}

const projectsData: ProjectCardData[] = [
  {
    id: 'proj-1',
    title: 'MS Jewellers',
    category: 'commercial',
    categoryLabel: 'Commercial Showroom',
    image: assets.projects.msCol2,
    location: 'Johari Bazaar',
    area: '12,000 Sq. Ft.',
    status: 'Completed',
    description: 'A high-concept luxury jewelry showroom combining advanced secure vault rooms, customized copper display counters and precise task lighting. Built with premium materials to ensure high durability and a stunning aesthetic.',
  },
  {
    id: 'proj-2',
    title: 'Barfiwala Sweets',
    category: 'commercial',
    categoryLabel: 'Premium Retail Showroom',
    image: assets.projects.barfiwalaCol2,
    location: 'Johari Bazaar',
    area: '8,500 Sq. Ft.',
    status: 'Completed',
    description: 'A modern retail sweets showroom blending heritage Rajasthani elements with clean contemporary display cases, hygiene-first packaging areas and warm inviting lighting.',
  },
  {
    id: 'proj-3',
    title: 'Reeve Inn Hotel',
    category: 'commercial',
    categoryLabel: 'Commercial & Hospitality',
    image: assets.projects.hotelCol2,
    location: 'Bani Park',
    area: '35,000 Sq. Ft.',
    status: 'In Progress',
    description: 'A premium hospitality project featuring a robust Fe 550D structural steel frame, reinforced concrete pillars, fire-resistant conduit pathways and customized layout divisions for hotel rooms and amenities.',
  },
  {
    id: 'proj-4',
    title: 'Paliwal Textile',
    category: 'commercial',
    categoryLabel: 'Textile Center & Office',
    image: assets.projects.paliwalCol2,
    location: 'MI Road',
    area: '15,000 Sq. Ft.',
    status: 'Completed',
    description: 'A state-of-the-art textile showroom and administrative office, featuring high-capacity fabric display racks, custom client discussion tables and a premium exterior glass facade.',
  },
  {
    id: 'proj-5',
    title: 'Bhangadiya House',
    category: 'residential',
    categoryLabel: 'Luxury Residence',
    image: assets.projects.bhangadiyaCol2,
    location: 'Johari Bazaar',
    area: '6,800 Sq. Ft.',
    status: 'Completed',
    description: 'A premium luxury residence featuring customized structural designs, high-end marble materials, and a traditional facade integrated with modern space planning.',
  },
  {
    id: 'proj-6',
    title: 'Indie Stitch',
    category: 'commercial',
    categoryLabel: 'Bespoke Boutique & Office',
    image: assets.projects.indieCol2,
    location: 'Mansarovar',
    area: '3,200 Sq. Ft.',
    status: 'Completed',
    description: 'A luxury fashion boutique and design office featuring custom wood paneling, premium layout spacing and modern design aesthetics.',
  },
];

export const RecentProjectsGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCardData | null>(null);

  useBodyScrollLock(selectedProject !== null);


  const modalElement = (
    <AnimatePresence>
      {selectedProject && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-6 pt-24 md:pt-28">
          
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative bg-white/95 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-2xl max-w-3xl w-full overflow-hidden z-20 flex flex-col max-h-[85vh] text-[#111111]"
          >
            {/* Fixed High Contrast Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#C92C15] transition-colors duration-300 flex items-center justify-center z-30 cursor-pointer shadow-xl"
              title="Close Dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable Content with hidden scrollbar */}
            <div className="overflow-y-auto pb-12 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* Banner Image */}
              <div className="relative aspect-[16/8] w-full overflow-hidden bg-gray-100">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-8 space-y-6 text-left">
                <div>
                  <span className="text-[#C92C15] text-[11px] font-extrabold uppercase tracking-wider block mb-2">
                    {selectedProject.categoryLabel}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#333333] font-bold">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#C92C15]" />
                      <span>{selectedProject.location}</span>
                    </div>
                    <span className="text-black/20">&bull;</span>
                    <div className="flex items-center gap-1.5">
                      <Expand className="h-3.5 w-3.5 text-[#C92C15]" />
                      <span>{selectedProject.area}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm md:text-base text-[#333333] font-medium leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Sleek Feature Pill Badges */}
                <div className="flex flex-wrap gap-2.5 border-t border-black/10 pt-6">
                  <div className="flex items-center gap-2 bg-black/5 border border-black/10 px-4 py-2 rounded-full text-xs text-[#111111] font-bold shadow-sm">
                    <Compass className="h-4 w-4 text-[#C92C15]" />
                    <span>Turnkey Engineering</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/5 border border-black/10 px-4 py-2 rounded-full text-xs text-[#111111] font-bold shadow-sm">
                    <ShieldCheck className="h-4 w-4 text-[#C92C15]" />
                    <span>Fe 550D Steel &amp; 53 Grade Concrete</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/5 border border-black/10 px-4 py-2 rounded-full text-xs text-[#111111] font-bold shadow-sm">
                    <Calendar className="h-4 w-4 text-[#C92C15]" />
                    <span>Milestone Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Header Block in White Liquid Glass Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 mb-12 md:mb-20 text-left shadow-2xl">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-extrabold uppercase tracking-[0.2em] block mb-3">
              Portfolio
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Recent Projects Grid
            </h2>
          </FadeUp>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((project, idx) => (
            <FadeUp
              key={project.id}
              delay={0.1 + idx * 0.08}
              y={35}
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col h-full cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-white text-[#111111] text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg border border-black/10">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow text-left">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#111111] mb-4 group-hover:text-[#C92C15] transition-colors leading-tight">
                    {project.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-4 text-xs font-extrabold text-[#333333]">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#C92C15]" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Expand className="h-4 w-4 text-[#C92C15]" />
                      <span>{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Render Modal directly to document.body via Portal */}
        {typeof document !== 'undefined' && createPortal(modalElement, document.body)}

      </div>
    </section>
  );
};
export default RecentProjectsGrid;
