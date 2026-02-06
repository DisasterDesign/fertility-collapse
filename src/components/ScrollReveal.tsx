'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const [forceVisible, setForceVisible] = useState(false);
  const hasAnimated = useRef(false);

  // Safety net: if animation hasn't fired after 3s, force visible
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated.current) {
        setForceVisible(true);
      }
    }, 3000 + delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-50px', amount: 0.05 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      onAnimationComplete={() => { hasAnimated.current = true; }}
      style={forceVisible && !hasAnimated.current ? { opacity: 1, transform: 'none' } : undefined}
    >
      {children}
    </motion.div>
  );
}
