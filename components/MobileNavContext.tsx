'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface MobileNavContextType {
  navShow: boolean;
  setNavShow: (show: boolean) => void;
  toggleNav: () => void;
}

const MobileNavContext = createContext<MobileNavContextType | undefined>(undefined);

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [navShow, setNavShow] = useState(false);

  const toggleNav = () => setNavShow(!navShow);

  return (
    <MobileNavContext.Provider value={{ navShow, setNavShow, toggleNav }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function useMobileNav() {
  const context = useContext(MobileNavContext);
  if (context === undefined) {
    throw new Error('useMobileNav must be used within a MobileNavProvider');
  }
  return context;
}
