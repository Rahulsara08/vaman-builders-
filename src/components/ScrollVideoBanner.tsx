import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './Preloader';

gsap.registerPlugin(ScrollTrigger);

const RAW_VIDEO_SRC = '/assets/videos/scroll-banner.mp4';

interface ScrollVideoBannerProps {
  src?: string;
  className?: string;
}

export const ScrollVideoBanner: React.FC<ScrollVideoBannerProps> = ({
  src = RAW_VIDEO_SRC,
  className = '',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    let currentTarget = 0;
    let seekPending = false;
    let scrollTriggerInstance: ScrollTrigger | null = null;
    let footerScrollTriggerInstance: ScrollTrigger | null = null;

    const doSeek = (time: number) => {
      if (!video || !isFinite(time) || isNaN(time)) return;
      if (video.seeking) {
        seekPending = true;
      } else {
        video.currentTime = time;
      }
    };

    const handleSeeked = () => {
      if (seekPending) {
        seekPending = false;
        doSeek(currentTarget);
      }
    };

    video.addEventListener('seeked', handleSeeked);

    // Set raw local video source for instant hardware-accelerated playback
    video.src = src;
    video.load();

    const initScrollAnimations = () => {
      const homeEl = document.getElementById('home');
      if (!homeEl) return false;

      // Clean up previous instances to prevent duplicates
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }
      if (footerScrollTriggerInstance) {
        footerScrollTriggerInstance.kill();
        footerScrollTriggerInstance = null;
      }

      // ── GSAP ScrollTrigger Video scrubbing & UI Fades ───────────────────────────
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.1,
        onUpdate: (self) => {
          // 1. Scrub video progress (finishes early at 68% scroll, leaving 32% as a hold phase)
          if (video.duration && isFinite(video.duration)) {
            const videoProgress = Math.min(1.0, self.progress / 0.68);
            currentTarget = videoProgress * video.duration;
            doSeek(currentTarget);
          }

          // 2. Scrub Hero Text opacity (fades out in first 15% of scroll, fades back in on scroll up)
          const heroOpacity = Math.max(0, 1 - (self.progress / 0.15));
          gsap.set('.hero-text-container', {
            opacity: heroOpacity,
            pointerEvents: heroOpacity > 0 ? 'auto' : 'none',
          });

          // 3. Control global Navbar & Floating CTA visibility based on scroll direction & position
          if (self.progress === 0) {
            // At the absolute top, ensure UI is visible
            gsap.to('nav, .floating-cta-container', {
              opacity: 1,
              pointerEvents: 'auto',
              duration: 0.2,
              overwrite: 'auto',
            });
          } else if (self.direction === -1) {
            // Scrolling UP: immediately bring back UI elements for navigation
            gsap.to('nav, .floating-cta-container', {
              opacity: 1,
              pointerEvents: 'auto',
              duration: 0.3,
              overwrite: 'auto',
            });
          } else {
            // Scrolling DOWN:
            if (self.progress > 0 && self.progress < 0.2) {
              // Fade out UI
              gsap.to('nav, .floating-cta-container', {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3,
                overwrite: 'auto',
              });
            } else if (self.progress >= 0.2 && self.progress < 0.8) {
              // Keep UI hidden during cinematic phase and early hold phase
              gsap.to('nav, .floating-cta-container', {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.1,
                overwrite: 'auto',
              });
            } else if (self.progress >= 0.8) {
              // Fade UI back in near the end of hold phase to transition to content sections
              gsap.to('nav, .floating-cta-container', {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3,
                overwrite: 'auto',
              });
            }
          }

          // 4. White transparent overlay after the video finishes playing (progress 0.68 to 0.90, max opacity 0.75)
          const maxWhiteOpacity = 0.75;
          const overlayOpacity = Math.max(0, Math.min(maxWhiteOpacity, ((self.progress - 0.68) / (0.90 - 0.68)) * maxWhiteOpacity));
          gsap.set('.video-white-overlay', { opacity: overlayOpacity });
        },
      });

      // 5. Fade out the white overlay only when footer is entering the viewport
      footerScrollTriggerInstance = ScrollTrigger.create({
        trigger: 'footer',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const maxWhiteOpacity = 0.75;
          const footerOpacity = maxWhiteOpacity * (1 - self.progress);
          gsap.set('.video-white-overlay', { opacity: footerOpacity });
        }
      });

      return true;
    };

    // Initial attempt
    initScrollAnimations();

    // Refresh and reinitialize when layout changes (e.g. dynamic pages mount)
    const resizeObserver = new ResizeObserver(() => {
      if (initScrollAnimations()) {
        ScrollTrigger.refresh();
      }
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (footerScrollTriggerInstance) {
        footerScrollTriggerInstance.kill();
      }
      resizeObserver.disconnect();
      gsap.set('nav, .floating-cta-container, .video-white-overlay', { clearProps: 'all' });
    };
  }, [src]);

  return (
    <>
      {/* Split Curtain Preloader */}
      <Preloader />

      {/* Instant Video Background Wrapper */}
      <div
        ref={wrapperRef}
        id="scroll-video-container"
        className={`fixed top-0 left-0 w-full h-full z-0 bg-[#0a0a0a] overflow-hidden origin-center ${className}`}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-[40%_center] md:object-center scale-[1.05] md:scale-100 pointer-events-none transition-all duration-300"
        />
        {/* Overlay is shown on laptop/desktop (md:block) and hidden on mobile so video is 100% clear */}
        <div className="overlay absolute inset-0 hidden md:block bg-black/25 pointer-events-none" />
        {/* White transparent overlay that fades in after the video finishes playing */}
        <div className="video-white-overlay absolute inset-0 bg-white opacity-0 pointer-events-none" />
      </div>
    </>
  );
};

export default ScrollVideoBanner;
