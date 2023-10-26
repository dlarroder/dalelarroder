'use client';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => setWidth(v * 100));

  return <div className="fixed top-0 z-40 h-1 bg-primary-500" style={{ width: width + '%' }}></div>;
}
