import React from 'react';
import { Shield, Eye, Lock, FileText, Phone, Mail } from 'lucide-react';
import { FadeUp } from '../components/ui/FadeUp';
import { PointerHighlight } from '../components/ui/pointer-highlight';

const highlights = [
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Transparent Collection",
    desc: "We only gather data you provide during consultations and project registrations, with nothing hidden.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Zero Data Selling",
    desc: "Your personal information is never sold or rented to third parties. We share only with project partners.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Industry Grade Security",
    desc: "Encrypted servers, restricted staff access and regular compliance audits keep your data safe.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Full User Control",
    desc: "Request updates, deletions, or opt out anytime by writing to us at nowalutkarsh@gmail.com.",
  },
];

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pt-28 md:pt-32 pb-20 md:pb-28">

      {/* ── Header Banner ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mb-14 md:mb-20 text-left">
        <FadeUp delay={0.05}>
          <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] block mb-4">
            Legal
          </span>
        </FadeUp>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#1B1B1B] tracking-tight leading-tight mb-4 flex items-center gap-x-2">
            <PointerHighlight delay={0.3} containerClassName="text-[#1B1B1B]">Privacy</PointerHighlight> Policy
          </h1>
        <FadeUp delay={0.25}>
          <p className="text-xs md:text-sm text-[#6F6F6F] font-light">
            Effective Date: November 24, 2024 &nbsp;·&nbsp; Last updated June 2026
          </p>
        </FadeUp>
      </section>

      {/* ── Highlights Grid ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mb-14 md:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {highlights.map((item, i) => (
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

      {/* ── Full-Width Policy Content Card ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <FadeUp delay={0.1} y={20}>
          <div className="bg-white p-8 md:p-14 rounded-[28px] md:rounded-[40px] border border-black/[0.04] shadow-sm space-y-10 text-left">

            {/* Intro */}
            <p className="text-sm md:text-base text-[#6F6F6F] leading-[1.85] font-light">
              Utkarsh Builder ("we," "our" or "us") values your trust and is committed to protecting your privacy. This Privacy Policy outlines how we collect, use and safeguard your personal information when you interact with our website and construction consultancy services. By using our website or availing of our services, you agree to the terms outlined below.
            </p>

            <hr className="border-black/[0.04]" />

            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">1. Information We Collect</h3>
              <ul className="list-disc pl-5 text-sm text-[#6F6F6F] space-y-2.5 font-light leading-relaxed">
                <li><strong className="text-[#1B1B1B] font-medium">Personal Information:</strong> Name, email address, phone number and address provided during inquiries, project registrations or consultations.</li>
                <li><strong className="text-[#1B1B1B] font-medium">Financial Information:</strong> Payment details and billing accounts when processing milestone invoices.</li>
                <li><strong className="text-[#1B1B1B] font-medium">Non-Personal Information:</strong> Browser type, IP address and browsing behavior gathered through secure cookies.</li>
                <li><strong className="text-[#1B1B1B] font-medium">Project Specific Information:</strong> Construction project details, including plot location, blueprint layouts, soil test reports and materials preferences.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">2. How We Use Your Information</h3>
              <ul className="list-disc pl-5 text-sm text-[#6F6F6F] space-y-2.5 font-light leading-relaxed">
                <li>To provide, manage and scale our structural design, construction and turnkey engineering services.</li>
                <li>To communicate with you regarding design revisions, material status, project timelines and invoices.</li>
                <li>To obtain necessary municipal approvals and comply with local construction regulations in Rajasthan.</li>
                <li>To audit site safety and implement digital surveillance features at your project site.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">3. Sharing of Information</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                We do not sell or rent your personal information to third parties. However, we may share your information with:
              </p>
              <ul className="list-disc pl-5 text-sm text-[#6F6F6F] space-y-2.5 font-light leading-relaxed">
                <li>Trusted service providers, subcontractors, structural engineers and architects involved directly in your project.</li>
                <li>Regulatory bodies and local municipal development authorities as required by Indian law.</li>
                <li>Authorized software vendors handling project tracking and payment processing.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">4. Data Storage and Security</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                We implement industry standard physical and technical measures to protect your data from unauthorized access, loss or disclosure. This includes strict role based data access restrictions for internal staff, data encryption during transit and secure server hosts.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">5. Your Rights</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                As a user, you have the right to request access to and update your personal information, request deletion of your data (subject to active building contracts or legal parameters) and opt out of marketing notifications. Please contact us at <a href="mailto:nowalutkarsh@gmail.com" className="text-[#C92C15] hover:underline font-medium">nowalutkarsh@gmail.com</a> to exercise these rights.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">6. Cookies &amp; Tracking</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                Our website uses cookies to enhance user experience and analyse site traffic. You can control cookie preferences through your browser settings. Note that disabling cookies may affect certain website functionality.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">7. Governing Law</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                This Privacy Policy is governed by the laws of India. Any disputes arising from this policy will be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan.
              </p>
            </div>

          </div>
        </FadeUp>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mt-14 md:mt-20">
        <FadeUp delay={0.15} y={20}>
          <div className="bg-[#1B1B1B] rounded-[24px] md:rounded-[32px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Have questions about your data?</h3>
              <p className="text-sm text-white/50 font-light max-w-lg leading-relaxed">
                We are here to help. Reach out to our team if you have any concerns about how your information is managed.
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

export default PrivacyPolicy;
