import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../lib/cloudinary';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const LogoImg = assets.logo;

export const Footer: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const staggerChildren = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const fadeSlideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-black/10 bg-white/40 backdrop-blur-md text-black">
      {/* Subtle ambient warm accent */}
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-[#C92C15]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Top Divider Accent Line */}
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#C92C15] to-transparent" />

      {/* Main Footer Content */}
      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full px-8 md:px-16 lg:px-24 pt-16 md:pt-20 pb-10 md:pb-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

          {/* Col 1: Logo & Tagline — 5 spans */}
          <motion.div variants={fadeSlideUp} className="col-span-1 md:col-span-5 space-y-6 text-left">
            <Link to="/" className="inline-block hover:scale-105 transition-all duration-300">
              <img
                src={LogoImg}
                alt="Utkarsh Builder Logo"
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
              />
            </Link>
            <p className="font-medium text-sm leading-[1.8] max-w-md text-black/80">
              We are committed to delivering expert construction services that bring your vision to life. With a focus on quality craftsmanship and attention to detail, we turn your construction projects into stunning realities.
            </p>
            <div className="space-y-3 pt-3">
              <a href="https://maps.google.com/?q=Johri+Bazar+Jaipur+Rajasthan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors text-xs font-semibold group text-black/85 hover:text-[#C92C15]">
                <MapPin className="h-4 w-4 text-[#C92C15] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Johri Bazar, Jaipur, Rajasthan</span>
              </a>
              <a href="tel:+918562034491" className="flex items-center gap-3 transition-colors text-xs font-semibold group text-black/85 hover:text-[#C92C15]">
                <Phone className="h-4 w-4 text-[#C92C15] shrink-0 group-hover:scale-110 transition-transform" />
                <span>+91 8562034491</span>
              </a>
              <a href="mailto:nowalutkarsh@gmail.com" className="flex items-center gap-3 transition-colors text-xs font-semibold group text-black/85 hover:text-[#C92C15]">
                <Mail className="h-4 w-4 text-[#C92C15] shrink-0 group-hover:scale-110 transition-transform" />
                <span>nowalutkarsh@gmail.com</span>
              </a>
            </div>
          </motion.div>

          {/* Col 2: Quick Links — 3 spans */}
          <motion.div variants={fadeSlideUp} className="col-span-1 md:col-span-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 md:mb-8 flex items-center gap-2 text-black">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C92C15]" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { path: '/', label: 'Home' },
                { path: '/services', label: 'Services' },
                { path: '/projects', label: 'Projects' },
                { path: '/about', label: 'About Us' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-semibold hover:text-[#C92C15] hover:pl-1.5 transition-all duration-300 inline-block text-black/85"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Our Services — 4 spans */}
          <motion.div variants={fadeSlideUp} className="col-span-1 md:col-span-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 md:mb-8 flex items-center gap-2 text-black">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C92C15]" />
              Our Services
            </h4>
            <ul className="space-y-4">
              {[
                "Residential & Commercial Construction",
                "Turnkey Projects",
                "Project Management Consultancy (PMC)",
                "Renovation & Remodeling"
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-sm font-semibold hover:text-[#C92C15] hover:pl-1.5 transition-all duration-300 inline-block text-black/85"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </motion.div>

      {/* Footer Bottom Bar — full width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full px-8 md:px-16 lg:px-24 py-6 border-t border-black/10"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Legal / Copyright */}
          <div className="text-center sm:text-left space-y-2">
            <p className="text-[11px] font-semibold text-black/75">
              &copy; {new Date().getFullYear()} Utkarsh Builder. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-[11px] font-semibold text-black/75">
              <Link to="/privacy-policy" className="hover:text-[#C92C15] transition-colors">Privacy Policy</Link>
              <span className="text-black/30">&bull;</span>
              <Link to="/terms-and-conditions" className="hover:text-[#C92C15] transition-colors">Terms &amp; Conditions</Link>
            </div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[#C92C15] hover:border-[#C92C15] hover:text-white bg-black/[0.03] border border-black/10 text-black/60"
            title="Scroll to Top"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
