'use client';

import { createContext } from 'react';

interface TileContextValue {
  numOfPages: number;
  currentPage: number;
}

export const TileContext = createContext<TileContextValue>({ numOfPages: 0, currentPage: 0 });
