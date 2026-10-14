import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

export const useBodyScrollLock = (isLocked: boolean) => {
  const lenis = useLenis();

  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isLocked, lenis]);
};
