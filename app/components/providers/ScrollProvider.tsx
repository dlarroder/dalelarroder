'use client';

import { useLenis } from 'lenis/dist/lenis-react';
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

  useLenis(({ scroll }) => {
    setScrollY(scroll);
  });

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};
