import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactElement, useContext, useEffect, useRef } from 'react'
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
      <h3 className="sr-only">
        Hello I'm Dale Larroder, a Software Engineer / Full Stack Developer
      </h3>
      <div className="not-sr-only relative z-10 flex h-screen items-center">
        <div
          ref={ref}
          className="flex justify-center md:text-4xl mt-[-120px] mx-auto"
          style={{
            transform: `translateY(${progress * 20}vh)`,
          }}
        >
          <div className="max-w-5xl flex flex-col gap-3 font-merriweather">
            <div className="cursor-default">
              <h2 className="text-[3.375rem] leading-[3.375rem] md:text-[5.375rem] md:leading-[5.375rem]  lg:text-[7rem] lg:leading-[7rem] animate-fade-top">
                Hello
              </h2>
              <div className="flex gap-3 items-center justify-between">
                <h2 className="text-[3.375rem] leading-[3.375rem] md:text-[5.375rem] md:leading-[5.375rem]  lg:text-[7rem] lg:leading-[7rem] animate-fade-top">
                  I'm
                </h2>
                <motion.div
                  initial={{ x: -2000, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, type: 'spring', delay: 0.4 }}
                  className="opacity-70"
                >
                  <h2 className="text-[1.625rem] leading-[1.625rem] md:text-[2.688rem] md:leading-[2.688rem] lg:text-[3.25rem] lg:leading-[3.25rem]">
                    Software Engineer
                  </h2>
                  <h2 className="text-[1.625rem] leading-[1.625rem] md:text-[2.688rem] md:leading-[2.688rem] lg:text-[3.25rem] lg:leading-[52px]">
                    Fullstack Developer
                  </h2>
                </motion.div>
              </div>
              <h2 className="text-[3.375rem] leading-[3.375rem] md:text-[5.375rem] md:leading-[5.375rem]  lg:text-[7rem] lg:leading-[7rem] animate-fade-top">
                Dale Larroder
              </h2>
            </div>
            <Link href="/about">
              <h3 className="underline-magical w-max text-sm md:text-xl ml-1 font-merriweather animate-fade-in-2s cursor-pointer">
                Read more about me &rarr;
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
    </div>
  )
}
