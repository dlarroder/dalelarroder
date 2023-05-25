import Scroll from 'locomotive-scroll'
import { createContext, ReactNode, useMemo, useState } from 'react'

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
  locomotiveScroll: Scroll | null
}

export const ScrollObserver = ({ children, locomotiveScroll }: ScrollObserverProps) => {
  const [scrollY, setScrollY] = useState(0)

  useMemo(() => {
    if (locomotiveScroll) {
      locomotiveScroll.on('scroll', (args) => {
        setScrollY(args.scroll.y)
      })
    }
  }, [locomotiveScroll])

  return (
    <ScrollContext.Provider value={{ scrollY, locomotiveScrollRef: locomotiveScroll }}>
      {children}
    </ScrollContext.Provider>
  )
}
