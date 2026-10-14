import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import ScrollVideoBanner from './components/ScrollVideoBanner';

// Lazy load page components
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions').then(module => ({ default: module.TermsAndConditions })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(module => ({ default: module.AdminPage })));

// Modern brand-colored loader for page transitions
const PageLoader = () => (
  <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 bg-transparent select-none pointer-events-none">
    <div className="w-10 h-10 border-4 border-[#C92C15]/20 border-t-[#C92C15] rounded-full animate-spin" />
    <span className="text-xs font-semibold text-white/50 tracking-widest uppercase animate-pulse">Loading</span>
  </div>
);

// Inner component so we can use useLocation inside Router
function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="relative w-full min-h-screen selection:bg-[#C92C15] selection:text-white">
      {/* Scroll-linked video background — only on home page, sits at z-0 */}
      {isHome && <ScrollVideoBanner />}

      {/* Navigation — z-50 always on top */}
      <Navbar />

      {/* Dynamic Route Pages with Suspense boundary */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>

      {/* Global Footer */}
      <Footer />

      {/* Floating Consultation Widget */}
      <FloatingCTA />
    </div>
  );
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.8, syncTouch: true }}>
      <Router>
        <ScrollToTop />
        <AppInner />
      </Router>
    </ReactLenis>
  );
}

export default App;
