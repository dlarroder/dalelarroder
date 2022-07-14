import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function WorkContainer({ children }: Props) {
  return <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">{children}</div>
}

export function WorkBackground() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen top-0 sticky">
      <div className="bg-black h-[30vh] lg:h-auto"></div>
      <div className="bg-white h-[70vh] lg:h-auto"></div>
    </div>
  )
}

interface WorkProps {
  children: ReactNode
  progress: number
}

export function WorkLeft({ children, progress }: WorkProps) {
  let translateY = Math.max(0, 50 - progress * 3 * 50)

  if (progress > 0.85) {
    translateY = Math.max(-50, -(progress - 0.85) * 2 * 50)
  }
  return (
    <div
      className="flex flex-col items-center justify-center text-3xl lg:text-3xl h-[30vh] lg:h-auto"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div className="leading-10 text-white">{children}</div>
    </div>
  )
}

export function WorkRight({ children, progress }: WorkProps) {
  const translateY = Math.max(-50, -(progress - 0.5) * 50)

  return (
    <div
      className="flex flex-1 lg:items-center justify-center h-screen"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div className="w-full max-w-md pt-10 lg:pt-0 px-10 md:px-0">{children}</div>
    </div>
  )
}
