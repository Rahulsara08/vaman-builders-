import React, { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  initialDelay?: number; // ms, default 200ms
  charDelay?: number; // ms, default 30ms
  charDuration?: number; // ms, default 500ms
  letterSpacing?: string;
  highlightText?: string;
  highlightClassName?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
  initialDelay = 200,
  charDelay = 30,
  charDuration = 500,
  letterSpacing = '-0.04em',
  highlightText = '',
  highlightClassName = '',
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  // Find offsets for highlight tracking
  const highlightStart = highlightText ? text.indexOf(highlightText) : -1;
  const highlightEnd = highlightStart !== -1 ? highlightStart + highlightText.length : -1;

  const lines = text.split('\n');
  
  // Track indices across line segments
  let globalCharCount = 0;
  let absoluteIndex = 0;

  return (
    <h1 className={`${className}`} style={{ letterSpacing }}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');

        const renderedLine = (
          <span key={lineIndex} className="block md:whitespace-nowrap whitespace-normal">
            {words.map((word, wordIndex) => {
              const chars = Array.from(word);

              return (
                <React.Fragment key={wordIndex}>
                  {/* Wrap each word in an inline-block container to prevent letter splitting */}
                  <span className="inline-block whitespace-nowrap">
                    {chars.map((char, charIndex) => {
                      const delay = globalCharCount * charDelay;
                      globalCharCount++;

                      // Check if this character falls inside the highlight boundaries
                      const isHighlighted = highlightStart !== -1 && 
                        absoluteIndex >= highlightStart && 
                        absoluteIndex < highlightEnd;
                      
                      absoluteIndex++;

                      return (
                        <span
                          key={charIndex}
                          className={`inline-block transition-all ease-out ${isHighlighted ? highlightClassName : ''}`}
                          style={{
                            opacity: animate ? 1 : 0,
                            transform: animate ? 'translateX(0)' : 'translateX(-18px)',
                            transitionDuration: `${charDuration}ms`,
                            transitionDelay: `${delay}ms`,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                  
                  {/* Append a space after the word, unless it is the last word in the line */}
                  {wordIndex < words.length - 1 && (() => {
                    const spaceDelay = globalCharCount * charDelay;
                    globalCharCount++;
                    absoluteIndex++; // Account for space in absoluteIndex
                    
                    return (
                      <span
                        className="inline-block"
                        style={{
                          opacity: animate ? 1 : 0,
                          transitionDuration: `${charDuration}ms`,
                          transitionDelay: `${spaceDelay}ms`,
                        }}
                      >
                        {'\u00A0'}
                      </span>
                    );
                  })()}
                </React.Fragment>
              );
            })}
          </span>
        );

        // Account for the newline char in absolute index
        absoluteIndex++;

        return renderedLine;
      })}
    </h1>
  );
};
export default AnimatedHeading;
