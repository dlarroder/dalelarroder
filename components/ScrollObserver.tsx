import Scroll from 'locomotive-scroll'
import { createContext, ReactNode, useMemo, useRef, useState } from 'react'
import useLocomotiveScroll from './useLocomotiveScroll'

interface ScrollValue {
  scrollY: number
  locomotiveScrollRef: Scroll | null
}

export const ScrollContext = createContext<ScrollValue>({
  scrollY: 0,
  locomotiveScrollRef: null,
})

interface ScrollObserverProps {
  children: ReactNode
}

export const ScrollObserver = ({ children }: ScrollObserverProps) => {
  const [scrollY, setScrollY] = useState(0)

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [locomotiveScrollRef] = useLocomotiveScroll({
    ref: scrollRef,
    smooth: true,
  })

  useMemo(() => {
    if (locomotiveScrollRef) {
      locomotiveScrollRef.on('scroll', (args) => {
        setScrollY(args.scroll.y)
      })
    }
  }, [locomotiveScrollRef])

  return (
    <ScrollContext.Provider value={{ scrollY, locomotiveScrollRef }}>
      <div ref={scrollRef} data-scroll-container>
        {children}
      </div>
    </ScrollContext.Provider>
  )
}
