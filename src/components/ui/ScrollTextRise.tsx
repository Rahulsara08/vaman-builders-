import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollTextRiseProps {
  text: string;
  className?: string;
  textClassName?: string;
}

export const ScrollTextRise: React.FC<ScrollTextRiseProps> = ({
  text,
  className = '',
  textClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.3', 'end 0.7'],
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="sticky top-0 h-[100dvh] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
          <p
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 1.15 }}
            className={`font-semibold tracking-[-0.025em] text-[#1B1B1B] flex flex-wrap ${textClassName}`}
          >
            {words.map((word, i) => {
              const total = words.length;
              const start = i / total;
              const end = Math.min((i + 2) / total, 1);
              return (
                <Word
                  key={i}
                  word={word}
                  scrollYProgress={scrollYProgress}
                  rangeStart={start}
                  rangeEnd={end}
                />
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  word: string;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  rangeStart: number;
  rangeEnd: number;
}

const Word: React.FC<WordProps> = ({ word, scrollYProgress, rangeStart, rangeEnd }) => {
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0.1, 1]);
  const y = useTransform(scrollYProgress, [rangeStart, rangeEnd], [6, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em] will-change-transform"
    >
      {word}
    </motion.span>
  );
};

export default ScrollTextRise;
