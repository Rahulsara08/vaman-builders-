import React from 'react';
import { motion } from 'framer-motion';

interface StaggerContainerProps {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  delayChildren = 0,
  staggerChildren = 0.1,
  className = '',
  once = true,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '50px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export default StaggerContainer;
