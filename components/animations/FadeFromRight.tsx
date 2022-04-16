import { animate } from 'motion'
import React, { useEffect } from 'react'

export default function FadeFromRight() {
  useEffect(() => {
    animate(
      '#fade-from-right',
      {
        opacity: 1,
        transform: ['translate3d(100vw, 0, 0)'],
      },
      {
        duration: 1.4,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
  }, [])
  return (
    <div id="fade-from-right" className="">
      FadeFromRight
    </div>
  )
}
