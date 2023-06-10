import Scroll from 'locomotive-scroll'
import { useRouter } from 'next/router'
import { ReactNode, useRef } from 'react'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { ScrollObserver } from './ScrollObserver'

interface Props {
  children: ReactNode
}

export default function LocomotiveProvider({ children }: Props) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        lerp: 0.07,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
          breakpoint: 1024,
        },
      }}
      watch={[]}
      location={router.asPath}
      containerRef={scrollRef}
      onLocationChange={(scroll: Scroll) => {
        scroll.scrollTo(0, { duration: 250, disableLerp: true })
      }}
      onUpdate={() => undefined}
    >
      <ScrollObserver>
        <main data-scroll-container ref={scrollRef}>
          {children}
        </main>
      </ScrollObserver>
    </LocomotiveScrollProvider>
  )
}
