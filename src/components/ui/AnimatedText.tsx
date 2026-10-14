import React, { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

// Crisp, high-end tick sound generated programmatically via Web Audio API
const playTickSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.03);
    
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch {
    // Fail silently to prevent console pollution
  }
};

// Global trigger for iOS switch haptic workaround
let iosHapticInput: HTMLInputElement | null = null;

const triggerIOSHaptic = () => {
  if (typeof document === 'undefined') return;
  
  if (!iosHapticInput) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (!isIOS) return;

    try {
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.setAttribute('switch', '');
      input.style.position = 'absolute';
      input.style.width = '1px';
      input.style.height = '1px';
      input.style.opacity = '0';
      input.style.pointerEvents = 'none';
      input.style.overflow = 'hidden';
      document.body.appendChild(input);
      iosHapticInput = input;
    } catch {
      return;
    }
  }

  if (iosHapticInput) {
    try {
      iosHapticInput.click();
    } catch {
      iosHapticInput.checked = !iosHapticInput.checked;
    }
  }
};

// Subtle, crisp haptic feedback for premium mobile feel
const vibrateDevice = () => {
  if (typeof navigator !== 'undefined') {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(12);
      } catch {
        // Fail silently
      }
    } else {
      // Fallback for iOS Chrome / Safari using native switch haptic
      triggerIOSHaptic();
    }
  }
};

interface AnimatedCharProps {
  char: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}

const AnimatedChar: React.FC<AnimatedCharProps> = ({ char, scrollYProgress, start, end }) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-20 text-[#FAF7F5]/30">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute top-0 left-0 text-current select-none"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.3'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  // Track thresholds for each word to trigger ticks and vibrations
  const lastHighlightedWordIdx = useRef<number>(-1);

  const wordStartThresholds = useMemo(() => {
    let charAcc = 0;
    const thresholds: number[] = [];
    for (let i = 0; i < words.length; i++) {
      thresholds.push(charAcc / totalChars);
      charAcc += words[i].length + 1;
    }
    return thresholds;
  }, [words, totalChars]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      let activeIdx = -1;
      for (let i = 0; i < wordStartThresholds.length; i++) {
        if (value >= wordStartThresholds[i]) {
          activeIdx = i;
        } else {
          break;
        }
      }

      if (activeIdx !== lastHighlightedWordIdx.current) {
        if (activeIdx > lastHighlightedWordIdx.current && activeIdx >= 0) {
          playTickSound();
          vibrateDevice();
        }
        lastHighlightedWordIdx.current = activeIdx;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, wordStartThresholds]);

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center`}>
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);
        
        return (
          <span key={wordIdx} className="inline-block mr-[0.35em] whitespace-nowrap">
            {chars.map((char, index) => {
              const currentIdx = charCounter;
              charCounter++;

              // Map scroll progress range for this specific character
              const start = currentIdx / totalChars;
              const end = Math.min((currentIdx + 5) / totalChars, 1);

              return (
                <AnimatedChar
                  key={index}
                  char={char}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
