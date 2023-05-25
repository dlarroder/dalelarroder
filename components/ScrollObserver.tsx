import { createContext, ReactNode, useMemo, useState } from 'react'
import { useLocomotiveScroll } from 'react-locomotive-scroll'
interface ScrollValue {
  scrollY: number
}

export const ScrollContext = createContext<ScrollValue>({
  scrollY: 0,
})

interface ScrollObserverProps {
  children: ReactNode
}

export const ScrollObserver = ({ children }: ScrollObserverProps) => {
  const [scrollY, setScrollY] = useState(0)
  const { scroll } = useLocomotiveScroll()

  useMemo(() => {
    if (scroll) {
      scroll.on('scroll', (args: any) => {
        setScrollY(args.scroll.y)
      })
    }
  }, [scroll])

  return <ScrollContext.Provider value={{ scrollY }}>{children}</ScrollContext.Provider>
}
