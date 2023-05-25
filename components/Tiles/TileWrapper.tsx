import { ReactNode, useContext, useRef } from 'react'
import { ScrollContext } from '../ScrollObserver'
import { TileContext } from './TileContext'

interface WrapperProps {
  children: ReactNode
  numOfPages: number
}

export default function TileWrapper({ children, numOfPages }: WrapperProps) {
  const refContainer = useRef<HTMLDivElement>(null)

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
        className="relative z-10 mb-[110vh] bg-black dark:bg-white sm:mb-[100vh]"
        ref={refContainer}
        style={{
          height: numOfPages * 100 + 'vh',
        }}
        id="about"
      >
        {children}
      </div>
    </TileContext.Provider>
  )
}
