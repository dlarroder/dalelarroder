import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ReactElement, useContext, useEffect, useRef } from 'react'
import { HiOutlineArrowNarrowDown } from 'react-icons/hi'
import FadeDown from './Animations/FadeDown'
import FadeRight from './Animations/FadeRight'
import FadeUp from './Animations/FadeUp'
import { renderCanvas } from './renderCanvas'
import { ScrollContext } from './ScrollObserver'

export default function Hero(): ReactElement {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollY } = useContext(ScrollContext)

  let progress = 0
  const { current: elContainer } = ref

  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight)
  }

  useEffect(() => {
    renderCanvas()
  }, [])

  return (
    <div>
      <h1 className="sr-only">
        Hello I'm Dale Larroder, I'm a software engineer, and I love building things for the web.
      </h1>
      <div
        className="relative z-10 flex h-[calc(100vh-81px)] md:h-[calc(100vh-112px)] items-center"
        style={{
          transform: `translateY(${progress * 20}vh)`,
        }}
      >
        <AnimatePresence>
          <div className="w-screen px-4 max-w-3xl mx-auto sm:px-9 xl:max-w-5xl xl:px-0">
            <div className="-mt-36">
              <div ref={ref} className="flex flex-col space-y-2 cursor-default">
                <FadeUp duration={0.6}>
                  <h1 className="font-semibold text-5xl sm:text-7xl md:text-8xl xl:text-9xl">
                    Dale Larroder
                  </h1>
                </FadeUp>
                <FadeUp duration={0.6} delay={0.2}>
                  <h2 className="font-medium opacity-80 text-3xl sm:text-6xl md:text-6xl xl:text-7xl">
                    I build things for the web.
                  </h2>
                </FadeUp>
                <FadeRight duration={0.5} delay={0.8}>
                  <Link href="/about">
                    <a className="underline-magical cursor-pointer w-max text-md sm:text-lg md:text-xl xl:text-2xl">
                      Read more about me &rarr;
                    </a>
                  </Link>
                </FadeRight>
              </div>
              <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
                <div
                  role="presentation"
                  className="flex flex-col justify-center items-center cursor-pointer"
                  onClick={() => {
                    const intro = document.querySelector('#intro')

                    intro.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <FadeDown duration={1} delay={1.2}>
                    <HiOutlineArrowNarrowDown size={20} />
                  </FadeDown>
                </div>
              </div>
            </div>
          </div>
        </AnimatePresence>
      </div>
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
    </div>
  )
}
