import React, { useRef, useState } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number; // larger value = less movement (divisor)
  padding?: number; // active padding boundary in pixels
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 15,
  padding = 80,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)');
  const [transition, setTransition] = useState('transform 0.6s ease-in-out');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Center coordinates
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;

    // Mouse coordinates relative to center
    const relX = e.clientX - centerX;
    const relY = e.clientY - centerY;

    // Distance from center
    const distance = Math.sqrt(relX * relX + relY * relY);

    // If mouse is within active boundary
    if (distance < padding + width / 2) {
      setTransition('transform 0.3s ease-out');
      const x = relX / strength;
      const y = relY / strength;
      setTransform(`translate3d(${x}px, ${y}px, 0px)`);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    setTransition('transform 0.6s ease-in-out');
    setTransform('translate3d(0px, 0px, 0px)');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
export default Magnet;
