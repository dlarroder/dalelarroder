'use client';

import Scroll from 'locomotive-scroll';
import { usePathname } from 'next/navigation';
import { ReactNode, useRef } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { ScrollObserver } from './ScrollObserver';

interface Props {
  children: ReactNode;
}

export default function LocomotiveProvider({ children }: Props) {
  const pathName = usePathname();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        lerp: 0.05,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
          breakpoint: 1024,
        },
      }}
      watch={[]}
      location={pathName}
      containerRef={scrollRef}
      onLocationChange={(scroll: Scroll) => {
        scroll.scrollTo(0, { duration: 250, disableLerp: true });
      }}
      onUpdate={() => undefined}
    >
      <ScrollObserver>
        <main data-scroll-container ref={scrollRef}>
          {children}
        </main>
      </ScrollObserver>
    </LocomotiveScrollProvider>
  );
}
