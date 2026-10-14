import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from '../components/ui/FadeUp';
import { FadeIn } from '../components/ui/FadeIn';
import { AnimatedHeading } from '../components/ui/AnimatedHeading';
import BoomerangVideoBg from '../components/BoomerangVideoBg';
import { PointerHighlight } from '../components/ui/pointer-highlight';
import Contact from '../components/Contact';
import { MapSection } from '../components/MapSection';
import { ArrowUpRight, ChevronDown, HelpCircle, Phone, Mail, MapPin } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What areas of Rajasthan do you execute projects in?",
    answer: "We cover major zones and cities in Rajasthan, with our core footprint in Jaipur (including Johri Bazar, Raja Park, C-Scheme and other primary areas) and surrounding regions. We consult on plot dimensions, zoning codes and land checking."
  },
  {
    question: "What structural quality standards do you follow?",
    answer: "We adhere to strict national and state building codes. Our site engineers supervise all material testing (like concrete compression and steel tensile tests) to ensure structural safety and durability."
  },
  {
    question: "Do you handle municipal development authority permits?",
    answer: "Yes, our turnkey project scope covers the creation of structural blueprints, submission to local development authorities, zoning compliance, utility board approvals and final construction permits."
  },
  {
    question: "What is the typical billing and payment structure?",
    answer: "We divide billing into 5 clear progress based milestones: Foundation completion, structural frame completion, masonry completion, plaster/finishes and final keys handover. Zero hidden costs, fully documented."
  }
];

export const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const videoUrl = 'https://res.cloudinary.com/darmr4g5x/video/upload/f_auto,q_auto:best,w_1920,c_scale/v1782198259/utkarsh%20construction/hero-banner.mp4';
  const posterUrl = 'https://res.cloudinary.com/darmr4g5x/video/upload/f_auto,q_auto:best,w_1920,c_scale,so_0/v1782198259/utkarsh%20construction/hero-banner.jpg';

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24">

      {/* 1. Premium Hero Video Banner (Copied from Home Banner) */}
      <section className="hero bg-[#FAF7F5] relative h-screen w-full overflow-hidden">
        {/* Seamless Boomerang Video Background */}
        <BoomerangVideoBg src={videoUrl} poster={posterUrl} className="hero-bg" />

        {/* Dark tint overlay over the video on mobile only */}
        <div className="absolute inset-0 bg-black/40 md:bg-transparent z-10 pointer-events-none" />

        {/* Top Blur Overlay */}
        <div className="blur-overlay blur-overlay-top" />

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
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-r-[32px] shadow-2xl contact-overlay-mask pointer-events-none z-0" />

            <div className="relative z-10 w-full flex flex-col justify-center">
              <FadeIn delay={100} duration={800}>
                <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] block mb-4">
                  Get In Touch
                </span>
              </FadeIn>

              <AnimatedHeading
                text={"Let's Build\nTogether."}
                className="text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-[#1B1B1B] mb-4 leading-[1.1]"
                initialDelay={200}
                charDelay={30}
                charDuration={500}
                highlightText="Together."
                highlightClassName="text-[#C92C15]"
              />

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-800 mb-6 max-w-2xl font-semibold leading-relaxed">
                Ready to start your next building <PointerHighlight delay={1.2} containerClassName="text-[#C92C15] font-semibold">project</PointerHighlight>? Send us a message and we will get back to you shortly.
              </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all px-8 py-3.5 rounded-lg font-medium cursor-pointer shadow-lg hover:scale-105 active:scale-95 inline-block text-center"
                  >
                    Send a Message
                  </button>
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
            <FadeIn delay={100} duration={800}>
              <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] block mb-4">
                Get In Touch
              </span>
            </FadeIn>

            <AnimatedHeading
              text={"Let's Build\nTogether."}
              className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6 leading-[1.15]"
              initialDelay={200}
              charDelay={30}
              charDuration={500}
              highlightText="Together."
              highlightClassName="text-[#C92C15]"
            />

            <FadeIn delay={800} duration={1000}>
              <p className="text-base sm:text-lg text-white/95 mb-8 max-w-2xl font-light leading-relaxed">
              Ready to start your next building <PointerHighlight delay={1.2} containerClassName="text-[#C92C15] font-semibold">project</PointerHighlight>? Send us a message and we will get back to you shortly.
            </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all px-8 py-4 rounded-xl font-semibold cursor-pointer shadow-lg hover:scale-105 active:scale-95 text-center text-sm uppercase tracking-wider"
                >
                  Send a Message
                </button>
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
      </section>

      {/* 2. Content Layout: Contact form + Max Reed styled Reach Me card */}
      <div id="contact-section" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 -mt-10 rounded-[24px] md:rounded-[60px] bg-white pt-10 pb-10 md:pb-24 border border-black/5 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* Left Column: Reach Me Widget (Max Reed Style) - 4 spans */}
          <div className="lg:col-span-4 text-left space-y-6">

            {/* Direct Contact Card */}
            <FadeUp delay={0.1} y={30} className="bg-white text-[#1B1B1B] p-5 md:p-8 rounded-2xl md:rounded-3xl border border-black/5 shadow-xl relative overflow-hidden group">
              {/* Corner action button */}
              <div className="absolute top-6 right-6">
                <a
                  href="https://www.google.com/maps/dir//Utkarsh+Builder,+2137,+Nowal+Bhavan,+Dara+Market,+Haldion+Ka+Rasta,+Johri+Bazar,+Jaipur,+Rajasthan+302003/@26.9048432,75.7720324,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x396db7f1e9799d71:0x53ed154c97761b62!2m2!1d75.8275485!2d26.9207124?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-black/5 hover:bg-[#C92C15] hover:text-white transition-all duration-300 flex items-center justify-center text-[#1B1B1B] cursor-pointer shadow-md"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>

              <div className="space-y-8">
                <span className="text-xs uppercase tracking-[0.22em] text-[#C92C15] font-bold block">
                  Reach Us
                </span>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#6F6F6F] shrink-0" />
                    <a href="mailto:nowalutkarsh@gmail.com" className="text-sm md:text-base font-light text-[#1B1B1B] hover:text-[#C92C15] transition-colors">
                      nowalutkarsh@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#6F6F6F] shrink-0" />
                    <a href="tel:+918562034491" className="text-sm md:text-base font-light text-[#1B1B1B] hover:text-[#C92C15] transition-colors">
                      +91 8562034491
                    </a>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <MapPin className="h-4 w-4 text-[#6F6F6F] shrink-0 mt-1" />
                    <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
                      Johri Bazar,<br />Jaipur, Rajasthan
                    </p>
                  </div>
                </div>

              </div>
            </FadeUp>

            {/* Response Time Card */}
            <FadeUp delay={0.2} y={30} className="bg-[#FAF7F5] border border-black/5 p-5 md:p-8 rounded-2xl md:rounded-3xl text-left">
              <h4 className="text-xs uppercase tracking-widest text-[#C92C15] font-semibold mb-3">Response Time</h4>
              <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                We review all proposals and project details and schedule feasibility calls within 24 hours.
              </p>
            </FadeUp>

          </div>

          {/* Right Column: Form Component - 8 spans */}
          <div className="lg:col-span-8">
            <Contact isEmbedded={true} />
          </div>

        </div>
      </div>

      {/* Map Location Section */}
      <MapSection />

      {/* 3. FAQ Section Accordion Grid */}
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
          {faqs.map((faq, idx) => (
            <FadeUp
              key={idx}
              delay={idx * 0.08}
              y={20}
              className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden"
              once={true}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-4 py-4 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-[#FAF7F5]/50"
              >
                <div className="flex items-center gap-3 pr-4">
                  <HelpCircle className="h-4 w-4 text-[#C92C15] shrink-0" />
                  <span className="font-semibold text-xs md:text-base text-[#1B1B1B]">{faq.question}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'transform rotate-180 text-[#C92C15]' : ''
                  }`} />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === idx ? 'max-h-[220px] border-t border-gray-100' : 'max-h-0'
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
export default ContactPage;
