import React from 'react';
import { FadeUp } from './ui/FadeUp';
import { StaggerContainer } from './ui/StaggerContainer';
import { Award, Briefcase, Calendar, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

interface ReasonItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const reasonsList: ReasonItem[] = [
  {
    title: '30+ Years Experience',
    description: 'Over 30 years of building safe, reliable and premium properties across Rajasthan.',
    icon: Award,
  },
  {
    title: '100+ Projects Completed',
    description: 'We have successfully built everything from luxury villas to large commercial complexes.',
    icon: ShieldCheck,
  },
  {
    title: 'Dedicated Site Engineer',
    description: 'You work with a qualified site engineer who oversees daily operations, materials and strict safety guidelines for you.',
    icon: Briefcase,
  },
  {
    title: 'Transparent Communication',
    description: 'We offer clear cost estimates, honest contracts and absolutely no hidden fees.',
    icon: MessageSquare,
  },
  {
    title: 'Quality Construction',
    description: 'We use top grade cement and steel and run regular quality checks at every step.',
    icon: CheckCircle2,
  },
  {
    title: 'On Time Delivery',
    description: 'We follow a strict schedule so we can hand over your keys on the exact day promised.',
    icon: Calendar,
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-12 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Title details inside Frosted Glass Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 mb-10 md:mb-16 max-w-3xl mx-auto text-center shadow-2xl">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase">Why Choose Us</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
              Why People Trust Us to Build
            </h2>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-4">
            <p className="text-lg md:text-xl text-[#333333] font-medium max-w-xl mx-auto">
              Our work is based on trust, high quality building and meeting our promises. Here is why clients choose us.
            </p>
          </FadeUp>
        </div>

        {/* Grid elements */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {reasonsList.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <FadeUp
                key={index}
                delay={index * 0.1}
                y={30}
                className="group p-4 md:p-8 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/60 hover:border-[#C92C15]/60 transition-all duration-300 flex flex-col items-start text-left shadow-xl hover:shadow-2xl"
              >
                {/* Icon Circle */}
                <div className="p-2 md:p-3 rounded-xl bg-[#C92C15]/10 text-[#C92C15] border border-[#C92C15]/20 mb-3 md:mb-6 transition-all duration-300 group-hover:bg-[#C92C15] group-hover:text-white group-hover:scale-110">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-lg font-extrabold text-[#111111] mb-1.5 md:mb-3 group-hover:text-[#C92C15] transition-colors duration-300 leading-tight">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-[#333333] font-medium leading-relaxed hidden md:block">
                  {reason.description}
                </p>
              </FadeUp>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
export default WhyChooseUs;
export const WhyChooseUsSection = WhyChooseUs;
