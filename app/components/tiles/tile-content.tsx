import { ReactNode } from 'react';

interface TileContentProps {
  children?: ReactNode;
}

export const TileContent = ({ children }: TileContentProps) => {
  return <div className="sticky top-0 h-screen overflow-hidden">{children}</div>;
};
