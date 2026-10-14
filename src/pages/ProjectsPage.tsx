import React from 'react';
import { FadeUp } from '../components/ui/FadeUp';
import Projects from '../components/Projects';
import HeroSection from '../components/ui/hero-section-9';
import { Shield } from 'lucide-react';
import { assets } from '../lib/cloudinary';

export const ProjectsPage: React.FC = () => {

  const heroData = {
    title: (
      <>
        Crafted With <span className="font-semibold text-[#C92C15]">Precision</span>
      </>
    ),
    subtitle: 'Explore our landmark projects across Rajasthan, from modern offices to custom built luxury villas.',
    actions: [
      {
        text: 'Book Consultation',
        onClick: () => { window.location.href = '/contact#contact-section' }
      }
    ],
    images: [
      assets.projects.hotelCol1_1,
      assets.projects.msCol1_2,
      assets.projects.bhangadiyaCol1_1,
      assets.projects.indieCol2,
      assets.projects.barfiwalaCol1_1,
      assets.projects.paliwalCol1_2,
    ],
  };

  // Specs lists for landmark building materials in Rajasthan
  const projectSpecifications = [
    {
      title: 'Structural Steel',
      desc: 'Corrosion-Resistant TMT bars grade Fe 550D for seismic protection.'
    },
    {
      title: 'Cement & Concrete',
      desc: 'High-strength M25 mix designs cured specifically for regional climate criteria in Rajasthan.'
    },
    {
      title: 'Exterior Facade',
      desc: 'Double-glazed vacuum glass cladding providing 45dB acoustic dampening.'
    },
    {
      title: 'Waterproof Membrane',
      desc: 'Multi-layer polyurethane systems for robust structural waterproofing protection.'
    }
  ];

  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24 overflow-x-hidden">
      
      {/* 1. Portfolio Hero Section */}
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        actions={heroData.actions}
        images={heroData.images}
      />

      {/* 2. Stacking Card Showcase Component */}
      <div className="relative z-10">
        <Projects filter="all" />
      </div>

      {/* 4. Quality & Material Specifications Grid (Additional luxury detail) */}
      <div className="py-12 md:py-24 bg-white text-[#1B1B1B] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
            <FadeUp delay={0.1} className="mb-3">
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Engineering Quality</span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1B1B1B]">
                Structural Specifications
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {projectSpecifications.map((spec, index) => (
              <FadeUp
                key={index}
                delay={index * 0.1}
                y={30}
                className="p-4 md:p-8 rounded-2xl bg-[#FAF7F5]/50 border border-black/5 flex flex-col justify-between text-left group hover:border-[#C92C15]/30 hover:bg-white transition-all duration-300 hover:shadow-lg shadow-sm"
              >
                <div>
                  <div className="h-8 w-8 md:h-10 md:w-10 bg-[#C92C15]/10 rounded-lg flex items-center justify-center text-[#C92C15] mb-4 md:mb-6">
                    <Shield className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="text-xs md:text-base font-semibold text-[#1B1B1B] mb-2 group-hover:text-[#C92C15] transition-all">
                    {spec.title}
                  </h3>
                  <p className="text-[10px] md:text-xs text-[#6F6F6F] font-light leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
export default ProjectsPage;
