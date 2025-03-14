'use client';

import { animate, AnimationPlaybackControls } from 'framer-motion';
import { HTMLProps, useEffect, useRef } from 'react';

interface AnimateCounterProps extends HTMLProps<HTMLSpanElement> {
  number: number;
}

export default function AnimatedNumber({ number, ...rest }: AnimateCounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const initialCount = 0;

  useEffect(() => {
    const count = countRef.current;

    const controls: AnimationPlaybackControls = animate(initialCount, number, {
      duration: 1,
      onUpdate: (value) => {
        if (count) {
          count.textContent = Math.floor(value).toString();
        }
      },
    });

    return () => controls.stop();
  }, [number]);

  return <span {...rest} ref={countRef} />;
}
