'use client';

import { useLenis } from '@studio-freight/react-lenis';
import { createContext, ReactNode, useState } from 'react';

interface ScrollValue {
  scrollY: number;
}

export const ScrollContext = createContext<ScrollValue>({
  scrollY: 0,
});

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [scrollY, setScrollY] = useState(0);

  useLenis(({ scroll }: any) => {
    setScrollY(scroll);
  });

  return <ScrollContext.Provider value={{ scrollY }}>{children}</ScrollContext.Provider>;
};
