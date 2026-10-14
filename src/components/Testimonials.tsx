import { useEffect, useState, useRef, useCallback } from 'react';

import { FadeUp } from './ui/FadeUp';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const testimonials: TestimonialItem[] = [
  {
    quote: "We are delighted to choose Utkarsh Builders for our 25,000 sq. ft. project. From demolition to completion, they managed every aspect of the building with professionalism and expertise. Their commitment to finishing the project within the agreed timeline was impressive and we are extremely satisfied with the results.",
    name: "Karamchand Vadhrani",
    role: "Founder",
    company: "Ametina Enterprises"
  },
  {
    quote: "Huge thanks to Utkarsh Builders for transforming our old space into something truly special! They delivered on time, stayed true to our vision and beautifully blended a modern office look with Rajasthan’s traditional architecture. We are extremely pleased with the final result.",
    name: "Manoj Sogani",
    role: "Owner",
    company: "MS Jewellers"
  },
  {
    quote: "We're super impressed with the work Utkarsh Builders did! They nailed the symmetry and managed to keep the old design on the top floors looking great. The way they matched the interiors and exteriors gave the place the perfect mix of vintage and modern vibes.",
    name: "Mahaveer Kumar Bhangadiya",
    role: "Founder",
    company: "Bhangadiya Wealth"
  }
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
  }, [stopTimer]);

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isPaused, startTimer, stopTimer]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-12 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header Block in Frosted Glass Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 mb-10 md:mb-16 max-w-2xl mx-auto text-center shadow-2xl">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase">Testimonials</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
              Trusted By Business Leaders
            </h2>
          </FadeUp>
        </div>

        {/* Carousel Card Wrapper */}
        <div className="max-w-4xl mx-auto relative">
          <FadeUp 
            delay={0.3}
            y={40}
            className="w-full"
            once={false}
          >
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="bg-white/30 backdrop-blur-xl rounded-3xl p-5 md:p-12 lg:p-16 border border-white/60 shadow-2xl relative transition-all duration-500 text-[#111111]"
            >
              {/* Quote Mark Icon */}
              <div className="absolute top-6 right-8 text-black/10 select-none pointer-events-none">
                <Quote className="h-24 w-24 transform rotate-180" />
              </div>

              {/* Quote Content */}
              <div className="relative z-10 min-h-[160px] flex flex-col justify-center text-left">
                <p className="text-base md:text-xl lg:text-2xl text-[#111111] font-medium leading-relaxed mb-6 md:mb-8 italic">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                {/* Client Profile */}
                <div className="flex items-center gap-4 border-t border-black/10 pt-6">
                  <div className="h-12 w-12 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-[#C92C15]">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#111111] text-base leading-tight">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-xs text-[#333333] mt-1 font-bold uppercase tracking-wider">
                      {testimonials[activeIndex].role}, <span className="text-[#C92C15] font-extrabold">{testimonials[activeIndex].company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 px-4">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? 'w-8 bg-[#C92C15]' : 'w-2 bg-black/30'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="h-10 w-10 rounded-full bg-white/70 backdrop-blur-md hover:bg-[#C92C15] hover:text-white transition-all duration-300 flex items-center justify-center border border-white/80 text-[#111111] cursor-pointer shadow-md active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full bg-white/70 backdrop-blur-md hover:bg-[#C92C15] hover:text-white transition-all duration-300 flex items-center justify-center border border-white/80 text-[#111111] cursor-pointer shadow-md active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
export default Testimonials;
