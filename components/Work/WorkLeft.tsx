import { WorkProps } from './WorkRight'

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
