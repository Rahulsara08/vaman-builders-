import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { FadeIn } from './ui/FadeIn';
import { PointerHighlight } from './ui/pointer-highlight';
import { assets } from '../lib/cloudinary';

export const Hero = () => {
  const [mode, setMode] = useState<'before' | 'after'>('before');

  const toggleOptions = [
    { id: 'before', label: 'Under Construction' },
    { id: 'after', label: 'Completed' }
  ] as const;

  return (
    <section id="home" className="hero">
      <div className="blur-overlay blur-overlay-top" />
      
      {/* Background Video - Under Construction (Before) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`hero-bg w-full h-full object-cover select-none pointer-events-none ${mode === 'before' ? 'bg-front' : 'pull-down'}`}
      >
        <source src={assets.videos.heroBannerBeforeWebm} type="video/webm" />
        <source src={assets.videos.heroBannerBeforeMp4} type="video/mp4" />
      </video>

      {/* Background Video - Completed (After) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`hero-bg w-full h-full object-cover select-none pointer-events-none ${mode === 'after' ? 'bg-front' : 'pull-down'}`}
      >
        <source src={assets.videos.heroBannerAfterWebm} type="video/webm" />
        <source src={assets.videos.heroBannerAfterMp4} type="video/mp4" />
      </video>

      {/* Dark tint overlay over the video on mobile only */}
      <div className="absolute inset-0 bg-black/40 md:bg-transparent z-10 pointer-events-none" />

      {/* Spacer below the navbar (desktop only) */}
      <div className="h-24 w-full relative z-20 hidden md:block" />

      {/* ================= DESKTOP LAYOUT (md and up) ================= */}
      <div
        className="hidden md:block absolute left-0 right-0 z-20 px-12 lg:px-16 text-left"
        style={{
          top: '42%',
          transform: 'translateY(-42%)',
        }}
      >
        <div className="relative -ml-12 lg:-ml-16 pl-12 lg:pl-16 pr-24 py-10 md:py-14 w-full max-w-4xl flex flex-col justify-center text-left rounded-r-[32px]">
          {/* Fading Glass Card Background */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-r-[32px] shadow-2xl hero-overlay-mask pointer-events-none z-0" />

          <div className="relative z-10 w-full flex flex-col justify-center">
            <AnimatedHeading
              text={"Building Spaces\nThat Define Generations."}
              className="text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-[#1B1B1B] mb-4 leading-[1.1]"
              initialDelay={200}
              charDelay={30}
              charDuration={500}
              highlightText="Define Generations."
              highlightClassName="text-[#C92C15]"
            />

            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-800 mb-6 max-w-2xl font-semibold leading-relaxed">
                With 30+ years of experience and over 100 completed projects in Rajasthan, we <PointerHighlight delay={1.8} containerClassName="text-[#C92C15] font-semibold">transform</PointerHighlight> ideas into premium homes and commercial spaces built to last.
              </p>
            </FadeIn>


            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact#contact-section"
                  className="bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all px-8 py-3.5 rounded-lg font-medium cursor-pointer shadow-lg hover:scale-105 active:scale-95 inline-block text-center"
                >
                  Book Consultation
                </Link>
                <Link
                  to="/projects"
                  className="bg-white border border-black/10 text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white transition-all px-8 py-3.5 rounded-lg font-medium cursor-pointer shadow-lg hover:scale-105 active:scale-95 inline-block text-center"
                >
                  Explore Projects
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ================= MOBILE LAYOUT (phone) ================= */}
      <div className="md:hidden absolute inset-0 z-20 flex items-center justify-start px-6">
        <div className="w-full text-left">
          <AnimatedHeading
            text={"Building Spaces\nThat Define Generations."}
            className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6 leading-[1.15]"
            initialDelay={200}
            charDelay={30}
            charDuration={500}
            highlightText="Define Generations."
            highlightClassName="text-[#C92C15]"
          />

          {/* Slider Toggle (Mobile) */}
          <FadeIn delay={1000} duration={1000}>
            <div className="flex items-center gap-0.5 bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-full w-fit shadow-inner mb-6 relative">
              {toggleOptions.map((opt) => {
                const isActive = mode === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setMode(opt.id)}
                    className={`relative px-3.5 py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-300 z-10 cursor-pointer ${
                      isActive ? 'text-[#1B1B1B]' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabMobile"
                        className="absolute inset-0 rounded-full -z-10"
                        style={{ backgroundColor: 'var(--active-toggle)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={1200} duration={1000}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact#contact-section"
                className="bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all px-8 py-4 rounded-xl font-semibold cursor-pointer shadow-lg hover:scale-105 active:scale-95 text-center text-sm uppercase tracking-wider"
              >
                Book Consultation
              </Link>
              <Link
                to="/projects"
                className="bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all px-8 py-4 rounded-xl font-semibold cursor-pointer shadow-lg hover:scale-105 active:scale-95 text-center text-sm uppercase tracking-wider"
              >
                Explore Projects
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Floating Slider Toggle (Desktop - Bottom Right) */}
      <div className="hidden md:flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 p-1.5 rounded-full shadow-2xl absolute bottom-12 right-12 lg:right-16 z-30">
        {toggleOptions.map((opt) => {
          const isActive = mode === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setMode(opt.id)}
              className={`relative px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 z-10 cursor-pointer ${
                isActive ? 'text-[#1B1B1B]' : 'text-white/70 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabDesktop"
                  className="absolute inset-0 rounded-full -z-10"
                  style={{ backgroundColor: 'var(--active-toggle)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
export default Hero;
