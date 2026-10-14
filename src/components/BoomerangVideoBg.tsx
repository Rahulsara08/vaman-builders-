import React, { useEffect, useRef, useState } from 'react';

interface BoomerangVideoBgProps {
  src: string;
  className?: string;
  poster?: string;
}

// Target framerate for boomerang (30fps)
const fpsInterval = 1000 / 30;

export const BoomerangVideoBg: React.FC<BoomerangVideoBgProps> = ({ src, className = '', poster }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [framesReady, setFramesReady] = useState(false);
  const [fallback, setFallback] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      return isMobile;
    }
    return false;
  });

  // Buffer references
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const currentFrameRef = useRef(0);
  const directionRef = useRef<'forward' | 'backward'>('forward');
  const animationFrameIdRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || fallback) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setFallback(true);
      return;
    }

    let isDestroyed = false;
    let captureFailed = false;

    // Helper to draw a frame maintaining aspect-ratio cover
    const drawFrameWithCover = (frameCanvas: HTMLCanvasElement) => {
      if (!ctx || !canvas) return;
      const imgWidth = frameCanvas.width;
      const imgHeight = frameCanvas.height;
      const dstWidth = canvas.width;
      const dstHeight = canvas.height;

      const imgRatio = imgWidth / imgHeight;
      const dstRatio = dstWidth / dstHeight;

      let srcWidth = imgWidth;
      let srcHeight = imgHeight;
      let srcX = 0;
      let srcY = 0;

      if (imgRatio > dstRatio) {
        srcWidth = imgHeight * dstRatio;
        srcX = (imgWidth - srcWidth) / 2;
      } else {
        srcHeight = imgWidth / dstRatio;
        srcY = (imgHeight - srcHeight) / 2;
      }

      ctx.clearRect(0, 0, dstWidth, dstHeight);
      ctx.drawImage(frameCanvas, srcX, srcY, srcWidth, srcHeight, 0, 0, dstWidth, dstHeight);
    };

    // Handle canvas resizing
    const resizeCanvas = () => {
      if (canvas && !isDestroyed) {
        canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        
        // Redraw immediately if we have a frame
        if (framesRef.current.length > 0) {
          const index = currentFrameRef.current;
          if (framesRef.current[index]) {
            drawFrameWithCover(framesRef.current[index]);
          }
        }
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Frame capture function
    const captureFrame = () => {
      if (isDestroyed || captureFailed) return;
      if (!video || video.paused || video.ended) return;

      try {
        const offscreen = document.createElement('canvas');
        // Cap width at 1920px for high-definition quality
        offscreen.width = Math.min(video.videoWidth || 1920, 1920);
        const scale = offscreen.width / (video.videoWidth || 1920);
        offscreen.height = (video.videoHeight || 1080) * scale;
        
        const oCtx = offscreen.getContext('2d');
        if (oCtx) {
          oCtx.drawImage(video, 0, 0, offscreen.width, offscreen.height);
          framesRef.current.push(offscreen);
        }
      } catch (err) {
        console.warn('CORS or Canvas capture failed. Switching to native video loop.', err);
        captureFailed = true;
        setFallback(true);
      }
    };

    // Callback-based frame update loop
    let rVFCId: number | null = null;
    const updateFrameCallback = () => {
      if (isDestroyed || captureFailed) return;
      captureFrame();
      if (video && !video.ended && !video.paused) {
        if ('requestVideoFrameCallback' in video) {
          rVFCId = (video as HTMLVideoElement & { requestVideoFrameCallback?: (callback: () => void) => number }).requestVideoFrameCallback!(updateFrameCallback);
        } else {
          animationFrameIdRef.current = requestAnimationFrame(updateFrameCallback);
        }
      }
    };

    // Fallback animation frame loop
    const fallbackFrameLoop = () => {
      if (isDestroyed || captureFailed) return;
      captureFrame();
      if (video && !video.ended && !video.paused) {
        animationFrameIdRef.current = requestAnimationFrame(fallbackFrameLoop);
      }
    };

    // Boomerang playback loop once frames are cached
    const startBoomerangLoop = () => {
      const tick = (timestamp: number) => {
        if (isDestroyed) return;

        animationFrameIdRef.current = requestAnimationFrame(tick);

        const elapsed = timestamp - lastTickTimeRef.current;
        if (elapsed < fpsInterval) return;

        lastTickTimeRef.current = timestamp - (elapsed % fpsInterval);

        const frames = framesRef.current;
        if (frames.length === 0) return;

        const index = currentFrameRef.current;
        const dir = directionRef.current;

        // Draw current frame using object-cover style
        drawFrameWithCover(frames[index]);

        // Update step index
        if (dir === 'forward') {
          if (index < frames.length - 1) {
            currentFrameRef.current = index + 1;
          } else {
            directionRef.current = 'backward';
            currentFrameRef.current = frames.length - 2;
          }
        } else {
          if (index > 0) {
            currentFrameRef.current = index - 1;
          } else {
            directionRef.current = 'forward';
            currentFrameRef.current = 1;
          }
        }
      };

      lastTickTimeRef.current = performance.now();
      animationFrameIdRef.current = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      if (video) video.pause();
      if (!isDestroyed && !captureFailed && framesRef.current.length > 0) {
        currentFrameRef.current = framesRef.current.length - 1;
        directionRef.current = 'backward';
        
        // Draw the last frame immediately so there is no visual blink
        drawFrameWithCover(framesRef.current[currentFrameRef.current]);

        // Instantly switch displays using direct DOM modification to bypass React render delay
        if (videoRef.current) videoRef.current.style.display = 'none';
        if (canvasRef.current) canvasRef.current.style.display = 'block';

        setFramesReady(true);
        startBoomerangLoop();
      }
    };

    const handleCanPlay = () => {
      if (video) {
        video.play().then(() => {
          // Start capture loop
          if ('requestVideoFrameCallback' in video) {
            rVFCId = (video as HTMLVideoElement & { requestVideoFrameCallback?: (callback: () => void) => number }).requestVideoFrameCallback!(updateFrameCallback);
          } else {
            animationFrameIdRef.current = requestAnimationFrame(fallbackFrameLoop);
          }
        }).catch(err => {
          console.warn('Video playback blocked or failed:', err);
          setFallback(true);
        });
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);

    // If video is already loaded
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      isDestroyed = true;
      window.removeEventListener('resize', resizeCanvas);
      if (video) {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('ended', handleEnded);
        video.pause();
        if (rVFCId !== null && 'cancelVideoFrameCallback' in video) {
          (video as HTMLVideoElement & { cancelVideoFrameCallback?: (id: number) => void }).cancelVideoFrameCallback!(rVFCId);
        }
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      framesRef.current = [];
    };
  }, [src, fallback]);

  if (fallback) {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none ${className}`}
      />
    );
  }

  return (
    <div className={`absolute inset-0 w-full h-full bg-[#FAF7F5] select-none pointer-events-none overflow-hidden ${className}`}>
      {/* Video is visible while capturing frames */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: framesReady ? 'none' : 'block' }}
      />
      
      {/* Canvas takes over once frames are ready for boomerang playback */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: framesReady ? 'block' : 'none' }}
      />
    </div>
  );
};

export default BoomerangVideoBg;
