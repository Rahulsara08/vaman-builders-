import React from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from './ui/FadeUp';
import { ArrowRight, MapPin, Grid, Layers } from 'lucide-react';
import { Magnet } from './ui/Magnet';
import { assets } from '../lib/cloudinary';
const balconyImg = assets.generated.balcony;


export const LandmarkDevelopments: React.FC = () => {
  return (
    <section id="landmark-developments" className="py-24 md:py-32 bg-[#FAF7F5] relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C92C15]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 lg:items-stretch">
          
          {/* Left Side: Large Image with parallax reveal styled card (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <FadeUp delay={0.1} y={50} className="w-full">
              <Magnet className="w-full block">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/5 aspect-[4/3] w-full group bg-white flex flex-col">
                  {/* Premium image representing a luxury real estate community asset */}
                  <img 
                    src={balconyImg} 
                    alt="Landmark Development Community" 
                    className="w-full h-full object-cover transition-transform duration-700 scale-[1.16] group-hover:scale-[1.22] flex-1"
                    loading="lazy"
                  />
                  
                  {/* Location Tag */}
                  <div className="absolute top-6 left-6 bg-black/60 text-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium tracking-wide flex items-center gap-1.5 shadow-md z-10">
                    <MapPin className="h-3.5 w-3.5 text-[#C92C15]" />
                    <span>Prime Areas in Rajasthan</span>
                  </div>
                </div>
              </Magnet>
            </FadeUp>
          </div>

          {/* Right Side: Content Block (lg:col-span-6) */}
          <div className="lg:col-span-6 text-left space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <FadeUp delay={0.1} className="inline-block">
                <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase">Land Development</span>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
                  Turning Empty Land Into Beautiful Places to Live.
                </h2>
              </FadeUp>
            </div>

            <FadeUp delay={0.3}>
              <p className="text-[#6F6F6F] font-light text-lg md:text-xl leading-relaxed">
                We do more than just build single buildings. We plan entire gated communities, residential areas and commercial blocks in Rajasthan. From finding the perfect plots of land to designing safe roads, green parks and building spaces that bring neighbors together, we turn land into beautiful communities.
              </p>
            </FadeUp>

            {/* Subtle value descriptors (reinforcing developer theme) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#1B1B1B]/10">
              <FadeUp delay={0.4} className="flex gap-3 items-start">
                <div className="p-2.5 rounded-lg bg-[#C92C15]/5 text-[#C92C15] shrink-0 mt-0.5">
                  <Grid className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#1B1B1B]">Neighborhood Design</h4>
                  <p className="text-xs text-[#6F6F6F] font-light mt-1">We blend homes, shopping and green parks together.</p>
                </div>
              </FadeUp>

              <FadeUp delay={0.5} className="flex gap-3 items-start">
                <div className="p-2.5 rounded-lg bg-[#C92C15]/5 text-[#C92C15] shrink-0 mt-0.5">
                  <Layers className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#1B1B1B]">Smart Use of Land</h4>
                  <p className="text-xs text-[#6F6F6F] font-light mt-1">We plan layouts for roads, spaces and light.</p>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.6} className="pt-2">
              <Link 
                to="/projects"
                className="inline-flex items-center gap-2 bg-[#C92C15] text-white hover:bg-[#D43B13] px-8 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>See Our Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandmarkDevelopments;
