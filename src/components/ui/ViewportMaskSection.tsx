import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ViewportMaskSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const ViewportMaskSection: React.FC<ViewportMaskSectionProps> = ({
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this specific section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Smooth transitions from bottom of screen to middle of screen
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 0.9], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [0.96, 1]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <motion.div
        style={{
          opacity,
          y,
          scale,
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
        }}
        transition={{ ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ViewportMaskSection;
