import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { FadeUp } from './ui/FadeUp';

interface ContactProps {
  isEmbedded?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isEmbedded = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    propertySize: '',
    timeline: '',
    address: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `*New Enquiry - Utkarsh Builder*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Project Type:* ${formData.projectType}
*Plot Size:* ${formData.propertySize || 'N/A'}
*Timeline to Start:* ${formData.timeline}
*Address:* ${formData.address}

*Question:*
${formData.message || 'None'}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=918562034491&text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: '',
      propertySize: '',
      timeline: '',
      address: '',
      message: '',
    });
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Row 1: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Name */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder=" "
            className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
          />
          <label
            htmlFor="name"
            className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold"
          >
            Full Name *
          </label>
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder=" "
            className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
          />
          <label
            htmlFor="phone"
            className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold"
          >
            Phone Number *
          </label>
        </div>
      </div>

      {/* Row 2: Email & Project Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder=" "
            className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
          />
          <label
            htmlFor="email"
            className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold"
          >
            Email Address *
          </label>
        </div>

        {/* Project Type */}
        <div className="relative">
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            required
            className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors appearance-none cursor-pointer font-bold"
          >
            <option value="" disabled className="bg-white text-[#333333]">Select Project Type *</option>
            <option value="Residential Villas" className="bg-white text-[#111111]">Residential Villas</option>
            <option value="Commercial Buildings" className="bg-white text-[#111111]">Commercial Buildings</option>
            <option value="Turnkey Projects" className="bg-white text-[#111111]">Turnkey Construction</option>
            <option value="Renovation" className="bg-white text-[#111111]">Renovation &amp; Remodeling</option>
          </select>
          <div className="absolute right-0 top-4 pointer-events-none text-[#333333]">
            ▼
          </div>
        </div>
      </div>

      {/* Row 3: Property Size & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Property Size */}
        <div className="relative">
          <input
            type="text"
            id="propertySize"
            name="propertySize"
            value={formData.propertySize}
            onChange={handleInputChange}
            placeholder=" "
            className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
          />
          <label
            htmlFor="propertySize"
            className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold"
          >
            Plot Size / Dimensions in Feet (e.g., 50x30 ft)
          </label>
        </div>

        {/* Construction Timeline */}
        <div className="relative">
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            required
            className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors appearance-none cursor-pointer font-bold"
          >
            <option value="" disabled className="bg-white text-[#333333]">Timeline to Start *</option>
            <option value="Immediate" className="bg-white text-[#111111]">Immediate</option>
            <option value="1-3 Months" className="bg-white text-[#111111]">1 to 3 Months</option>
            <option value="3-6 Months" className="bg-white text-[#111111]">3 to 6 Months</option>
            <option value="Planning Phase" className="bg-white text-[#111111]">Planning Phase Only</option>
          </select>
          <div className="absolute right-0 top-4 pointer-events-none text-[#333333]">
            ▼
          </div>
        </div>
      </div>

      {/* Row 4: Plot Address */}
      <div className="relative">
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          placeholder=" "
          className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
        />
        <label
          htmlFor="address"
          className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold"
        >
          Plot Address / Location *
        </label>
      </div>

      {/* Row 5: Message */}
      <div className="relative">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          placeholder=" "
          className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors resize-none font-bold"
        />
        <label
          htmlFor="message"
          className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold"
        >
          Tell us more about your vision...
        </label>
      </div>

      {/* Submit Button */}
      <div className="text-left">
        <button
          type="submit"
          className="bg-[#C92C15] hover:bg-[#D43B13] text-white transition-all duration-300 px-8 py-3.5 rounded-lg text-sm font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
        >
          <span>Submit Enquiry</span>
          <Send className="h-4 w-4" />
        </button>
      </div>

    </form>
  );

  if (isEmbedded) {
    return (
      <div className="w-full text-[#111111] bg-white/30 backdrop-blur-xl p-5 md:p-10 rounded-2xl md:rounded-3xl border border-white/60 shadow-2xl text-left">
        {formContent}
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Side: Contact Information & Heading (5 cols) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center lg:h-full lg:min-h-[450px]">
            <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 shadow-2xl">
              <FadeUp delay={0.1} className="mb-3">
                <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase">Connect</span>
              </FadeUp>
              <FadeUp delay={0.2} className="mb-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#111111] leading-none">
                  Let's Build<br />Something<br />
                  <span className="text-[#C92C15] font-normal italic">Exceptional.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="text-[#333333] font-medium text-sm md:text-base leading-relaxed">
                  Have a plot in Rajasthan or planning to construct a project? Leave us a message and our lead site engineer will reach out within 24 hours.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Right Side: Form (7 cols) */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.3} y={40} className="bg-white/30 backdrop-blur-xl border border-white/60 p-5 md:p-10 rounded-2xl md:rounded-3xl shadow-2xl text-[#111111]">
              {formContent}
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Contact;
