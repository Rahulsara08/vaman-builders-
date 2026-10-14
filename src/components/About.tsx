import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Magnet } from './ui/Magnet';
import { FadeUp } from './ui/FadeUp';
import { Eye, Target, Award } from 'lucide-react';
import { PointerHighlight } from './ui/pointer-highlight';

import { assets } from '../lib/cloudinary';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'vision' | 'mission'>('story');

  const imageUrl = assets.aboutBuilding;

  return (
    <section id="about" className="py-12 md:py-32 relative overflow-hidden">
      {/* Decorative terracotta background blob */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C92C15]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C92C15]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Ultra-Refined Liquid Glass Container Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Side: Image display (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeUp delay={0.1} y={40} className="w-full flex justify-center">
                <Magnet strength={15} padding={120} className="w-full max-w-[450px]">
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-gray-100 aspect-[4/3] md:aspect-[1/1] w-full">
                    <img
                      src={imageUrl}
                      alt="Luxury modern architecture by Utkarsh Builder"
                      className="w-full h-full object-cover object-[55%_center] transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Absolute subtle outline overlay */}
                    <div className="absolute inset-4 border border-white/40 pointer-events-none rounded-xl" />

                    {/* Floating brand badge */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white/60 backdrop-blur-md px-6 py-4 rounded-xl border border-white/80 flex items-center gap-3 shadow-lg">
                      <Award className="h-8 w-8 text-[#C92C15] shrink-0" />
                      <div>
                        <h4 className="text-[#111111] text-xs font-extrabold uppercase tracking-wider">Legacy of Trust</h4>
                        <p className="text-[#333333] text-xxs font-bold">30+ Years Construction Legacy</p>
                      </div>
                    </div>
                  </div>
                </Magnet>
              </FadeUp>
            </div>

            {/* Right Side: Narrative (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <FadeUp delay={0.2} className="mb-4">
                <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase">Who We Are</span>
              </FadeUp>

              <FadeUp delay={0.3} className="mb-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                  Building Your Dream Space
                </h2>
              </FadeUp>

              <FadeUp delay={0.4} className="mb-8">
                <p className="text-lg md:text-xl text-[#333333] leading-relaxed font-medium">
                  Welcome to Utkarsh Builder, where we turn your dream spaces into reality. With over 30 years of experience and more than 100 completed projects in Rajasthan, we build premium homes and commercial buildings with outstanding quality, honest pricing and on time completion.
                </p>
              </FadeUp>

              {/* Premium Tab Buttons */}
              <FadeUp delay={0.5} className="flex flex-wrap gap-1.5 md:gap-2 border-b border-black/10 pb-2 mb-6">
                {[
                  { id: 'story', label: 'Our Story', icon: Award },
                  { id: 'vision', label: 'Our Vision', icon: Eye },
                  { id: 'mission', label: 'Our Mission', icon: Target },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'story' | 'vision' | 'mission')}
                      className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm transition-all duration-300 cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-[#C92C15] text-white shadow-md font-bold'
                          : 'text-[#333333] hover:text-[#111111] hover:bg-black/5 font-bold'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </FadeUp>

              {/* Tab Contents */}
              <FadeUp delay={0.6} className="min-h-[100px]">
                {activeTab === 'story' && (
                  <div className="text-[#333333] space-y-3 font-medium">
                    <p>
                      We started with a simple promise: to build strong, beautiful and lasting structures. We guide you every step of the way, from the first sketch to the day you move in.
                    </p>
                    <p className="text-sm border-l-2 border-[#C92C15] pl-4 italic text-[#111111] font-bold">
                      "Every space we design is built to stand as a <PointerHighlight delay={1.2}>legacy</PointerHighlight> for the next generation."
                    </p>
                  </div>
                )}
                {activeTab === 'vision' && (
                  <div className="text-[#333333] space-y-2 font-medium">
                    <p className="text-base font-extrabold text-[#111111]">To Redefine Construction Quality</p>
                    <p>
                      Our vision is to become the most trusted construction partner in Rajasthan, known for outstanding quality and making your dream spaces a reality.
                    </p>
                  </div>
                )}
                {activeTab === 'mission' && (
                  <div className="text-[#333333] space-y-2 font-medium">
                    <p className="text-base font-extrabold text-[#111111]">Honest Pricing and Timely Delivery</p>
                    <p>
                      Our mission is to make construction stress-free for our clients. We do this by delivering high quality projects, transparent pricing and completing projects on schedule.
                    </p>
                  </div>
                )}
              </FadeUp>

              {/* Discover Legacy Link */}
              <FadeUp delay={0.7} className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[#C92C15] hover:text-[#D43B13] font-extrabold text-sm transition-all group cursor-pointer"
                >
                  <span>Discover Our Legacy</span>
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </FadeUp>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
