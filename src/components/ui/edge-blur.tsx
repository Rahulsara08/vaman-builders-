import React from 'react';

interface EdgeBlurProps {
  position: 'top' | 'bottom';
  height?: number;
}

export const EdgeBlur: React.FC<EdgeBlurProps> = ({ position, height = 56 }) => {
  const steps = 6;
  const isTop = position === 'top';
  
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        [isTop ? 'top' : 'bottom']: 0,
        height: `${height}px`,
        pointerEvents: 'none',
        zIndex: 50,
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      {/* Background color gradient to blend the blur into white */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${isTop ? 'to bottom' : 'to top'}, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)`,
          zIndex: 0,
        }}
      />
      {Array.from({ length: steps }).map((_, i) => {
        const stepHeight = ((steps - i) / steps) * height;
        const blurAmount = 2; // Stacks up to 12px blur at the absolute edge

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              [isTop ? 'top' : 'bottom']: 0,
              height: `${stepHeight}px`,
              backdropFilter: `blur(${blurAmount}px)`,
              WebkitBackdropFilter: `blur(${blurAmount}px)`,
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              willChange: 'transform, backdrop-filter',
              zIndex: i + 1,
            }}
          />
        );
      })}
    </div>
  );
};

export const TopBlur: React.FC<{ height?: number }> = ({ height = 56 }) => {
  return <EdgeBlur position="top" height={height} />;
};

export const BottomBlur: React.FC<{ height?: number }> = ({ height = 56 }) => {
  return <EdgeBlur position="bottom" height={height} />;
};
