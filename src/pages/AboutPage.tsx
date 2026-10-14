import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeUp } from '../components/ui/FadeUp';
import { PointerHighlight } from '../components/ui/pointer-highlight';
import Founders from '../components/Founders';
import About from '../components/About';
import OurJourney from '../components/OurJourney';
import { Layers, ShieldCheck, Landmark, Leaf, Eye, Award } from 'lucide-react';
import { assets } from '../lib/cloudinary';
const HookVideo = assets.videos.hookMp4;
const HookWebm = assets.videos.hookWebm;

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className, delay }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Spotlight glow position mapping
  const glowLeft = useTransform(x, [0, 1], ["-20%", "120%"]);
  const glowTop = useTransform(y, [0, 1], ["-20%", "120%"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <FadeUp delay={delay} y={30} className="h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className={`${className} relative overflow-hidden transition-all duration-300 h-full cursor-pointer group`}
      >
        {/* Spotlight glow effect following mouse */}
        <motion.div
          style={{
            left: glowLeft,
            top: glowTop,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#C92C15]/5 rounded-full blur-[70px] pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Content wrapper with depth */}
        <div style={{ transform: "translateZ(25px)" }} className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </FadeUp>
  );
};

export const AboutPage: React.FC = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const totalRange = elementHeight - viewportHeight;
      if (totalRange <= 0) return;
      const currentProgress = Math.min(1, Math.max(0, scrolled / totalRange));
      setProgress(currentProgress);

      let currentIdx = 0;
      if (currentProgress >= 0.5) currentIdx = 1;
      if (currentProgress >= 0.85) currentIdx = 2;
      setActivePillar(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Card 0 style helper interpolations
  const getCard0Scale = (p: number) => {
    if (p <= 0.1) return 1;
    if (p <= 0.45) return 1 - ((p - 0.1) / 0.35) * 0.04;
    if (p <= 0.6) return 0.96;
    if (p <= 0.95) return 0.96 - ((p - 0.6) / 0.35) * 0.04;
    return 0.92;
  };

  const getCard0Opacity = (p: number) => {
    if (p <= 0.1) return 1;
    if (p <= 0.45) return 1 - ((p - 0.1) / 0.35) * 0.15;
    if (p <= 0.6) return 0.85;
    if (p <= 0.95) return 0.85 - ((p - 0.6) / 0.35) * 0.15;
    return 0.7;
  };

  // Card 1 style helper interpolations
  const getCard1Y = (p: number) => {
    if (p <= 0.05) return 1000;
    if (p <= 0.45) {
      const progressFraction = (p - 0.05) / 0.4;
      return 1000 - progressFraction * 976;
    }
    return 24;
  };

  const getCard1Scale = (p: number) => {
    if (p <= 0.65) return 1;
    if (p <= 0.95) return 1 - ((p - 0.65) / 0.3) * 0.04;
    return 0.96;
  };

  const getCard1Opacity = (p: number) => {
    if (p <= 0.05) return 0;
    if (p <= 0.3) return (p - 0.05) / 0.25;
    if (p <= 0.65) return 1;
    if (p <= 0.95) return 1 - ((p - 0.65) / 0.3) * 0.15;
    return 0.85;
  };

  // Card 2 style helper interpolations
  const getCard2Y = (p: number) => {
    if (p <= 0.55) return 1000;
    if (p <= 0.95) {
      const progressFraction = (p - 0.55) / 0.4;
      return 1000 - progressFraction * 952;
    }
    return 48;
  };

  const getCard2Opacity = (p: number) => {
    if (p <= 0.55) return 0;
    if (p <= 0.8) return (p - 0.55) / 0.25;
    return 1;
  };

  const renderPillarGraphic = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fm=webp&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      assets.aboutBuilding
    ];
    
    const titles = [
      'Selecting the Best Land',
      'Smart Design Planning',
      'Long Term Support'
    ];

    return (
      <div className="relative w-full h-full overflow-hidden rounded-[24px]">
        <motion.img
          key={index}
          src={images[index]}
          alt={titles[index]}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className={`w-full h-full object-cover ${index === 2 ? 'object-[70%_center]' : 'object-center'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white font-semibold text-xs tracking-wide uppercase">
          Pillar 0{index + 1}
        </div>
      </div>
    );
  };
  const titles = useMemo(
    () => ["luxurious", "durable", "modern", "sustainable", "timeless"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 4000); // slowed down to 4 seconds
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24">

      {/* 1. Premium Animated Text-Rotating Header Banner */}
      <div className="inner-hero-banner relative overflow-hidden pt-28 pb-16 md:pt-48 md:pb-32 flex flex-col items-center justify-center !h-auto min-h-[460px] md:min-h-[600px]">
        {/* Hanging Hook Video Component on Top Left - Flush to Navbar on Mobile */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-[65px] md:top-[88px] right-[-30px] sm:right-[-40px] md:right-[-100px] w-[340px] sm:w-[480px] md:w-[800px] h-auto pointer-events-none z-20 mix-blend-multiply filter contrast-[1.1] brightness-[1.05] opacity-60 md:opacity-100"
        >
          <source src={HookWebm} type="video/webm" />
          <source src={HookVideo} type="video/mp4" />
        </video>

        {/* Decorative radial glows */}
        <div className="inner-hero-banner-glow top-[-50px] right-[-100px] absolute w-[300px] h-[300px] bg-[#C92C15]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="inner-hero-banner-glow bottom-[-50px] left-[-100px] absolute w-[300px] h-[300px] bg-[#C92C15]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl text-center px-6 space-y-6 md:space-y-8 flex flex-col items-center">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] bg-[#C92C15]/5 px-4 py-1.5 rounded-full inline-block">
              Our Legacy
            </span>
          </FadeUp>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-[#1B1B1B] tracking-tight leading-tight max-w-3xl mx-auto flex flex-col items-center justify-center gap-y-2 md:gap-y-4">
              <span>We build spaces that are</span>
              <span className="relative inline-block font-semibold text-[#C92C15] w-full text-center h-[1.2em] overflow-hidden">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-0 flex justify-center items-center whitespace-nowrap"
                    initial={{ opacity: 0, y: 15 }}
                    animate={
                      titleNumber === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: -15 }
                    }
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <FadeUp delay={0.3}>
              <p className="text-[#6F6F6F] font-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed pt-1 md:pt-2">
                A legacy of <PointerHighlight delay={0.8} containerClassName="text-[#C92C15] font-semibold">craftsmanship</PointerHighlight>, structural safety and transparent client communication in every project since 1995.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.4} className="pt-2 md:pt-4 flex justify-center items-center w-full sm:w-auto">
            <Link
              to="/contact#contact-section"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C92C15] text-white hover:bg-[#D43B13] rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Contact Us</span>
              <span className="text-lg">→</span>
            </Link>
          </FadeUp>
        </div>
      </div>



      {/* Our Journey — real client story, replaces the old scroll-text-rise placeholder copy */}
      <OurJourney />

      {/* 3. Story, Vision, Mission Tabs Component */}
      <About />

      {/* Beyond Construction Section (Developer positioning) */}
      <section ref={containerRef} className="relative w-full h-auto lg:h-[300vh] bg-white border-t border-black/5 overflow-visible z-10 py-16 lg:py-0">
        
        {/* Sticky wrapper to pin the section content in the viewport center */}
        <div className="relative lg:sticky lg:top-0 lg:h-screen w-full flex items-center justify-center overflow-visible bg-white">
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(201,44,21,0.02)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative">
              
              {/* Left Column: Title, Description & Progress Indicators (lg:col-span-5) */}
              <div className="lg:col-span-5 text-left flex flex-col space-y-6">
                <FadeUp delay={0.1}>
                  <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] bg-[#C92C15]/5 px-3.5 py-1.5 rounded-full inline-block">
                    Our Promise to You
                  </span>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#1B1B1B] tracking-tight leading-[1.1] mt-2">
                    More Than Just <br className="hidden lg:block" /><span className="font-semibold text-[#C92C15]">Building</span>
                  </h2>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <p className="text-[#6F6F6F] font-light text-sm md:text-base leading-relaxed">
                    We act as your long term property partner. Our work does not start or stop with laying bricks. We help you plan, build and maintain your properties so they remain valuable and safe for years to come.
                  </p>
                </FadeUp>

                {/* Progress dashes indicators */}
                <FadeUp delay={0.4} className="flex items-center space-x-2.5 pt-4">
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        activePillar === idx 
                          ? 'w-10 bg-[#C92C15]' 
                          : 'w-4 bg-black/10'
                      }`}
                    />
                  ))}
                </FadeUp>
              </div>

              {/* Right Column: Stacked Sticky Cards (lg:col-span-7) */}
              <div className="lg:col-span-7 relative w-full h-auto lg:h-[300px] flex flex-col lg:block items-center justify-center gap-6 lg:gap-0 mt-8 lg:mt-0 overflow-visible">
                {[
                  {
                    icon: Landmark,
                    title: 'Selecting the Best Land',
                    desc: 'We look for areas that are growing fast and check city rules to find the perfect plot for your building.',
                    y: 0,
                    scale: getCard0Scale(progress),
                    opacity: getCard0Opacity(progress),
                    zIndex: 10
                  },
                  {
                    icon: Layers,
                    title: 'Smart Design Planning',
                    desc: 'We design rooms for great natural sunlight, maximum space utility and flexible layouts.',
                    y: getCard1Y(progress),
                    scale: getCard1Scale(progress),
                    opacity: getCard1Opacity(progress),
                    zIndex: 20
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Long Term Support',
                    desc: 'We offer checkups and support to keep your building completely safe even after you move in.',
                    y: getCard2Y(progress),
                    scale: 1,
                    opacity: getCard2Opacity(progress),
                    zIndex: 30
                  }
                ].map((item, idx) => {
                  return (
                    <motion.div
                      key={idx}
                      style={isDesktop ? {
                        y: item.y,
                        scale: item.scale,
                        opacity: item.opacity,
                        zIndex: item.zIndex,
                      } : {
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        zIndex: 1,
                      }}
                      className={`${
                        isDesktop ? 'absolute inset-0 w-full h-full' : 'relative w-full h-auto min-h-[320px]'
                      } flex flex-col md:flex-row overflow-hidden bg-white border border-black/5 rounded-[32px] shadow-2xl hover:border-[#C92C15]/20 transition-all duration-500 cursor-pointer`}
                    >
                      {/* Inline Image graphic (shows on all screens, left side on md/lg, top side on mobile) */}
                      <div className="w-full md:w-[35%] h-[140px] md:h-auto p-4 relative overflow-hidden self-stretch shrink-0">
                        {renderPillarGraphic(idx)}
                      </div>

                      {/* Content Details on Right */}
                      <div className="w-full md:w-[65%] p-6 md:p-8 flex flex-col justify-center text-left relative">
                        {/* Outline Index Number */}
                        <span className="absolute right-6 top-5 text-6xl md:text-7xl font-extrabold text-[#C92C15]/10 select-none pointer-events-none font-mono tracking-tighter">
                          0{idx + 1}
                        </span>

                        <div className="space-y-3">
                          <h3 className="font-bold text-xl md:text-2xl tracking-tight text-[#1B1B1B]">
                            {item.title}
                          </h3>

                          <p className="text-sm md:text-base text-[#6F6F6F] font-light leading-relaxed pr-8">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. Core Values Detail Grid */}
      <div className="py-12 md:py-32 bg-[#FAF7F5] border-t border-black/5 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(201,44,21,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 text-center relative z-10">
          <div className="max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] bg-[#C92C15]/5 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-[#1B1B1B] tracking-tight">
              Values We <span className="font-semibold text-[#C92C15]">Live By</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Award, title: 'Unwavering Trust', desc: 'Over 30 years of building relationships based on reliable execution, prompt handovers and structural safety.' },
              { icon: Eye, title: 'Absolute Transparency', desc: 'Zero hidden fees, precise billing itemizations and high integrity materials ensure you get what you contract for.' },
              { icon: Leaf, title: 'Sustainable Engineering', desc: 'Employing double glazed panel glass, local masonry stones and energy efficient designs that minimize eco footprints.' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <TiltCard
                  key={idx}
                  delay={idx * 0.1}
                  className="bg-white p-8 md:p-10 rounded-[28px] border border-black/5 shadow-sm hover:shadow-2xl hover:border-[#C92C15]/20 hover:shadow-[#C92C15]/5 transition-all duration-500 text-left min-h-[300px] flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="h-12 w-12 bg-[#C92C15]/5 border border-[#C92C15]/10 rounded-xl flex items-center justify-center text-[#C92C15] mb-6 transition-all duration-500 group-hover:bg-[#C92C15] group-hover:text-white group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B1B1B] mb-4 group-hover:text-[#C92C15] transition-colors duration-300 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Subtle bottom accent line that expands on hover */}
                  <div className="w-12 h-1 bg-black/5 group-hover:w-full group-hover:bg-[#C92C15] rounded-full transition-all duration-500 mt-8" />
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Founders Profile section */}
      <Founders />

    </div>
  );
};
export default AboutPage;
