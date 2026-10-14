import { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../lib/cloudinary';
const LogoImg = assets.logo;
import { Menu, X } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useBodyScrollLock(isMenuOpen);


  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="px-6 md:px-12 lg:px-16 pt-4">
          <div 
            className={`liquid-glass rounded-xl px-6 py-2 flex items-center justify-between transition-all duration-300 ${
              isScrolled || isMenuOpen ? 'bg-black/60 shadow-lg backdrop-blur-md border border-white/10' : 'bg-black/25'
            }`}
          >
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center cursor-pointer bg-white px-2 py-1 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden"
            >
              <img 
                src={LogoImg} 
                alt="Utkarsh Builder Logo" 
                className="h-[40px] md:h-[48px] lg:h-[52px] w-auto object-contain transition-all duration-300"
              />
            </Link>

            {/* Center Links (desktop) */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm md:text-base tracking-wide font-medium transition-all hover:text-[#C92C15] cursor-pointer ${
                      isActive ? 'text-[#C92C15] font-bold border-b-2 border-[#C92C15] pb-0.5' : 'text-gray-200 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right: CTA Button & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                to="/contact#contact-section"
                onClick={(e) => {
                  if (window.location.pathname === '/contact') {
                    e.preventDefault();
                    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-black hover:bg-gray-100 transition-all px-5 py-2 rounded-lg text-sm md:text-base font-semibold cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] inline-block"
              >
                Book Consultation
              </Link>

              {/* Mobile Toggle Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white hover:text-[#C92C15] transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sliding Mobile Navigation Drawer (Warm Light Premium Aesthetic) */}
      <div 
        className={`fixed inset-0 z-40 bg-[#FAF7F5]/98 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col items-center justify-center ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-8 text-center px-6 w-full max-w-sm mt-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-semibold tracking-wide transition-all py-2 w-full border-b border-black/5 cursor-pointer block ${
                  isActive ? 'text-[#C92C15] font-bold border-[#C92C15]' : 'text-[#1B1B1B] hover:text-[#C92C15]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact#contact-section"
            onClick={(e) => {
              setIsMenuOpen(false);
              if (window.location.pathname === '/contact') {
                e.preventDefault();
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all py-3.5 px-8 rounded-xl text-base font-semibold cursor-pointer shadow-lg mt-6 w-full text-center uppercase tracking-wider"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
