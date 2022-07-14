import { cloneElement, createContext, ReactNode, useContext, useRef } from 'react'
import { ScrollContext } from '../ScrollObserver'

interface WrapperProps {
  children: ReactNode
  numOfPages: number
}

interface TileContextValue {
  numOfPages: number
  currentPage: number
}

export const TileContext = createContext<TileContextValue>({ numOfPages: 0, currentPage: 0 })

export const TileWrapper = ({ children, numOfPages }: WrapperProps) => {
  const refContainer = useRef<HTMLDivElement>()

  const { scrollY } = useContext(ScrollContext)
  let currentPage = 0
  const { current: elContainer } = refContainer

  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer

    const screenH = window.innerHeight
    const halfH = screenH / 2
    const percentY =
      Math.min(clientHeight + halfH, Math.max(-screenH, scrollY - offsetTop) + halfH) / clientHeight

    currentPage = percentY * numOfPages
  }

  return (
    <TileContext.Provider value={{ numOfPages, currentPage }}>
      <div
        className="relative bg-black dark:bg-white z-10"
        ref={refContainer}
        style={{
          height: numOfPages * 100 + 'vh',
        }}
      >
        {children}
      </div>
    </TileContext.Provider>
  )
}

interface TileBackgroundProps {
  children?: ReactNode
}

export const TileBackground = ({ children }: TileBackgroundProps) => {
  return <div className="absolute h-full w-full">{children}</div>
}

export const TileContent = ({ children }: TileBackgroundProps) => {
  return <div className="sticky top-0 h-screen overflow-hidden">{children}</div>
}

interface TileProps {
  page: number
  children: JSX.Element
}

export const Tile = ({ page, children }: TileProps) => {
  const { currentPage, numOfPages } = useContext(TileContext)
  const progress = Math.max(0, currentPage - page)

  const refContainer = useRef<HTMLDivElement>(null)

  let opacity = Math.min(1, Math.max(0, progress * 4))

  if (progress > 0.85 && page < numOfPages - 1) {
    opacity = Math.max(0, (1.0 - progress) * 4)
  }

  return (
    <div
      ref={refContainer}
      className="absolute top-0 w-full"
      style={{ opacity, pointerEvents: progress >= 0 || progress >= 1 ? 'none' : undefined }}
    >
      {cloneElement(children, {
        progress: progress,
        opacity: opacity,
      })}
    </div>
  )
}
