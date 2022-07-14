import { ReactNode } from 'react'

interface TileBackgroundProps {
  children: ReactNode
}

export default function TileBackground({ children }: TileBackgroundProps) {
  return <div className="absolute h-full w-full">{children}</div>
}
