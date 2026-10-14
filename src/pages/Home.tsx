import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import TrustBar from '../components/TrustBar';
import About from '../components/About';
import MarketPresence from '../components/MarketPresence';
import DevelopmentShowcase from '../components/DevelopmentShowcase';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import ShuffleHero from '../components/ShuffleHero';
import Contact from '../components/Contact';
import { FadeUp } from '../components/ui/FadeUp';
import { FadeIn } from '../components/ui/FadeIn';
import { AnimatedHeading } from '../components/ui/AnimatedHeading';
import { PointerHighlight } from '../components/ui/pointer-highlight';
import { assets } from '../lib/cloudinary';

// New Conversion Sections
import RecentProjectsGrid from '../components/RecentProjectsGrid';
import FAQAccordion from '../components/FAQAccordion';

export const Home: React.FC = () => {
  return (
    <>
      {/* ── All content stacks above the fixed video (z-index: 0 in App.tsx) ── */}
      <main className="home-content-layer w-full min-h-screen relative">

        {/* ════════════════════════════════════════════════════════════════════
            HERO SECTION — scroll-scrub pinned viewport container
            ════════════════════════════════════════════════════════════════════ */}
        <section id="home" className="relative w-full h-[320vh]">
          {/* Sticky wrapper to pin the contents while scrolling */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
            {/* Top blur edge */}
            <div className="blur-overlay blur-overlay-top" />

            {/* Targetable container for fading out all hero text/buttons */}
            <div className="hero-text-container absolute inset-0 z-20 w-full h-full">
              {/* ── DESKTOP HERO TEXT ── */}
              <div
                className="hidden md:block absolute left-0 right-0 px-12 lg:px-16"
                style={{ top: '42%', transform: 'translateY(-42%)' }}
              >
                <div className="relative -ml-12 lg:-ml-16 pl-12 lg:pl-16 pr-24 py-10 md:py-14 w-full max-w-4xl flex flex-col justify-center text-left">
                  <div className="relative z-10 w-full flex flex-col justify-center">
                    <AnimatedHeading
                      text={"Building Spaces\nThat Define Generations."}
                      className="text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white mb-4 leading-[1.1] drop-shadow-md"
                      initialDelay={200}
                      charDelay={30}
                      charDuration={500}
                      highlightText="Define Generations."
                      highlightClassName="text-[#C92C15]"
                    />

                    <FadeIn delay={800} duration={1000}>
                      <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
                        With 30+ years of experience and over 100 completed projects in Rajasthan, we{' '}
                        <PointerHighlight delay={1.8} containerClassName="text-[#C92C15] font-bold">
                          transform
                        </PointerHighlight>{' '}
                        ideas into premium homes and commercial spaces built to last.
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
                          className="bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all px-8 py-3.5 rounded-lg font-medium cursor-pointer shadow-lg hover:scale-105 active:scale-95 inline-block text-center"
                        >
                          Explore Projects
                        </Link>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </div>

              {/* ── MOBILE HERO TEXT ── */}
              <div className="md:hidden absolute inset-0 flex items-center justify-start px-6">
                <div className="w-full text-left relative z-10">
                  <AnimatedHeading
                    text={"Building Spaces\nThat Define Generations."}
                    className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6 leading-[1.15] drop-shadow-lg"
                    initialDelay={200}
                    charDelay={30}
                    charDuration={500}
                    highlightText="Define Generations."
                    highlightClassName="text-[#C92C15]"
                  />

                  <FadeIn delay={1000} duration={1000}>
                    <p className="text-sm text-white mb-6 leading-relaxed font-medium drop-shadow">
                      30+ years · 100+ projects · Rajasthan's trusted builder.
                    </p>
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
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            All sections below — ultra-refined liquid glassmorphism components
            ════════════════════════════════════════════════════════════════════ */}

        {/* 2. Trust Bar scrolling marquee */}
        <TrustBar />

        {/* 3. About Section */}
        <About />

        {/* 6. Market Presence Stats */}
        <MarketPresence />

        {/* Recent Projects Grid */}
        <RecentProjectsGrid />

        {/* 8. Development Showcase */}
        <DevelopmentShowcase />

        {/* 10. Featured Video Section */}
        <section className="py-12 md:py-24 bg-white text-[#2A2A2A] border-t border-black/5">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
            <FadeUp delay={0.1} y={50} className="rounded-3xl overflow-hidden h-[340px] md:h-auto md:aspect-video relative group shadow-2xl border border-black/5 bg-gray-100">
              {/* Background looping build video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover select-none pointer-events-none opacity-80"
                src={assets.videos.homeApproach}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Bottom Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-10 flex flex-col justify-end items-start md:flex-row md:justify-between md:items-end gap-2 md:gap-6 z-10">
                {/* Left Approach Card */}
                <div className="hidden md:block liquid-glass border border-white/20 p-8 rounded-2xl max-w-md text-left">
                  <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block mb-0.5 animate-pulse">
                    Our Approach
                  </span>
                  <p className="text-sm text-gray-100 font-light leading-relaxed">
                    We believe in careful planning and solid building quality. Every drawing is designed to make the best use of space and every construction step is made to ensure your property is comfortable and built to last.
                  </p>
                </div>

                {/* Right Explore Button */}
                <Link
                  to="/services"
                  className="bg-white text-black hover:bg-gray-100 px-3.5 py-1.5 md:px-8 md:py-3.5 rounded-full text-[9px] md:text-sm font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer shadow-lg hover:scale-105 active:scale-95 duration-300 w-fit shrink-0"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="h-2.5 w-2.5 md:h-4 md:w-4" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 13. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 15. Construction Process Timeline */}
        <Process />

        {/* 17. Client Testimonials Slider */}
        <Testimonials />

        {/* 19. Shuffle Image Gallery Grid */}
        <ShuffleHero />

        {/* FAQ Accordion */}
        <FAQAccordion />

        {/* 20. Contact Form */}
        <Contact />

        {/* Smooth Background Blend Gradient Overlay at the bottom of homepage */}
        <div className="relative w-full h-48 -mt-48 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-[#0a0a0a]/40 z-20" />
      </main>
    </>
  );
};
export default Home;
