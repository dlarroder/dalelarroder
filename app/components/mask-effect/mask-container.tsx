'use client';

import classNames from 'classnames';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number | null;
  y: number | null;
}

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const updateMousePosition = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('mousemove', updateMousePosition);
    return () => {
      if (container) {
        container.removeEventListener('mousemove', updateMousePosition);
      }
    };
  }, []);

  const maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      ref={containerRef}
      className={classNames('relative h-screen', className)}
      animate={{
        backgroundColor: isHovered ? 'var(--slate-900)' : 'var(--white)',
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}
    >
      <motion.div
        className="absolute flex h-full w-full items-center justify-center bg-white text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px] dark:bg-black"
        animate={{
          WebkitMaskPosition:
            mousePosition.x !== null && mousePosition.y !== null
              ? `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`
              : '0px 0px',
          WebkitMaskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: 'easeInOut' },
          maskPosition: { duration: 0.15, ease: 'linear' },
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" />
        <div
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="relative z-20 mx-auto max-w-4xl text-4xl"
        >
          {children}
        </div>
      </motion.div>

      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </motion.div>
  );
};
