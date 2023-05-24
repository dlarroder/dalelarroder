import { createContext, ReactNode, useMemo, useRef, useState } from 'react'
import useLocomotiveScroll from './useLocomotiveScroll'

interface ScrollValue {
  scrollY: number
  scrollHeight: number
}

export const ScrollContext = createContext<ScrollValue>({
  scrollY: 0,
  scrollHeight: 0,
})

interface ScrollObserverProps {
  children: ReactNode
}

export const ScrollObserver = ({ children }: ScrollObserverProps) => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  // const handleScroll = useCallback(() => {
  //   // setScrollY(window.scrollY)

  //   console.log('document.body.scrollHeight', document.body.scrollHeight)
  // }, [])

  // useEffect(() => {
  //   document.addEventListener('scroll', handleScroll, { passive: true })

  //   return () => document.removeEventListener('scroll', handleScroll)
  // }, [handleScroll])

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [locomotiveScrollRef] = useLocomotiveScroll({
    ref: scrollRef,
    smooth: true,
  })
  console.log('locomotiveScrollRef', locomotiveScrollRef)

  useMemo(() => {
    if (locomotiveScrollRef) {
      locomotiveScrollRef.on('scroll', (args) => {
        setScrollY(args.scroll.y)
      })
    }
  }, [locomotiveScrollRef])

  return (
    <ScrollContext.Provider value={{ scrollY, scrollHeight }}>
      <div ref={scrollRef} data-scroll-container>
        {children}
      </div>
    </ScrollContext.Provider>
  )
}
