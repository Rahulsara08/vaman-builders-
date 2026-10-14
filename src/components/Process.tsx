import React from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from './ui/FadeUp';
import { StaggerContainer } from './ui/StaggerContainer';
import { Users, FileText, Activity, ShieldAlert, Key } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation',
    description: 'Deep dive into your requirements, location analysis and budget planning.',
    icon: Users,
  },
  {
    number: '02',
    title: 'Planning & Design',
    description: 'Symmetry drawing, engineering calculations and municipal approvals management.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Disciplined site construction, cement mixing, concrete laying and structural framing.',
    icon: Activity,
  },
  {
    number: '04',
    title: 'Quality Inspection',
    description: 'Multi stage quality checks verifying plumbing, electrical and concrete strength.',
    icon: ShieldAlert,
  },
  {
    number: '05',
    title: 'Handover',
    description: 'Finishing touches, cleanups and delivering key lock sets to your ready to move space.',
    icon: Key,
  },
];


const ProcessSwipeMobile = ({ steps }: { steps: ProcessStep[] }) => {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none pb-4 px-2 -mx-6 md:-mx-12 text-left">
      {/* Spacer for padding */}
      <div className="w-4 shrink-0" />
      {steps.map((step, idx) => {
        const Icon = step.icon;
        return (
          <div
            key={idx}
            className="w-[260px] shrink-0 snap-center bg-white/30 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-lg flex flex-col justify-between text-[#111111]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-black/5 text-[#C92C15] flex items-center justify-center border border-black/10">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-[#333333] font-mono">
                  Step {step.number}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-[#111111] mb-2">{step.title}</h3>
              <p className="text-xs text-[#333333] font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
            
            {/* Custom bottom line indicator */}
            <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden mt-4">
              <div 
                className="h-full bg-[#C92C15]" 
                style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
      {/* Spacer for padding */}
      <div className="w-4 shrink-0" />
    </div>
  );
};

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<number | null>(null);

  return (
    <section className="py-12 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Title inside Frosted Glass Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 mb-10 md:mb-20 max-w-2xl mx-auto text-center shadow-2xl">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase">How We Build</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
              Our Construction Journey
            </h2>
          </FadeUp>
        </div>

        {/* DESKTOP ONLY TIMELINE */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-black/10 z-0">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full bg-[#C92C15] origin-left"
              />
            </div>

            {/* Steps */}
            <StaggerContainer staggerChildren={0.2} className="grid grid-cols-5 gap-6 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={idx} 
                    onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                    className="flex flex-col items-start text-left group cursor-pointer"
                  >
                    {/* Icon Circle */}
                    <motion.div 
                      variants={{
                        hidden: { scale: 0.8, opacity: 0 },
                        show: { scale: 1, opacity: 1 }
                      }}
                      transition={{ type: 'spring', stiffness: 100 }}
                      className={`h-20 w-20 rounded-full border flex items-center justify-center mb-6 shadow-md transition-all duration-300 relative z-10 ${
                        activeStep === idx 
                          ? 'bg-[#C92C15] text-white border-[#C92C15]' 
                          : 'bg-white/50 backdrop-blur-md border-white/80 text-[#C92C15] group-hover:bg-[#C92C15] group-hover:text-white group-hover:border-[#C92C15]'
                      }`}
                    >
                      <Icon className="h-7 w-7" />
                      
                      {/* Index Badge */}
                      <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-[#C92C15] text-white text-xs font-bold flex items-center justify-center border-2 border-white select-none">
                        {step.number}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg font-extrabold text-[#111111] mb-3 group-hover:text-[#C92C15] transition-colors duration-300 min-h-[56px] flex items-start justify-start">
                      {step.title}
                    </h3>
                  </div>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Dynamic Detail Card */}
          {activeStep !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl max-w-2xl mx-auto shadow-2xl text-center text-[#111111]"
            >
              <span className="text-[#C92C15] text-xs font-extrabold uppercase tracking-widest block mb-2">
                Step {steps[activeStep].number}: {steps[activeStep].title}
              </span>
              <p className="text-sm text-[#333333] font-medium leading-relaxed">
                {steps[activeStep].description}
              </p>
            </motion.div>
          )}
        </div>

        {/* MOBILE ONLY TIMELINE */}
        <div className="block md:hidden">
          <ProcessSwipeMobile steps={steps} />
        </div>

      </div>
    </section>
  );
};
export default Process;
