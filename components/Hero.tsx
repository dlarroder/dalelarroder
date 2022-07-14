import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useContext, useEffect, useRef } from 'react'
import arrowDown from '../public/static/images/arrow_down.webp'
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
      <div
        className="relative z-10 flex h-[calc(100vh-81px)] md:h-[calc(100vh-112px)] items-center"
        style={{
          transform: `translateY(${progress * 20}vh)`,
        }}
      >
        <div className="flex flex-col justify-between mt-[-120px] w-screen">
          <div ref={ref} className="md:text-4xl mx-auto">
            <div className="max-w-5xl flex flex-col gap-3 font-merriweather">
              <div className="cursor-default">
                <h2 className="text-[3.375rem] leading-[3.375rem] md:text-[5.375rem] md:leading-[5.375rem]  lg:text-[9.375rem] lg:leading-[9.375rem] animate-fade-top">
                  Hello
                </h2>
                <div className="flex gap-3 items-center justify-between">
                  <h2 className="text-[3.375rem] leading-[3.375rem] md:text-[5.375rem] md:leading-[5.375rem]  lg:text-[9.375rem] lg:leading-[9.375rem] animate-fade-top">
                    I'm
                  </h2>
                  <motion.div
                    initial={{ x: -2000 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1, type: 'spring', delay: 0.4 }}
                    className="opacity-70"
                  >
                    <h2 className="text-[1.625rem] leading-[1.625rem] md:text-[2.688rem] md:leading-[2.688rem] lg:text-[70px] lg:leading-[70px]">
                      Software Engineer
                    </h2>
                    <h2 className="text-[1.625rem] leading-[1.625rem] md:text-[2.688rem] md:leading-[2.688rem] lg:text-[70px] lg:leading-[70px]">
                      Fullstack Developer
                    </h2>
                  </motion.div>
                </div>
                <h2 className="text-[3.375rem] leading-[3.375rem] md:text-[5.375rem] md:leading-[5.375rem]  lg:text-[9.375rem] lg:leading-[9.375rem] animate-fade-top">
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
          <div className="absolute bottom-4 md:bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col justify-center items-center">
              <span>see more</span>
              <div>
                <Image src={arrowDown} alt="Arrow down" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
    </div>
  )
}
