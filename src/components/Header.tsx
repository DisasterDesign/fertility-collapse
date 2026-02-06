'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg/70 border-b border-muted/10"
        >
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2.5 group">
              <span className="text-xl">🌍</span>
              <span className="text-sm font-mono text-accent tracking-wider uppercase font-medium group-hover:text-text-primary transition-colors">
                Fertility Collapse
              </span>
            </a>

            {/* Contact Button */}
            <a
              href="mailto:davidalelad@gmail.com"
              className="px-5 py-2 text-sm font-medium rounded-full border border-accent/50 text-accent hover:bg-accent hover:text-bg transition-all duration-200"
            >
              Contact
            </a>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
