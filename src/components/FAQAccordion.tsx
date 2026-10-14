import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeUp } from './ui/FadeUp';

interface FaqItemData {
  question: string;
  answer: string;
}

const faqList: FaqItemData[] = [
  {
    question: 'How long does construction take?',
    answer: 'Standard residential construction of villas (approx. 3,000 to 5,000 sq. ft.) takes about 8 to 10 months from structural layout approval to key handover. Commercial structures or larger projects take 12 to 14 months, depending on the design complexity.',
  },
  {
    question: 'How are payments structured?',
    answer: 'Our payments are progress based and structured across 5 key construction milestones: 1) Foundation completion, 2) Column and roof slab structure frame completion, 3) Masonry brickwork completion, 4) Electrical, plumbing and wall finishes and 5) Tile laying, final painting and keys handover.',
  },
  {
    question: 'Is material included?',
    answer: 'Yes, we provide fully inclusive turnkey building services. All building materials (TMT Steel, cement, electrical wires, pipes, bathroom fittings, tiles, waterproofing compounds) are sourced and supplied directly by our corporate brand partners.',
  },
  {
    question: 'Do you provide architectural design and consultancy?',
    answer: 'Absolutely. We offer complete architectural plans, structural engineering drawings, elevation styles, 3D floor plan visualizations, municipal approval assistance and site supervision by qualified civil engineers.',
  },
  {
    question: 'Can clients track their construction progress?',
    answer: 'Yes, we provide a complete client portal tracker via the Onsite app. You get weekly material updates, daily progress log sheets, a live camera surveillance feed at your project site and a transparent expense ledger.',
  },
  {
    question: 'Do you offer building warranties?',
    answer: 'We provide a 2 year warranty post handover covering all core structural defects, wall cracks and plumbing/electrical installation leaks arising from quality defects or poor workmanship.',
  },
];

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Header Block in Frosted Glass Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 mb-12 md:mb-20 text-center shadow-2xl">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-extrabold uppercase tracking-[0.2em] block mb-3">
              FAQ
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
              Frequently Asked Questions
            </h2>
          </FadeUp>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeUp
                key={idx}
                delay={idx * 0.06}
                y={15}
                className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 text-[#111111]"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm md:text-base font-extrabold text-[#111111] hover:text-[#C92C15] transition-colors duration-200 pr-4">
                    {item.question}
                  </span>
                  <div className={`h-8 w-8 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-[#C92C15] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#C92C15] text-white border-[#C92C15]' : ''
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Animated Accordion body */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-black/10' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-5 md:px-8 md:py-6 text-xs md:text-sm text-[#333333] leading-relaxed font-medium bg-black/5">
                    {item.answer}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default FAQAccordion;
