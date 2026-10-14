import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Home, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../lib/cloudinary';

const bedroomImg = assets.generated.bedroom;
const officeImg = assets.generated.office;
const wardrobeImg = assets.generated.wardrobe;

interface ShowcaseItem {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  desc: string;
  highlights: string[];
  image: string;
  color: string;
}

const items: ShowcaseItem[] = [
  {
    number: '01',
    title: 'Residential Development',
    subtitle: 'Custom Luxury Homes & Communities',
    icon: Home,
    desc: 'We design and build custom private homes and gated neighborhoods in Rajasthan. Our focus is on spacious layouts, plenty of natural light and premium quality styling to create perfect family homes.',
    highlights: ['Vastu Compliant', 'Strong Concrete Structures', 'Energy Efficient Glass'],
    image: bedroomImg,
    color: '#C92C15'
  },
  {
    number: '02',
    title: 'Commercial Development',
    subtitle: 'Premium Offices & Retail Spaces',
    icon: Building,
    desc: "We build modern, energy efficient offices and shopping spaces. Located in Rajasthan's primary business hubs, these spaces are designed to support your business growth.",
    highlights: ['Prime Locations', 'Soundproof Windows', 'Flexible Office Layouts'],
    image: officeImg,
    color: '#1B1B1B'
  },
  {
    number: '03',
    title: 'Turnkey Construction',
    subtitle: 'Complete Construction from Start to Finish',
    icon: CheckSquare,
    desc: 'We take care of everything, from soil testing and municipal approvals to architectural design, building and final styling. You get a ready to move in building with complete structural support.',
    highlights: ['One Point of Contact', 'Clear Stage Wise Billing', 'Guaranteed Timelines'],
    image: wardrobeImg,
    color: '#C92C15'
  }
];


const ShowcaseScrollMobile = ({ items }: { items: ShowcaseItem[] }) => {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none pb-4 px-2 -mx-6 md:-mx-12 text-left">
      <div className="w-4 shrink-0" />
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="w-[280px] shrink-0 snap-center bg-white/30 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg overflow-hidden flex flex-col justify-between text-[#111111]"
          >
            {/* Image top */}
            <div className="relative w-full h-[120px] overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 bg-[#C92C15] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                {item.number}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-[#333333] font-extrabold">{item.subtitle}</span>
                  <div className="p-1 rounded-md bg-black/5 border border-black/10 text-[#C92C15]">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h3 className="text-sm font-extrabold text-[#111111]">{item.title}</h3>
                <p className="text-[11px] text-[#333333] leading-normal font-medium line-clamp-3">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.highlights.slice(0, 2).map((h: string, i: number) => (
                    <span key={i} className="bg-black/5 text-[8px] text-[#111111] px-1.5 py-0.5 rounded border border-black/10 font-bold">
                      {h}
                    </span>
                  ))}
                </div>
                <Link
                  to="/services"
                  className="h-7 w-7 rounded-full bg-black/5 border border-black/10 hover:bg-[#C92C15] hover:text-white flex items-center justify-center transition-colors text-[#111111]"
                >
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <div className="w-4 shrink-0" />
    </div>
  );
};


export const DevelopmentShowcase: React.FC = () => {

  return (
    <section
      id="developments-showcase"
      className="relative py-12 md:py-32 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Heading in Frosted Glass Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 mb-10 md:mb-20 text-left shadow-2xl">
          <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase block mb-3">
            Core Operations
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
            Our Core Building Services
          </h2>
          <p className="text-[#333333] font-medium mt-2 md:mt-4 max-w-xl text-xs md:text-sm">
            We specialize in luxury homes, commercial projects and end-to-end building services in Rajasthan.
          </p>
        </div>

        {/* DESKTOP ONLY BENTO GRID */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Card 1: Residential Development */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col md:flex-row h-full rounded-[30px] overflow-hidden bg-white/30 backdrop-blur-xl text-[#111111] border border-white/60 hover:border-[#C92C15]/60 transition-all duration-500 shadow-xl hover:shadow-2xl group relative"
          >
            {/* Content block */}
            <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-3xl md:text-4xl font-light text-[#C92C15] leading-none select-none">
                    {items[0].number}
                  </span>
                  <div className="p-3 rounded-xl bg-black/5 border border-black/10 text-[#C92C15]">
                    <Home className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#333333] font-extrabold block">
                    {items[0].subtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#111111]">
                    {items[0].title}
                  </h3>
                </div>

                <p className="text-xs md:text-sm text-[#333333] font-medium leading-relaxed">
                  {items[0].desc}
                </p>
              </div>



              <div className="space-y-3 pt-4 border-t border-black/10">
                <h4 className="text-[10px] uppercase tracking-wider text-[#C92C15] font-extrabold">Key Value Inclusions</h4>
                <div className="flex flex-wrap gap-1.5">
                  {items[0].highlights.map((h, i) => (
                    <span key={i} className="bg-black/5 border border-black/10 text-[#111111] text-[10px] px-2.5 py-1 rounded-full font-bold">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Image block */}
            <div className="relative w-full md:w-[45%] shrink-0 overflow-hidden min-h-[180px] md:min-h-full">
              <img
                src={items[0].image}
                alt={items[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 right-6 z-20">
                <Link
                  to="/services"
                  className="h-10 w-10 rounded-full bg-white/90 border border-black/10 hover:bg-[#C92C15] hover:text-white transition-all duration-300 flex items-center justify-center text-[#111111] cursor-pointer shadow-md"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Commercial Development */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-1 flex flex-col h-full rounded-[30px] overflow-hidden bg-white/30 backdrop-blur-xl text-[#111111] border border-white/60 hover:border-[#C92C15]/60 transition-all duration-500 shadow-xl hover:shadow-2xl group relative"
          >
            {/* Image block top */}
            <div className="relative w-full h-[140px] overflow-hidden shrink-0">
              <img
                src={items[1].image}
                alt={items[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content block bottom */}
            <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-3xl font-light text-[#C92C15] leading-none select-none">
                    {items[1].number}
                  </span>
                  <div className="p-3 rounded-xl bg-black/5 border border-black/10 text-[#C92C15]">
                    <Building className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#333333] font-extrabold block">
                    {items[1].subtitle}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-[#111111]">
                    {items[1].title}
                  </h3>
                </div>

                <p className="text-xs text-[#333333] font-medium leading-relaxed">
                  {items[1].desc}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/10">
                <h4 className="text-[10px] uppercase tracking-wider text-[#C92C15] font-extrabold">Key Value Inclusions</h4>
                <div className="flex flex-wrap gap-1.5">
                  {items[1].highlights.map((h, i) => (
                    <span key={i} className="bg-black/5 border border-black/10 text-[#111111] text-[10px] px-2.5 py-1 rounded-full font-bold">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  to="/services"
                  className="h-10 w-10 rounded-full bg-white/90 border border-black/10 hover:bg-[#C92C15] hover:text-white transition-all duration-300 flex items-center justify-center text-[#111111] cursor-pointer shadow-md"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Turnkey Construction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-3 flex flex-col md:flex-row h-full rounded-[30px] overflow-hidden bg-white/30 backdrop-blur-xl text-[#111111] border border-white/60 hover:border-[#C92C15]/60 transition-all duration-500 shadow-xl hover:shadow-2xl group relative"
          >
            {/* Content block */}
            <div className="p-8 md:p-10 flex flex-col justify-between flex-1 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-3xl md:text-4xl font-light text-[#C92C15] leading-none select-none">
                    {items[2].number}
                  </span>
                  <div className="p-3 rounded-xl bg-black/5 border border-black/10 text-[#C92C15]">
                    <CheckSquare className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#333333] font-extrabold block">
                    {items[2].subtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#111111]">
                    {items[2].title}
                  </h3>
                </div>

                <p className="text-xs md:text-sm text-[#333333] font-medium leading-relaxed">
                  {items[2].desc}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/10">
                <h4 className="text-[10px] uppercase tracking-wider text-[#C92C15] font-extrabold">Key Value Inclusions</h4>
                <div className="flex flex-wrap gap-1.5">
                  {items[2].highlights.map((h, i) => (
                    <span key={i} className="bg-black/5 border border-black/10 text-[#111111] text-[10px] px-2.5 py-1 rounded-full font-bold">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Image block */}
            <div className="relative w-full md:w-[40%] shrink-0 overflow-hidden min-h-[220px] md:min-h-full">
              <img
                src={items[2].image}
                alt={items[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 right-6 z-20">
                <Link
                  to="/services"
                  className="h-10 w-10 rounded-full bg-white/90 border border-black/10 hover:bg-[#C92C15] hover:text-white transition-all duration-300 flex items-center justify-center text-[#111111] cursor-pointer shadow-md"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

        {/* MOBILE ONLY LAYOUT */}
        <div className="block md:hidden">
          <ShowcaseScrollMobile items={items} />
        </div>

      </div>
    </section>
  );
};

export default DevelopmentShowcase;
