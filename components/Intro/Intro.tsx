import { useContext, useRef } from 'react'
import { ScrollContext } from '../ScrollObserver'

function opacityForBlock(sectionProgress: number, blockNumber: number) {
  const progress = sectionProgress - blockNumber

  if (progress >= 0 && progress < 1) {
    return 1
  }

  return 0.2
}

export default function Intro() {
  const { scrollY } = useContext(ScrollContext)
  const refContainer = useRef<HTMLDivElement>(null)

  const numOfPages = 3
  let progress = 0
  const { current: elContainer } = refContainer

  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer
    const screenH = window.innerHeight
    const halfH = screenH / 2

    const percentY =
      Math.min(clientHeight + halfH, Math.max(-screenH, scrollY - offsetTop) + halfH) / clientHeight

    progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY * numOfPages))
  }

  return (
    <div
      ref={refContainer}
      className="relative z-10 bg-black dark:bg-white text-white  dark:text-black"
    >
      <div className="min-h-screen max-w-5xl mx-auto px-10 lg:px-20 py-24 md:py-28 lg:py-3 flex flex-col justify-center items-center text-4xl md:text-6xl lg:text-7xl tracking-tight font-semibold">
        <div className="leading-[1.15]">
          <div className="introText" style={{ opacity: opacityForBlock(progress, 0) }}>
            I love coding.
          </div>
          <span
            className="introText inline-block after:content-['_']"
            style={{ opacity: opacityForBlock(progress, 1) }}
          >
            I use my passion and skills to build digital products and experiences.
          </span>
          <span
            className="introText inline-block"
            style={{ opacity: opacityForBlock(progress, 2) }}
          >
            I&apos;m passionate about cutting-edge, pixel perfect UI and intuitively implemented UX.
          </span>
        </div>
      </div>
    </div>
  )
}
