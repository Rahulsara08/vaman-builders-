import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../lib/cloudinary';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Fast, responsive preloader sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
      if (onComplete) onComplete();
    }, 1800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div className="fixed inset-0 h-[100dvh] w-full z-[999999] pointer-events-none flex flex-col overflow-hidden">
          {/* ── Center Logo Container (Clean logo without card box or shadow) ── */}
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.95] }}
              transition={{ duration: 1.6, times: [0, 0.3, 0.75, 1], ease: 'easeInOut' }}
              src={assets.logo}
              alt="Utkarsh Builder"
              className="w-40 sm:w-56 md:w-72 h-auto object-contain"
              fetchPriority="high"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* ── TOP HALF CURTAIN (WHITE) ── */}
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: expoOut, delay: 1.0 }}
            style={{ willChange: 'transform' }}
            className="w-full h-[50.5dvh] bg-white relative z-40"
          />

          {/* ── BOTTOM HALF CURTAIN (WHITE) ── */}
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.9, ease: expoOut, delay: 1.0 }}
            style={{ willChange: 'transform' }}
            className="w-full h-[50.5dvh] bg-white relative z-40 -mt-1"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
