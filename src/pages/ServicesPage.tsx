import { useState, useEffect, useRef } from 'react';
import { FadeUp } from '../components/ui/FadeUp';
import { StaggerContainer } from '../components/ui/StaggerContainer';
import { HeroSection } from '../components/ui/hero-section-2';
import { PointerHighlight } from '../components/ui/pointer-highlight';
import { assets } from '../lib/cloudinary';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { EdgeBlur } from '../components/ui/edge-blur';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


interface ServiceItem {
  number: string;
  title: string;
  description: string;
  extendedDetails: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'Residential and Commercial Construction',
    description: 'We design and build strong, beautiful houses and commercial offices tailored to exactly what you need.',
    extendedDetails: 'We use high quality steel and strong concrete mixes to make sure every building is completely safe, durable and built to the highest local safety standards.'
  },
  {
    number: '02',
    title: 'Complete Start to Finish Construction',
    description: 'We take care of the entire project from start to finish, managing all approvals, designs and building work.',
    extendedDetails: 'This service covers everything: testing the soil, creating architectural blueprints, handling structural engineering, buying materials and handing over the keys.'
  },
  {
    number: '03',
    title: 'Project Management Consultancy (PMC)',
    description: 'We supervise daily construction, check material quality and handle schedules to keep your project on time and within budget.',
    extendedDetails: 'We oversee daily labor, check the quality of materials delivered to the site, coordinate all builders, handle city inspections and send you weekly progress updates with photos.'
  },
  {
    number: '04',
    title: 'Renovation and Remodeling',
    description: 'We transform old buildings into modern, functional spaces by updating layouts, reinforcing structures and refreshing styling.',
    extendedDetails: 'We restore older structures, add new rooms, strengthen supporting columns and completely redesign the interior and exterior to make it feel brand new.'
  },
  {
    number: '05',
    title: 'Land Selection and Sourcing',
    description: 'We help you find and choose the best locations and plots in Rajasthan that will grow in value over time.',
    extendedDetails: 'With over 30 years of local land and construction experience, we guide you through market trends, municipal plans and pricing to help you make the best decision for your plot.'
  },
  {
    number: '06',
    title: 'Land and Plot Site Testing',
    description: 'We check the soil, sunlight direction, utilities and layout options before starting construction.',
    extendedDetails: 'Before we lay a single brick, we carefully check the ground, plan for natural light and make sure everything perfectly follows all municipal development authority regulations.'
  },
  {
    number: '07',
    title: 'Plot Development Support',
    description: 'We handle the entire journey for you, coordinating building approvals, blueprints, structural building and checking in on your building even after move-in.',
    extendedDetails: 'We act as your reliable development partner, managing blueprints, municipal permits, structural building and post-delivery checkups.'
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What types of construction services do you offer?",
    answer: "We provide a wide range of construction and development services, including residential building, commercial offices, complete turnkey project management, site supervision, renovations and site analysis support."
  },
  {
    question: "Do you manage projects from planning through completion?",
    answer: "Yes, our turnkey services cover all aspects of the construction journey, including site evaluation, architectural and structural coordination, material procurement, on-site supervision and final project handover."
  },
  {
    question: "How is structural quality and safety maintained?",
    answer: "We adhere strictly to local building standards and engineering guidelines. By using certified, high-strength materials and performing regular on-site quality checks, we ensure that every structure is durable, safe and built to last."
  },
  {
    question: "Which areas or regions do you operate in?",
    answer: "We primarily execute residential and commercial projects across various locations in Rajasthan, adapting our building methods to suit local climate conditions and regional authority guidelines."
  },
  {
    question: "How can I schedule a consultation or get a project estimate?",
    answer: "You can book a consultation with our engineering team by visiting our Contact page and completing the enquiry form. We will review your requirements and get in touch to discuss details."
  }
];



const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export const ServicesPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollWindowRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !scrollWindowRef.current || !listWrapperRef.current || !pinnedContentRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate scroll distance
      const calculateScroll = () => {
        const windowHeight = scrollWindowRef.current!.clientHeight;
        const listHeight = listWrapperRef.current!.scrollHeight;
        return Math.max(0, listHeight - windowHeight);
      };

      let scrollDistance = calculateScroll();

      const update3DEffects = () => {
        if (!scrollWindowRef.current || !listWrapperRef.current) return;
        const containerRect = scrollWindowRef.current.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;
        const containerHeight = containerRect.height;
        const items = listWrapperRef.current.querySelectorAll('.service-item-card');
        
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          
          // distance from center relative to half of container height
          const dist = (itemCenter - containerCenter) / (containerHeight / 2);
          const clampedDist = Math.min(1.2, Math.max(-1.2, dist));
          const absDist = Math.abs(clampedDist);
          
          const scale = 1 - absDist * 0.08;
          const rotateX = -clampedDist * 12;
          const opacity = 1 - absDist * 0.55;
          
          const htmlItem = item as HTMLElement;
          htmlItem.style.transform = `perspective(1200px) rotateX(${rotateX}deg) scale(${scale})`;
          htmlItem.style.transformStyle = 'preserve-3d';
          htmlItem.style.opacity = `${Math.max(0.2, opacity)}`;
        });
      };

      // Create scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: pinnedContentRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: update3DEffects,
          onRefresh: update3DEffects,
        }
      });

      if (scrollDistance > 0) {
        tl.to(listWrapperRef.current, {
          y: -scrollDistance,
          ease: 'none',
          onUpdate: update3DEffects
        });
      }

      // Initial execution
      setTimeout(update3DEffects, 100);

      const handleResize = () => {
        scrollDistance = calculateScroll();
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24">

      {/* 1. Premium Header Banner */}
      <div className="w-full pt-20">
        <HeroSection
          className="rounded-none border-none shadow-none w-full min-h-[500px] md:min-h-[600px]"
          title={
            <>
              Quality Construction <br />
              <span className="text-[#C92C15]">Built for Generations</span>
            </>
          }
          subtitle={
            <>
              From premium custom residential villas to commercial corporate spaces and complete turnkey solutions, we bring structural integrity and <PointerHighlight delay={0.5} containerClassName="text-[#C92C15] font-semibold">excellence</PointerHighlight> to life in Rajasthan.
            </>
          }
          callToAction={{
            text: "Book A Consultation",
            href: "/contact#contact-section"
          }}
          backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        />
      </div>

      {/* 2. Jack-Style Services Section (Vertical list, white bg) */}
      <div 
        ref={triggerRef} 
        style={{ height: '240vh' }}
        className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] relative z-10 -mt-10"
      >
        {/* Pinned container which captures full screen height */}
        <div 
          ref={pinnedContentRef} 
          className="h-screen w-full overflow-hidden bg-white flex flex-col justify-start py-8 md:py-16 relative"
        >
          {/* Header container */}
          <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 w-full shrink-0">
            <div className="text-center mb-6 md:mb-12">
              <FadeUp delay={0.1} className="mb-2">
                <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">The Services</span>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B]">
                  Core Competencies
                </h2>
              </FadeUp>
            </div>
          </div>

          {/* Scroll Window (Full Screen Width) */}
          <div ref={scrollWindowRef} className="relative overflow-hidden w-full flex-1 bg-[#FAF7F5]/30 border-t border-b border-black/5 shadow-inner">
            
            {/* Translated Wrapper */}
            <div ref={listWrapperRef} className="relative z-0 max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-6 pb-20 pt-8">
              <StaggerContainer staggerChildren={0.15} className="flex flex-col border-t border-[#1B1B1B]/15">
                {servicesData.map((service) => (
                  <motion.div
                    key={service.number}
                    variants={itemVariants}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="service-item-card py-6 md:py-12 border-b border-[#1B1B1B]/15 flex flex-col md:flex-row items-start gap-4 md:gap-12 group hover:bg-[#FAF7F5]/40 transition-all duration-300 px-3 md:px-4 rounded-xl text-left"
                  >
                    {/* Left side: Huge Index Number */}
                    <div className="w-16 md:w-32 shrink-0">
                      <span className="text-3xl md:text-6xl lg:text-7xl font-light text-[#C92C15]/35 group-hover:text-[#C92C15] transition-colors duration-300 select-none">
                        {service.number}
                      </span>
                    </div>

                    {/* Right side: Name & Detail stacked */}
                    <div className="flex-1 text-left space-y-2 md:space-y-4">
                      <h3 className="text-lg md:text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-sm md:text-base text-[#6F6F6F] font-light leading-relaxed">
                        {service.description}
                      </p>

                      <p className="text-xs md:text-sm text-[#6F6F6F]/80 font-light leading-relaxed border-l-2 border-[#C92C15]/30 pl-4 group-hover:border-[#C92C15] transition-all">
                        {service.extendedDetails}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </div>
          <EdgeBlur position="top" height={60} />
          <EdgeBlur position="bottom" height={80} />
        </div>

      </div>

      {/* 3. Asme-Style Video Bento Grid */}
      <div className="py-12 md:py-24 bg-[#FAF7F5] text-[#1B1B1B] border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">

          <div className="text-left max-w-3xl mb-10 md:mb-16 space-y-3">
            <div>
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-3">Our Standards</span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1B1B1B]">
                Execution Divisions
              </h2>
            </div>
            <p className="text-[#6F6F6F] font-light text-sm md:text-base leading-relaxed">
              How we divide our engineering teams to deliver focused, high-quality attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* Card 1: Residential */}
            <FadeUp delay={0.1} y={40} className="bg-white rounded-3xl overflow-hidden group border border-black/5 shadow-xl flex flex-col justify-between min-h-[340px] md:min-h-[420px] hover:shadow-2xl transition-all duration-300">
              <div className="relative h-40 md:h-60 w-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={assets.videos.servicesResidential}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/5 to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 bg-[#C92C15] border border-[#C92C15]/40 px-3.5 py-1.5 rounded-full text-xxs uppercase tracking-wider font-bold text-white shadow-md">
                  Residential Division
                </span>
              </div>
              <div className="p-5 md:p-8 text-left space-y-2 md:space-y-3">
                <h3 className="text-lg md:text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors">
                  Bespoke Villas &amp; Homes
                </h3>
                <p className="text-xs md:text-sm text-[#6F6F6F] font-light leading-relaxed">
                  We combine Rajasthan's rich architectural traditions with modern sustainable building practices to deliver extraordinary residential estates featuring flawless symmetry and structural longevity.
                </p>
              </div>
            </FadeUp>

            {/* Card 2: Commercial */}
            <FadeUp delay={0.2} y={40} className="bg-white rounded-3xl overflow-hidden group border border-black/5 shadow-xl flex flex-col justify-between min-h-[340px] md:min-h-[420px] hover:shadow-2xl transition-all duration-300">
              <div className="relative h-40 md:h-60 w-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={assets.videos.servicesCommercial}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/5 to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 bg-[#1B1B1B] border border-black/40 px-3.5 py-1.5 rounded-full text-xxs uppercase tracking-wider font-bold text-white shadow-md">
                  Commercial Division
                </span>
              </div>
              <div className="p-5 md:p-8 text-left space-y-2 md:space-y-3">
                <h3 className="text-lg md:text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors">
                  Retail &amp; Corporate Spaces
                </h3>
                <p className="text-xs md:text-sm text-[#6F6F6F] font-light leading-relaxed">
                  Expert execution of mixed use hubs, high symmetry jewelry showrooms and office complexes engineered for workflow efficiency, energy savings and structural integrity.
                </p>
              </div>
            </FadeUp>

          </div>

        </div>
      </div>

      {/* 4. FAQ Section Accordion Grid (Stolen from Contact Us page) */}
      <div className="py-12 md:py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Faqs</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-2xl md:text-4xl font-semibold text-[#1B1B1B] tracking-tight">
              Frequently Asked Questions
            </h2>
          </FadeUp>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <FadeUp
              key={idx}
              delay={idx * 0.08}
              y={20}
              className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden"
              once={true}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-4 py-4 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-[#FAF7F5]/50"
              >
                <div className="flex items-center gap-3 pr-4">
                  <HelpCircle className="h-4 w-4 text-[#C92C15] shrink-0" />
                  <span className="font-semibold text-xs md:text-base text-[#1B1B1B]">{faq.question}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${openIndex === idx ? 'transform rotate-180 text-[#C92C15]' : ''
                  }`} />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-[220px] border-t border-gray-100' : 'max-h-0'
                  }`}
              >
                <p className="p-4 md:p-6 text-xs md:text-sm text-[#6F6F6F] font-light leading-relaxed text-left bg-gray-50/50">
                  {faq.answer}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ServicesPage;
