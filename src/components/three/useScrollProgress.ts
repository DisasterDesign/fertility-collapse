'use client';

import { useRef, useEffect } from 'react';

export function useScrollProgress() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return scrollRef;
}
