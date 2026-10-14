import React from 'react';
import { ShieldAlert, Clock, Phone, Mail, Wrench, Scale, Landmark, ShieldCheck } from 'lucide-react';
import { FadeUp } from '../components/ui/FadeUp';
import { PointerHighlight } from '../components/ui/pointer-highlight';

const keyTerms = [
  {
    icon: <Landmark className="h-5 w-5" />,
    title: "Scope of Work",
    desc: "Construction follows agreed blueprints, drawings, layouts and high quality specifications.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Payment Terms",
    desc: "Progressive payments via the Onsite app. Minimum balance of ₹2,00,000/- must be maintained.",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Defects Liability",
    desc: "The Builder is liable to repair any structural defects, leakages, or cracks due to workmanship.",
  },
  {
    icon: <Scale className="h-5 w-5" />,
    title: "Dispute Resolution",
    desc: "Governed by Indian law. Arbitration and legal disputes under Jaipur, Rajasthan jurisdiction.",
  },
];

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pt-28 md:pt-32 pb-20 md:pb-28">

      {/* ── Header Banner ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mb-14 md:mb-20 text-left">
        <FadeUp delay={0.05}>
          <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] block mb-4">
            Legal Agreement
          </span>
        </FadeUp>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#1B1B1B] tracking-tight leading-tight mb-4 flex items-center gap-x-2">
            <PointerHighlight delay={0.3} containerClassName="text-[#1B1B1B]">Terms</PointerHighlight> &amp; Conditions
          </h1>
        <FadeUp delay={0.25}>
          <p className="text-xs md:text-sm text-[#6F6F6F] font-light">
            Last Updated: June 2026
          </p>
        </FadeUp>
      </section>

      {/* ── Key Terms Grid ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mb-14 md:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {keyTerms.map((item, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.08} y={20}>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-black/[0.04] flex gap-5 items-start text-left group hover:border-[#C92C15]/15 hover:shadow-lg transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-[#C92C15]/[0.06] border border-[#C92C15]/10 flex items-center justify-center text-[#C92C15] shrink-0 group-hover:bg-[#C92C15] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B1B1B] mb-1.5">{item.title}</h4>
                  <p className="text-xs text-[#6F6F6F] font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Full-Width Terms Content Card ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <FadeUp delay={0.1} y={20}>
          <div className="bg-white p-8 md:p-14 rounded-[28px] md:rounded-[40px] border border-black/[0.04] shadow-sm space-y-10 text-left">

            {/* Disclaimer */}
            <div className="bg-amber-50/60 border border-amber-200/40 rounded-2xl p-5 md:p-6 text-amber-800 text-xs md:text-sm flex gap-3.5 items-start leading-relaxed">
              <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Disclaimer:</strong> This is a simplified version of our Terms and Conditions. A detailed legal document is available upon request through our communication channels.
              </div>
            </div>

            {/* Intro */}
            <p className="text-sm md:text-base text-[#6F6F6F] leading-[1.85] font-light">
              Welcome to Utkarsh Builder. Please read these Terms and Conditions carefully before requesting our services. By using our services, you agree to be bound by the following Terms and Conditions.
            </p>

            <hr className="border-black/[0.04]" />

            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">1. Scope of Work</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                We, the Builders, commit to constructing the building on the specified plot of land as per the agreed plans, drawings, layouts and specifications. The construction will be done using high quality materials and in a professional manner.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">2. Payment Terms</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Owner agrees to pay for the construction services as per the terms outlined in the Onsite app. A minimum balance of ₹2,00,000/- must be maintained. The Builder will commence construction within 15 days of receiving the first instalment and will complete the project within ten months from that date.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">3. Access to the Site</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Owner will provide the Builder and their personnel, including subcontractors and employees, unrestricted access to the construction site to perform their duties efficiently.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">4. Services Provided</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                We offer comprehensive services including:
              </p>
              <ul className="list-disc pl-5 text-sm text-[#6F6F6F] space-y-2 font-light leading-relaxed">
                <li>Architectural consultancy and project planning.</li>
                <li>Design and development of structural drawings and floor plans.</li>
                <li>Schematic development for water, drainage, electrical and AC systems.</li>
                <li>Elevation design and 3D visualisation.</li>
                <li>Project budgeting and BOQ development.</li>
                <li>Site management, including inventory and material procurement.</li>
                <li>Site supervision and regular audits by engineers.</li>
                <li>Daily progress reports, 24x7 camera surveillance and maintenance of site expenses ledger.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">5. General Terms</h3>
              <ul className="list-disc pl-5 text-sm text-[#6F6F6F] space-y-2 font-light leading-relaxed">
                <li>A management fee of 15% of the total construction cost will be charged, with applicable taxes.</li>
                <li>This fee will be automatically deducted monthly.</li>
                <li>The Builder is not responsible for leftover materials after construction.</li>
                <li>No approvals are required for petty expenses to ensure smooth operations.</li>
                <li>Construction will follow standard procedures, with no work on certain holidays.</li>
                <li>All instructions must be routed through the company; no direct instructions to the contractor or labourers are permitted.</li>
                <li>Any additional costs due to work halted by the Owner will be payable by the Owner.</li>
                <li>Security costs, if required, will be shared as per mutual agreement.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">6. Inspection Rights</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Owner or their representative has the right to inspect the construction work and materials at any time without prior notice. Any requested changes should be communicated and the Builder will be given reasonable time to implement them.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">7. Term and Termination</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                This Agreement commences on the agreed start date and will continue until the completion of the project or earlier termination as specified in Clause 11.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">8. Indemnification</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Builder is responsible for repairing any damage to the Owner's or neighbours' property caused by negligence. Additionally, the Builder is liable for any accidents or loss of labour at the site.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">9. Force Majeure</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                Neither party will be held liable for delays or failure to perform due to unforeseen events beyond their control (Force Majeure).
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">10. Applicable Law</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                This Agreement is governed by the laws of India. Any disputes will be subject to the jurisdiction of the courts in Jaipur, Rajasthan.
              </p>
            </div>

            {/* Section 11 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">11. Non-Solicitation</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Owner agrees not to solicit or hire any employees of the Builder during the term of this Agreement and for one year thereafter.
              </p>
            </div>

            {/* Section 12 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">12. Expenses</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                Each party will bear its own costs in relation to this Agreement and any associated documentation.
              </p>
            </div>

            {/* Section 13 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">13. Dispute Resolution</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                In case of a dispute, the parties will attempt to resolve it amicably through negotiation. If unsuccessful, the dispute will be resolved through arbitration in Jaipur, Rajasthan.
              </p>
            </div>

            {/* Section 14 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">14. No Joint Venture</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Builder remains an independent contractor. This Agreement does not create a partnership, joint venture, or agency relationship between the parties.
              </p>
            </div>

            {/* Section 15 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">15. Notices</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                All notices and communications under this Agreement will be in writing and delivered to the designated addresses.
              </p>
            </div>

            {/* Section 16 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">16. Execution</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                This Agreement will be executed in duplicate, with one copy retained by the Builder and the other by the Owner.
              </p>
            </div>

            {/* Section 17 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">17. Right to Discontinue</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Owner has the right to discontinue the work if not satisfied with the quality or workmanship, following prior warnings to the Builder. The builder will be given a warning to make improvements. If the quality does not improve, the contractor will be replaced with a more capable team.
              </p>
            </div>

            {/* Section 18 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">18. Liability for Defects</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                If any structural defects, such as leakages or cracks, occur due to poor design or workmanship, the Builder is liable to repair them.
              </p>
            </div>

            {/* Section 19 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">19. Acceptance of Terms</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                By using our services, you acknowledge that you have read, understood and agree to be bound by these Terms and Conditions.
              </p>
            </div>

            {/* Disclaimer repeat */}
            <div className="bg-[#FAF7F5] border border-black/[0.04] rounded-2xl p-5 md:p-6 text-xs md:text-sm flex gap-3.5 items-start leading-relaxed text-[#6F6F6F]">
              <ShieldCheck className="h-5 w-5 text-[#C92C15] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1B1B1B]">Disclaimer:</strong> This is a simplified version of our Terms and Conditions. A detailed legal document is available upon request through our communication channels.
              </div>
            </div>

          </div>
        </FadeUp>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mt-14 md:mt-20">
        <FadeUp delay={0.15} y={20}>
          <div className="bg-[#1B1B1B] rounded-[24px] md:rounded-[32px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Need a detailed contract?</h3>
              <p className="text-sm text-white/50 font-light max-w-lg leading-relaxed">
                Connect with us to receive the full legal agreement document or to clarify any contractual terms for your project.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="mailto:nowalutkarsh@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-[#C92C15] text-white rounded-xl text-sm font-medium hover:bg-[#D43B13] transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
              <a
                href="tel:+918562034491"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-95 border border-white/10"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  );
};

export default TermsAndConditions;
