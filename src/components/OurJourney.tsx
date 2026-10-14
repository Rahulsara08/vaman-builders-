import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { assets } from '../lib/cloudinary';

export const OurJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      let step: number;
      if (latest < 0.28) {
        step = 0;
      } else if (latest < 0.55) {
        step = 1;
      } else if (latest < 0.80) {
        step = 2;
      } else {
        step = 3;
      }
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const steps = [
    {
      year: "1995",
      title: "The Genesis",
      subtitle: "Lt. Gordhan Das Maheshwari & Ghanshyam Das Maheshwari",
      desc: "More than 30 years ago, our journey began in the heart of Johari Bazaar, Jaipur. Built on the principles of quality craftsmanship, integrity and long term relationships, our founders started with a simple vision, to create spaces that stand the test of time.",
      video: assets.videos.homeApproach,
      image: assets.heroBg,
    },
    {
      year: "2000s",
      title: "Commercial Milestones",
      subtitle: "Building the City's Foundations",
      desc: "We started with commercial construction projects, earning the trust of clients one project at a time. Every building we constructed was more than just brick and concrete; it was a reflection of our commitment to excellence, reliability and precision.",
      video: assets.videos.servicesCommercial,
      image: assets.generated.office,
    },
    {
      year: "2010s",
      title: "Residential & Turnkey Expansion",
      subtitle: "From Bricks to Complete Homes",
      desc: "As Jaipur grew, so did we. With decades of experience and a deep understanding of construction, we expanded our expertise beyond commercial projects into residential construction and turnkey solutions, offering end to end services from planning and design to final handover.",
      video: assets.videos.servicesResidential,
      image: assets.generated.bedroom,
    },
    {
      year: "Today",
      title: "Continuing the Legacy",
      subtitle: "Uncompromising Quality",
      desc: "Today, Utkarsh Builder proudly carries forward a legacy of over 30 years in construction, delivering commercial spaces, dream homes and turnkey projects with the same values that shaped our foundation: honesty, transparency and uncompromising quality.",
      video: assets.videos.aboutInnovation,
      image: assets.generated.corridor,
    }
  ];

  return (
    <section className="relative py-16 md:py-32 bg-[#FAF7F5] border-t border-black/5 overflow-hidden" ref={containerRef}>
      {/* Decorative corner glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#C92C15]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#C92C15]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] bg-[#C92C15]/5 px-3.5 py-1.5 rounded-full">
              Our Journey
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1B1B1B] leading-tight"
          >
            Every strong structure begins with a <span className="font-semibold text-[#C92C15]">strong foundation</span>.
          </motion.h2>
        </div>

        {/* Main Content Area: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch relative">
          
          {/* Left Column: Sliding Video Container (Desktop only, col-span-5) */}
          <div className="hidden lg:block lg:col-span-5 relative h-full self-stretch">
            <motion.div
              animate={{ top: `${activeStep * 26}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute left-0 w-full aspect-[4/3] rounded-[32px] overflow-hidden border border-black/5 shadow-2xl bg-black"
            >
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeStep === idx ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <video
                    src={step.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Timeline Cards (col-span-7) */}
          <div className="col-span-1 lg:col-span-7 relative pl-0 pr-0">
            
            {/* Steps List */}
            <div className="space-y-16 md:space-y-24 relative pl-8 md:pl-12 lg:pl-16">
              
              {/* Progress Line (Shared for Desktop & Mobile) */}
              <div className="absolute left-0 top-6 bottom-12 w-0.5">
                <div className="absolute inset-0 bg-black/5 rounded-full" />
                <motion.div
                  style={{ height: lineHeight }}
                  className="absolute top-0 left-0 right-0 bg-[#C92C15] rounded-full shadow-[0_0_8px_rgba(201,44,21,0.3)]"
                />
              </div>

              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative text-left"
                  >
                    {/* Node Dot (centered on the progress line at left-0) */}
                    <span className="absolute left-0 top-6 -translate-x-1/2 z-20 h-5 w-5 flex items-center justify-center rounded-full bg-white border border-black/10 shadow-sm transition-all duration-300">
                      <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-[#C92C15] scale-125' : 'bg-gray-300'}`} />
                    </span>

                    {/* Timeline Text Card */}
                    <div className={`p-6 md:p-8 bg-white border rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-500 relative group flex flex-col space-y-4 ${
                      isActive ? 'border-[#C92C15]/20 shadow-md translate-x-1' : 'border-black/5'
                    }`}>
                      
                      {/* Year & Title */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#C92C15] text-white' : 'bg-black/5 text-[#6F6F6F]'
                        }`}>
                          {step.year}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xl md:text-2xl font-bold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider">
                          {step.subtitle}
                        </p>
                      </div>

                      {/* Video inline for mobile (hidden on Desktop/lg) */}
                      <div className="lg:hidden w-full aspect-video rounded-2xl overflow-hidden border border-black/5 bg-black relative mt-2">
                        <video
                          src={step.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      </div>

                      <p className="text-sm md:text-base text-[#6F6F6F] font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Final Quote/CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 md:mt-32 border-l-4 border-[#C92C15] pl-6 md:pl-10 max-w-4xl text-left mx-auto"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl italic font-light text-[#1B1B1B] leading-relaxed">
            "Our journey has always been about one thing: building trust before buildings."
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default OurJourney;
