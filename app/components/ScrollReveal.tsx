'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '' 
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionVariants = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  };

  const initial = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? { x: 0, y: 0 } : initial}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.45, 0.27, 0.99]
      }}
    >
      {children}
    </motion.div>
  );
} 